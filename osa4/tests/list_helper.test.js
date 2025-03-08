const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
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
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const emptyList = []

  test('of empty list is zero'), () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  }

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has multiple blogs equals the likes of that'), () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 36)
  }

})

describe('favorite blog', () => {
  
  const emptyList = []

  test('of empty list is empty object'), () => {
    const result = listHelper.favoriteBlog(emptyList)
    assert.strictEqual(result, {})
  }

  test('when list has only one blog equals the likes of that'), () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.strictEqual(result, listWithOneBlog[0])
  }

  test('when list has multiple blogs equals the likes of that'), () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.strictEqual(result, listWithMultipleBlogs[2])
  }

  const listWithMultipleSimilarLikedBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 26,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 26,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 26,
      __v: 0
    },
  ]

  test('when list has multiple blogs with same likes return one of them'), () => {
    const result = listHelper.favoriteBlog(listWithMultipleBlogs)
    assert.strictEqual(result, listWithMultipleBlogs[0])
  }
})

describe('most blogs', () => {
  
  const emptyList = []

  test('of empty list is empty object'), () => {
    const result = listHelper.mostBlogs(emptyList)
    assert.strictEqual(result, {})
  }

  test('when list has only one blog equals the author of that'), () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.strictEqual(result, { author: listWithOneBlog[0].author, blogs: 1 })
  }

  test('when list has multiple blogs equals the author of that with most blogs'), () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.strictEqual(result, { author: 'Robert C. Martin', blogs: 3 })
  }

  const listWithMultipleSimilarLikedBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 261121,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Michael Chan",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 26234,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 2612,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d173453453535353f9",
      title: "Canonical string reduction vol 2",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 26545754,
      __v: 0
    },
  ]

  test('when list has multiple blogs with same amount of blogs return one of them'), () => {
    const result = listHelper.mostBlogs(listWithMultipleSimilarLikedBlogs)
    assert.strictEqual(result, { author: 'Michael Chan', blogs: 1 })
  }
})

describe('most likes', () => {
  
  const emptyList = []

  test('of empty list is empty object'), () => {
    const result = listHelper.mostLikes(emptyList)
    assert.strictEqual(result, {})
  }

  test('when list has only one blog equals the author + likes of that'), () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.strictEqual(result, { author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes })
  }

  test('when list has multiple blogs equals the author with most likes'), () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.strictEqual(result, { author: 'Michael Chan', likes: 7 })
  }

  const listWithMultipleSimilarLikedBlogsFromDifferentAuthors = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 261121,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Michael Chan",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 26545754,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 2612,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d173453453535353f9",
      title: "Canonical string reduction vol 2",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 26545754,
      __v: 0
    },
  ]

  test('when list has multiple blogs with same amount of likes and different authors return one of them'), () => {
    const result = listHelper.mostLikes(listWithMultipleSimilarLikedBlogsFromDifferentAuthors)
    assert.strictEqual(result, { author: 'Michael Chan', likes: 26545754 })
  }
})
