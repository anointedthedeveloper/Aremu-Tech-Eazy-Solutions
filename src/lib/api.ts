export class ApiError extends Error {
  status: number
  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

async function parse<T>(res: Response): Promise<T> {
  let data: unknown = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const msg = (data as { error?: string } | null)?.error ?? 'Something went wrong. Please try again.'
    throw new ApiError(res.status, msg)
  }
  return data as T
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response
  try {
    res = await fetch(path, { credentials: 'same-origin', ...init })
  } catch {
    throw new ApiError(0, 'Could not reach the server. Check your internet connection and try again.')
  }
  return parse<T>(res)
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown = {}) =>
    request<T>(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }),
  upload: <T>(file: Blob, name: string) =>
    request<T>('/api/upload', { method: 'POST', headers: { 'Content-Type': 'application/octet-stream', 'X-File-Name': encodeURIComponent(name) }, body: file }),
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
}

const MAX_BYTES = 4 * 1024 * 1024

/** Downscales large photos in the browser so phone camera pictures fit the upload limit. */
async function shrinkImage(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || file.size <= 1.5 * 1024 * 1024) return file
  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(bitmap.width * scale)
    canvas.height = Math.round(bitmap.height * scale)
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85))
    return blob && blob.size < file.size ? blob : file
  } catch {
    return file
  }
}

export async function uploadDocument(file: File): Promise<UploadedFile> {
  const blob = await shrinkImage(file)
  if (blob.size > MAX_BYTES) throw new ApiError(413, `"${file.name}" is too large. Maximum size is 4 MB.`)
  return api.upload<UploadedFile>(blob, file.name)
}
