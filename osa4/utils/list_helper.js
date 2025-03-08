const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const author = authors.reduce((prev, current) => {
        prev[current] = (prev[current] || 0) + 1
        return prev
    }, {})

    const authorWithMostBlogs = Object.keys(author).reduce((prev, current) => author[prev] > author[current] ? prev : current)

    return {
        author: authorWithMostBlogs,
        blogs: author[authorWithMostBlogs]
    }
}

mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const author = authors.reduce((prev, current) => {
        prev[current] = (prev[current] || 0) + 1
        return prev
    }, {})

    const authorWithMostLikes = Object.keys(author).reduce((prev, current) => author[prev] > author[current] ? prev : current)

    return {
        author: authorWithMostLikes,
        likes: author[authorWithMostLikes]
    }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
