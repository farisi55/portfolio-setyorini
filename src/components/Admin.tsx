import { ChevronDown, ImageIcon, LogOut, Save, Trash2, Upload } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface GalleryItem {
  id: number
  tag: string
  caption: string
  alt: string
  hasImage: boolean
}

type Toast = { message: string; type: 'success' | 'error' } | null

const MAX_SLOTS = 10

function apiHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` }
}

async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  return fetch(url, options)
}

function LoginScreen({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!username || !password) {
      setError('Isi semua field')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = (await response.json()) as { token?: string; error?: string }

      if (response.ok && data.token) {
        sessionStorage.setItem('admin_token', data.token)
        onLogin(data.token)
      } else {
        setError(data.error ?? 'Login gagal')
      }
    } catch {
      setError('Koneksi gagal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5EFE6] px-5">
      <div className="w-full max-w-sm rounded-2xl border border-[#C4956A]/20 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#3D1F1F]">
            <span className="text-lg font-bold text-white">SS</span>
          </div>
          <h1 className="text-xl font-extrabold text-[#3D1F1F]">Admin Panel</h1>
          <p className="mt-1 text-sm text-[#6B7280]">Portfolio Setyorini Safitri</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
              placeholder="admin"
              className="w-full rounded-lg border border-[#C4956A]/30 bg-[#FAF7F3] px-4 py-2.5 text-sm text-[#3D1F1F] placeholder:text-[#C4956A]/50 focus:border-[#C4956A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSubmit()}
              placeholder="Password"
              className="w-full rounded-lg border border-[#C4956A]/30 bg-[#FAF7F3] px-4 py-2.5 text-sm text-[#3D1F1F] placeholder:text-[#C4956A]/50 focus:border-[#C4956A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/20"
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-[#3D1F1F] py-3 text-sm font-bold text-white transition-all hover:bg-[#7A4A2A] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Memeriksa...' : 'Masuk'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ToastBanner({ toast }: { toast: Toast }) {
  if (!toast) return null

  return (
    <div
      className={`fixed right-5 top-5 z-50 rounded-xl px-5 py-3.5 text-sm font-semibold text-white shadow-lg ${
        toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {toast.message}
    </div>
  )
}

function AdminDashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [selectedId, setSelectedId] = useState(1)
  const [tag, setTag] = useState('')
  const [caption, setCaption] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(true)
  const [toast, setToast] = useState<Toast>(null)
  const [confirmDel, setConfirmDel] = useState(false)
  const [cacheBust, setCacheBust] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 3500)
  }, [])

  const resetFormForSelection = useCallback((id: number, sourceItems: GalleryItem[]) => {
    const found = sourceItems.find((item) => item.id === id)

    setSelectedId(id)
    setTag(found?.tag ?? '')
    setCaption(found?.caption ?? '')
    setImageFile(null)
    setImagePreview(null)
    setConfirmDel(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [])

  const fetchItems = useCallback(async () => {
    try {
      const response = await apiFetch('/api/gallery', { headers: apiHeaders(token) })
      if (response.status === 401) {
        onLogout()
        return
      }

      const data = (await response.json()) as GalleryItem[]
      setItems(data)
      setCacheBust(Date.now())
      resetFormForSelection(selectedId, data)
    } catch {
      showToast('Gagal memuat data gallery', 'error')
    } finally {
      setLoadingData(false)
    }
  }, [onLogout, resetFormForSelection, selectedId, showToast, token])

  useEffect(() => {
    window.setTimeout(() => {
      fetchItems()
    }, 0)
  }, [fetchItems])

  const handleFile = (file: File | null) => {
    setImageFile(file)

    if (!file) {
      setImagePreview(null)
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => setImagePreview(event.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (!tag.trim()) {
      showToast('Category wajib diisi', 'error')
      return
    }

    if (!caption.trim()) {
      showToast('Description wajib diisi', 'error')
      return
    }

    const existingItem = items.find((item) => item.id === selectedId)
    if (!existingItem && !imageFile) {
      showToast('Upload foto untuk item baru', 'error')
      return
    }

    setLoading(true)
    try {
      const form = new FormData()
      form.append('id', String(selectedId))
      form.append('tag', tag.trim())
      form.append('caption', caption.trim())
      form.append('alt', tag.trim())
      if (imageFile) form.append('image', imageFile)

      const response = await apiFetch('/api/gallery', {
        method: 'POST',
        headers: apiHeaders(token),
        body: form,
      })

      if (response.status === 401) {
        onLogout()
        return
      }

      if (!response.ok) throw new Error('Save failed')

      await fetchItems()
      showToast(`Item ${selectedId} berhasil disimpan`, 'success')
    } catch {
      showToast('Gagal menyimpan item', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await apiFetch(`/api/gallery/${selectedId}`, {
        method: 'DELETE',
        headers: apiHeaders(token),
      })

      if (response.status === 401) {
        onLogout()
        return
      }

      if (!response.ok) throw new Error('Delete failed')

      await fetchItems()
      setConfirmDel(false)
      resetFormForSelection(1, items.filter((item) => item.id !== selectedId))
      showToast(`Item ${selectedId} berhasil dihapus`, 'success')
    } catch {
      showToast('Gagal menghapus item', 'error')
    } finally {
      setLoading(false)
    }
  }

  const existingItem = items.find((item) => item.id === selectedId)
  const currentImageSrc = existingItem?.hasImage ? `/assets/gallery/gallery-${selectedId}.jpg?t=${cacheBust}` : null
  const maxId = items.length > 0 ? Math.max(...items.map((item) => item.id)) : 0
  const slotMax = Math.min(maxId + 1, MAX_SLOTS)
  const slotIds = Array.from({ length: slotMax }, (_, index) => index + 1)

  return (
    <div className="min-h-screen bg-[#F5EFE6]">
      <ToastBanner toast={toast} />

      <header className="border-b border-[#C4956A]/20 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3D1F1F]">
              <span className="text-xs font-bold text-white">SS</span>
            </div>
            <div>
              <p className="text-sm font-extrabold text-[#3D1F1F]">Admin Panel</p>
              <p className="text-xs text-[#6B7280]">Gallery Manager</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 rounded-lg border border-[#C4956A]/30 px-3 py-2 text-xs font-semibold text-[#7A4A2A] transition-colors hover:border-[#3D1F1F] hover:text-[#3D1F1F]"
          >
            <LogOut size={14} aria-hidden="true" /> Keluar
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {loadingData ? (
          <div className="py-20 text-center text-sm text-[#6B7280]">Memuat data gallery...</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="rounded-2xl border border-[#C4956A]/20 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
                  Nomor Foto (ID)
                </label>
                <div className="relative">
                  <select
                    value={selectedId}
                    onChange={(event) => resetFormForSelection(Number(event.target.value), items)}
                    className="w-full appearance-none rounded-lg border border-[#C4956A]/30 bg-[#FAF7F3] px-4 py-2.5 pr-10 text-sm font-semibold text-[#3D1F1F] focus:border-[#C4956A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/20"
                  >
                    {slotIds.map((id) => {
                      const found = items.find((item) => item.id === id)
                      return (
                        <option key={id} value={id}>
                          Foto {id} {found ? `- ${found.tag}` : '(baru)'}
                        </option>
                      )
                    })}
                  </select>
                  <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-3 text-[#C4956A]"
                    aria-hidden="true"
                  />
                </div>
                {existingItem ? (
                  <p className="mt-1.5 text-xs font-medium text-green-600">Data existing ditemukan - form sudah terisi</p>
                ) : (
                  <p className="mt-1.5 text-xs font-medium text-[#E8651A]">
                    Slot baru - isi semua field dan upload foto
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
                  Category
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(event) => setTag(event.target.value)}
                  placeholder="Community Event, Partnership, Workshop, ..."
                  className="w-full rounded-lg border border-[#C4956A]/30 bg-[#FAF7F3] px-4 py-2.5 text-sm text-[#3D1F1F] placeholder:text-[#C4956A]/50 focus:border-[#C4956A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/20"
                />
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
                  Description
                </label>
                <textarea
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                  rows={3}
                  placeholder="Caption yang muncul di bawah foto pada gallery..."
                  className="w-full resize-none rounded-lg border border-[#C4956A]/30 bg-[#FAF7F3] px-4 py-2.5 text-sm text-[#3D1F1F] placeholder:text-[#C4956A]/50 focus:border-[#C4956A] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/20"
                />
              </div>

              <div className="mb-6">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
                  Foto {existingItem ? '(opsional - kosongkan jika tidak ganti foto)' : '(wajib)'}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault()
                    handleFile(event.dataTransfer.files[0] ?? null)
                  }}
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#C4956A]/40 bg-[#FAF7F3] py-8 text-center transition-colors hover:border-[#C4956A] hover:bg-[#F5EFE6]"
                >
                  <Upload size={24} className="text-[#C4956A]" aria-hidden="true" />
                  <p className="text-sm font-medium text-[#7A4A2A]">
                    {imageFile ? imageFile.name : 'Klik atau drag foto ke sini'}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    JPG, PNG, WEBP, dll - otomatis disimpan sebagai gallery-{selectedId}.jpg
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D1F1F] py-3 text-sm font-bold text-white transition-all hover:bg-[#7A4A2A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save size={16} aria-hidden="true" />
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>

                {existingItem && !confirmDel && (
                  <button
                    type="button"
                    onClick={() => setConfirmDel(true)}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-600 transition-all hover:border-red-400 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} aria-hidden="true" /> Hapus
                  </button>
                )}

                {confirmDel && (
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-semibold text-red-600">Yakin hapus?</p>
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={loading}
                      className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:opacity-50"
                    >
                      Ya, hapus
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDel(false)}
                      className="rounded-lg border border-[#C4956A]/30 px-3 py-2 text-xs font-bold text-[#7A4A2A] hover:bg-[#F5EFE6]"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#C4956A]/20 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
                Preview Foto {selectedId}
              </p>

              {imagePreview ? (
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[4/5] w-full">
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover object-center" />
                  </div>
                  <p className="mt-2 text-center text-xs font-medium text-[#E8651A]">Foto baru (belum disimpan)</p>
                </div>
              ) : currentImageSrc ? (
                <div className="overflow-hidden rounded-xl">
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={currentImageSrc}
                      alt={existingItem?.alt ?? existingItem?.tag}
                      className="h-full w-full object-cover object-center"
                      onError={(event) => {
                        event.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <p className="mt-2 text-center text-xs text-[#6B7280]">Foto saat ini</p>
                </div>
              ) : (
                <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C4956A]/20 bg-[#FAF7F3]">
                  <ImageIcon size={32} className="text-[#C4956A]/40" aria-hidden="true" />
                  <p className="mt-2 text-xs text-[#C4956A]/60">Belum ada foto</p>
                </div>
              )}

              {(tag || caption) && (
                <div className="mt-4 rounded-xl bg-[#FAF7F3] p-3">
                  {tag && (
                    <span className="inline-block rounded-full border border-[#C4956A]/30 bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#C4956A]">
                      {tag}
                    </span>
                  )}
                  {caption && <p className="mt-2 text-sm font-semibold leading-snug text-[#3D1F1F]">{caption}</p>}
                </div>
              )}
            </div>
          </div>
        )}

        {!loadingData && items.length > 0 && (
          <div className="mt-8 rounded-2xl border border-[#C4956A]/20 bg-white p-6 shadow-sm">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#7A4A2A]">
              Semua Item Gallery ({items.length})
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((galleryItem) => (
                <button
                  key={galleryItem.id}
                  type="button"
                  onClick={() => resetFormForSelection(galleryItem.id, items)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all hover:border-[#C4956A] ${
                    selectedId === galleryItem.id ? 'border-[#3D1F1F] bg-[#FAF7F3]' : 'border-[#C4956A]/20 bg-white'
                  }`}
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-[#F5EFE6]">
                    {galleryItem.hasImage && (
                      <img
                        src={`/assets/gallery/gallery-${galleryItem.id}.jpg`}
                        alt={galleryItem.alt}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#3D1F1F]">Foto {galleryItem.id}</p>
                    <p className="truncate text-xs text-[#C4956A]">{galleryItem.tag}</p>
                    <p className="truncate text-xs text-[#6B7280]">{galleryItem.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export function Admin() {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('admin_token'))

  const handleLogin = (newToken: string) => setToken(newToken)
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setToken(null)
  }

  if (!token) return <LoginScreen onLogin={handleLogin} />
  return <AdminDashboard token={token} onLogout={handleLogout} />
}
