import { BASE_URL } from './client'
import { ENDPOINTS } from './endpoints'

const REVEAL_SECRET = import.meta.env.VITE_CLOUDINARY_REVEAL_SECRET ?? ''

interface CloudinaryAuth {
  cloud_name: string
  api_key: string
  timestamp: number
  signature: string
  folder: string
}

async function getAuth(folder: string): Promise<CloudinaryAuth> {
  const res = await fetch(`${BASE_URL}${ENDPOINTS.cloudinaryAuth}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: REVEAL_SECRET, folder }),
  })
  if (!res.ok) throw new Error('Failed to get upload auth')
  const data = await res.json()
  return data.data as CloudinaryAuth
}

async function uploadWithAuth(file: File, auth: CloudinaryAuth): Promise<string> {
  const form = new FormData()
  form.append('file', file)
  form.append('api_key', auth.api_key)
  form.append('timestamp', String(auth.timestamp))
  form.append('signature', auth.signature)
  form.append('folder', auth.folder)

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${auth.cloud_name}/image/upload`,
    { method: 'POST', body: form },
  )
  if (!res.ok) throw new Error('Cloudinary upload failed')
  const data = await res.json()
  return data.secure_url as string
}

export async function uploadImagesToCloudinary(files: File[], folder: string): Promise<string[]> {
  const auth = await getAuth(folder)
  return Promise.all(files.map(file => uploadWithAuth(file, auth)))
}
