import { rest } from 'msw'
import posts from './posts.json'

export const handlers = [
  rest.post('/bff/login', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        firstName: 'Pablo',
        lastName: 'Sanchez'
      })
    )
  }),

  // GET
  rest.get('/bff/posts', (_, res, ctx) => {
    return res(ctx.json(posts.posts))
  }),

  rest.get('/bff/posts/:id', (_, res, ctx) => {
    return res(
      ctx.json({
        id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
        userId: '1',
        title: 'post 1',
        body: 'el body del post'
      })
    )
  }),

  rest.post('/bff/posts', (req, res, ctx) => {
    return res(
      ctx.json(req.body)
    )
  }),

  rest.put('/bff/posts/:id', (req, res, ctx) => {
    return res(
      ctx.json(req.body)
    )
  }),

  rest.delete('/bff/posts/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        id: req.params.id
      })
    )
  }),
]
