import { Router } from 'itty-router'

const router = Router()

router.get('/api/hello', () => {
  return new Response(JSON.stringify({ message: 'Hello from Cloudflare Worker!' }), {
    headers: { 'Content-Type': 'application/json' }
  })
})

router.get('/api/user/get', async  (env) => {
  const { results } = await env.DB.prepare(
    'SELECT * FROM user '
  ).run()

  return Response.json(results);
})


router.all('*', () => new Response('Not found', { status: 404 }))

export default {
  fetch: (request, env, ctx) => router.handle(request, env, ctx)
}