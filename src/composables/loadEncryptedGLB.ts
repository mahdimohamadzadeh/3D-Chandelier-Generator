import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

const KEY_HEX = '603d822f63464512429a5678bd1a3c0b9f3e30c207f5bba112e06b2fb66f453b'
const IV_HEX = '57bed216956edd459dd5189968bcbf54'

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16)
  return bytes
}

async function decryptBuffer(encrypted: ArrayBuffer): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw', hexToBytes(KEY_HEX), { name: 'AES-CBC' }, false, ['decrypt']
  )
  return crypto.subtle.decrypt({ name: 'AES-CBC', iv: hexToBytes(IV_HEX) }, cryptoKey, encrypted)
}

async function decryptGLB(url: string, onProgress?: (percent: number) => void): Promise<ArrayBuffer> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP error status: ${res.status}`)

  const contentLength = res.headers.get('content-length')
  const total = contentLength ? parseInt(contentLength, 10) : 0

  const reader = res.body?.getReader()
  if (!reader) {
    const encrypted = await res.arrayBuffer()
    onProgress?.(100)
    return decryptBuffer(encrypted)
  }

  let loaded = 0
  const chunks: Uint8Array[] = []

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) {
      chunks.push(value)
      loaded += value.length
      if (total > 0) {
        const percent = Math.min(99, Math.round((loaded / total) * 100))
        onProgress?.(percent)
      } else {
        // Fallback progress estimation when content-length header is absent
        const estimatedPercent = Math.min(95, Math.round(100 * (1 - Math.exp(-loaded / 1000000))))
        onProgress?.(estimatedPercent)
      }
    }
  }

  const encryptedBytes = new Uint8Array(loaded)
  let offset = 0
  for (const chunk of chunks) {
    encryptedBytes.set(chunk, offset)
    offset += chunk.length
  }

  onProgress?.(100)
  return decryptBuffer(encryptedBytes.buffer)
}

export async function loadEncryptedGLB(
  url: string,
  onLoad: (gltf: any) => void,
  onError?: (e: any) => void,
  onProgress?: (percent: number) => void
) {
  try {
    const decrypted = await decryptGLB(url, onProgress)
    const loader = new GLTFLoader()

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
    loader.setDRACOLoader(dracoLoader)

    loader.parse(decrypted, '', onLoad, onError)
  } catch (e) {
    console.error('Decrypt/parse failed:', e)
    onError?.(e)
  }
}
