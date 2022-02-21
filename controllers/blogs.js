const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogRouter.post('/blogs', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    response.status(400).json(exception)
  }
})

blogRouter.delete('/blogs/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).json(result)
})

blogRouter.put('/blogs/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes 
  }

  const result = await Blog.findOneAndUpdate(request.params.id, blog, { new: true })

  response.json(result)
})

module.exports = blogRouter