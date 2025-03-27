const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = listWithMultipleBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('return correct amount of JSON-format blogs', async () => {
const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, initialBlogs.length)
})

test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].id)
})

test('a valid blog is added and increases blog amount by one', async () => {
  const newBlog = {
    title: "Test blog add",
    author: "Test author",
    url: "http://www.test.com",
    likes: 15,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const response = await api
      .get('/api/blogs')
      .expect(200)
      assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: "no likes Blog",
    author: "Author test",
    url: "http://nolikes.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('if title and url properties are missing, return 400 Bad Request', async () => {
  const invalidBlog = {
    author: "Author only",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(invalidBlog)
    .expect(400)
})

test('delete a blog post', async () => {
  const newBlog = {
    title: "Blog to delete",
    author: "Author to delete",
    url: "http://deleteblog.com",
    likes: 0,
  }

  const addedBlogResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogToDelete = addedBlogResponse.body

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  // Ultimately no blogs removed, as the deletion is made on a 'dummy' blog
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length)
})

after(async () => {
    await mongoose.connection.close()
})
