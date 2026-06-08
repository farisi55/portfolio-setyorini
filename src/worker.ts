/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: { fetch: (request: Request) => Promise<Response> }
  GALLERY_KV: KVNamespace
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

function validateAdminConfig(env: Env): string | null {
  if (!env.ADMIN_USERNAME) return 'ADMIN_USERNAME belum dikonfigurasi'
  if (!env.ADMIN_PASSWORD) return 'ADMIN_PASSWORD belum dikonfigurasi'
  if (!env.SESSION_SECRET) return 'SESSION_SECRET belum dikonfigurasi'
  if (env.SESSION_SECRET.length < 32) return 'SESSION_SECRET harus minimal 32 karakter'
  return null
}

async function requireAuth(request: Request, env: Env): Promise<Response | null> {
  const configError = validateAdminConfig(env)
  if (configError) {
    return jsonResponse({ error: configError }, 500)
  }

  const token = getToken(request)
  if (!token || !(await validateToken(token, env))) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  return null
}

const metaKey = (id: number) => `gallery:meta:${id}`
const imageKey = (id: number) => `gallery:img:${id}`
const thumbKey = (id: number) => `gallery:thumb:${id}`

async function listGallery(env: Env): Promise<GalleryItem[]> {
  const list = await env.GALLERY_KV.list({ prefix: 'gallery:meta:' })
  const items: GalleryItem[] = []

  for (const key of list.keys) {
    const raw = await env.GALLERY_KV.get(key.name)
    if (raw) items.push(JSON.parse(raw) as GalleryItem)
  }

  return items.sort((a, b) => a.id - b.id)
}

async function getItem(id: number, env: Env): Promise<GalleryItem | null> {
  const raw = await env.GALLERY_KV.get(metaKey(id))
  return raw ? (JSON.parse(raw) as GalleryItem) : null
}

async function saveItem(item: GalleryItem, env: Env): Promise<void> {
  await env.GALLERY_KV.put(metaKey(item.id), JSON.stringify(item))
}

async function deleteItem(id: number, env: Env): Promise<void> {
  await env.GALLERY_KV.delete(metaKey(id))
  await env.GALLERY_KV.delete(imageKey(id))
  await env.GALLERY_KV.delete(thumbKey(id))
}

async function handleAPI(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method

  if (method === 'OPTIONS') return jsonResponse('', 204)

  if (path === '/api/auth/debug' && method === 'GET') {
    return jsonResponse({
      hasAdminUsername: Boolean(env.ADMIN_USERNAME),
      hasAdminPassword: Boolean(env.ADMIN_PASSWORD),
      hasSessionSecret: Boolean(env.SESSION_SECRET),
      sessionSecretLength: env.SESSION_SECRET?.length ?? 0,
      hasGalleryKv: Boolean(env.GALLERY_KV),
    })
  }

  if (path === '/api/auth/login' && method === 'POST') {
    const body = (await request.json()) as { username?: string; password?: string }
    const configError = validateAdminConfig(env)
    if (configError) {
      return jsonResponse({ error: configError }, 500)
    }

    const username = body.username?.trim() ?? ''
    const password = body.password ?? ''
    if (username === env.ADMIN_USERNAME.trim() && password === env.ADMIN_PASSWORD) {
      const token = await makeToken(env.ADMIN_USERNAME, env.ADMIN_PASSWORD, env.SESSION_SECRET)
      return jsonResponse({ token })
    }
    return jsonResponse({ error: 'Username atau password salah' }, 401)
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
    const thumbFile = form.get('thumbnail')

    if (!Number.isInteger(id) || id <= 0) {
      return jsonResponse({ error: 'Invalid id' }, 400)
    }

    let hasImage = false

    if (file instanceof File && file.size > 0) {
      await env.GALLERY_KV.put(imageKey(id), await file.arrayBuffer(), {
        metadata: { contentType: file.type || 'image/webp' },
      })

      if (thumbFile instanceof File && thumbFile.size > 0) {
        await env.GALLERY_KV.put(thumbKey(id), await thumbFile.arrayBuffer(), {
          metadata: { contentType: thumbFile.type || 'image/webp' },
        })
      }

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
  const thumbMatch = filename.match(/^thumb-gallery-(\d+)\.(webp|jpg|jpeg|png)$/)
  const fullMatch = filename.match(/^gallery-(\d+)\.(webp|jpg|jpeg|png)$/)
  const match = thumbMatch ?? fullMatch

  if (!match) return new Response('Not found', { status: 404 })

  const id = Number(match[1])
  const key = thumbMatch ? thumbKey(id) : imageKey(id)
  let result = await env.GALLERY_KV.getWithMetadata<{ contentType?: string }>(key, { type: 'arrayBuffer' })

  if (!result.value && thumbMatch) {
    result = await env.GALLERY_KV.getWithMetadata<{ contentType?: string }>(imageKey(id), { type: 'arrayBuffer' })
  }

  if (!result.value) return new Response('Not found', { status: 404 })

  return new Response(result.value, {
    headers: {
      'Content-Type': result.metadata?.contentType ?? 'image/webp',
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  })
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
