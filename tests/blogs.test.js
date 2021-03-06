const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
})

test('blogs defined by id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('adding blogs work', async () => {
    let blogObject = {
    "title": "Blog2",
    "author": "BlogMan",
    "url": "http://blog.blog2.man/",
    "likes": 200
    }

    await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(201)
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('likes have default value of 0', async() => {
    let blogObject = {
        "title": "Blog2",
        "author": "BlogMan",
        "url": "http://blog.blog2.man/"
    }

    await api
        .post('/api/blogs')
        .send(blogObject)
    const response = await api.get('/api/blogs')

    expect(response.body[2].likes).toBe(0)
})

test('status code 400 with invalid input', async() => {
    let blogObject = {
        "author": "Kaarle"
    }

    const result = await api
        .post('/api/blogs')
        .send(blogObject)
        .expect(400)
    expect(result.status).toBe(400)
})

test('remove being succesfull', async() => {
    let id = "5a422aa71b54a676234d17f8"

    const result = await api.delete(`/api/blogs/${id}`)
    expect(result.status).toBe(204)
})

test('updating entries work', async() => {
    let id = "5a422aa71b54a676234d17f8"
    const blogObject = {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 10
    }

    await api
        .put(`/api/blogs/${id}`)
        .send(blogObject)

    const result = await api.get('/api/blogs')
    expect(result.body[0].likes).toBe(10)
})

afterAll(() => {
  mongoose.connection.close()
})