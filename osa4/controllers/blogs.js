const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url, author, likes } = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'invalid or missing user' })
  }


  if (!title || !url) {
      return response.status(400).json({ error: 'title or url is missing' })
  }



  const blog = new Blog({
      title,
      author,
      url,
      likes: likes || 0,
      user: user._id
  })

  const savedBlog = await blog.save()

  // Optionally add blog to the user's list and save
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})
  
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {

  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter
