import { Router } from 'itty-router'

const router = Router()

router.get('/api/hello', () => {
  return new Response(JSON.stringify({ message: 'Hello from Cloudflare Worker!' }), {
    headers: { 'Content-Type': 'application/json' }
  })
})

router.all('*', () => new Response('Not found', { status: 404 }))

export default {
  fetch: (request) => router.handle(request)
}