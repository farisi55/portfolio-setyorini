/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  GALLERY_KV: KVNamespace
  GALLERY_R2: R2Bucket
  ADMIN_USERNAME: string
  ADMIN_PASSWORD: string
  SESSION_SECRET: string
}

export interface GalleryItem {
  id: number
  alt: string
  tag: string
  caption: string
  hasImage: boolean
}

async function makeToken(username: string, password: string, secret: string): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(`${username}:${password}`))
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}

async function validateToken(token: string, env: Env): Promise<boolean> {
  try {
    const expected = await makeToken(env.ADMIN_USERNAME, env.ADMIN_PASSWORD, env.SESSION_SECRET)
    return token === expected
  } catch {
    return false
  }
}

function getToken(request: Request): string | null {
  const auth = request.headers.get('Authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return null
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(typeof body === 'string' ? body : JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
  })
}

async function requireAuth(request: Request, env: Env): Promise<Response | null> {
  const token = getToken(request)
  if (!token || !(await validateToken(token, env))) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  return null
}

async function listGallery(env: Env): Promise<GalleryItem[]> {
  const list = await env.GALLERY_KV.list({ prefix: 'gallery:' })
  const items: GalleryItem[] = []

  for (const key of list.keys) {
    const raw = await env.GALLERY_KV.get(key.name)
    if (raw) items.push(JSON.parse(raw) as GalleryItem)
  }

  return items.sort((a, b) => a.id - b.id)
}

async function getItem(id: number, env: Env): Promise<GalleryItem | null> {
  const raw = await env.GALLERY_KV.get(`gallery:${id}`)
  return raw ? (JSON.parse(raw) as GalleryItem) : null
}

async function saveItem(item: GalleryItem, env: Env): Promise<void> {
  await env.GALLERY_KV.put(`gallery:${item.id}`, JSON.stringify(item))
}

async function deleteItem(id: number, env: Env): Promise<void> {
  await env.GALLERY_KV.delete(`gallery:${id}`)
  await env.GALLERY_R2.delete(`gallery-${id}.jpg`)
}

async function handleAPI(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (method === 'OPTIONS') return jsonResponse('', 204)

  if (path === '/api/auth/login' && method === 'POST') {
    const body = (await request.json()) as { username?: string; password?: string }
    if (body.username === env.ADMIN_USERNAME && body.password === env.ADMIN_PASSWORD) {
      const token = await makeToken(body.username, body.password, env.SESSION_SECRET)
      return jsonResponse({ token })
    }
    return jsonResponse({ error: 'Invalid credentials' }, 401)
  }

  if (path === '/api/gallery' && method === 'GET') {
    const items = await listGallery(env)
    return jsonResponse(items)
  }

  const galleryItemMatch = path.match(/^\/api\/gallery\/(\d+)$/)
  if (galleryItemMatch && method === 'GET') {
    const item = await getItem(Number(galleryItemMatch[1]), env)
    if (!item) return jsonResponse({ error: 'Not found' }, 404)
    return jsonResponse(item)
  }

  const unauthorized = await requireAuth(request, env)
  if (unauthorized) return unauthorized

  if (path === '/api/gallery' && (method === 'POST' || method === 'PUT')) {
    const form = await request.formData()
    const id = Number(form.get('id'))
    const tag = String(form.get('tag') ?? '')
    const caption = String(form.get('caption') ?? '')
    const alt = String(form.get('alt') ?? tag)
    const file = form.get('image')

    if (!Number.isInteger(id) || id <= 0) {
      return jsonResponse({ error: 'Invalid id' }, 400)
    }

    let hasImage = false

    if (file instanceof File && file.size > 0) {
      await env.GALLERY_R2.put(`gallery-${id}.jpg`, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || 'image/jpeg' },
      })
      hasImage = true
    } else {
      const existing = await getItem(id, env)
      hasImage = existing?.hasImage ?? false
    }

    const item: GalleryItem = { id, tag, caption, alt, hasImage }
    await saveItem(item, env)
    return jsonResponse({ ok: true, item })
  }

  if (galleryItemMatch && method === 'DELETE') {
    await deleteItem(Number(galleryItemMatch[1]), env)
    return jsonResponse({ ok: true })
  }

  return jsonResponse({ error: 'Not found' }, 404)
}

async function handleGalleryImage(url: URL, env: Env): Promise<Response> {
  const filename = url.pathname.split('/').pop() ?? ''
  const object = await env.GALLERY_R2.get(filename)

  if (!object) return new Response('Not found', { status: 404 })

  const headers = new Headers()
  if (object.httpMetadata?.contentType) {
    headers.set('Content-Type', object.httpMetadata.contentType)
  }
  headers.set('Cache-Control', 'public, max-age=86400')

  return new Response(object.body, { headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname.startsWith('/api/')) {
      return handleAPI(request, env)
    }

    if (url.pathname.startsWith('/assets/gallery/')) {
      return handleGalleryImage(url, env)
    }

    return env.ASSETS.fetch(request)
  },
}
