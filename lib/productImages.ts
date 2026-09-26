export interface ParsedProductImages {
  front: string
  back: string
  all: string[]
  raw: string
}

export function parseProductImages(rawInput?: string | null): ParsedProductImages {
  if (!rawInput || !rawInput.trim()) {
    return { front: '', back: '', all: [], raw: '' }
  }

  const raw = rawInput.trim()
  let list: string[] = []

  // Check JSON structure
  if (raw.startsWith('{') && raw.endsWith('}')) {
    try {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed.all)) {
        list = parsed.all.map((s: unknown) => String(s).trim()).filter(Boolean)
      } else {
        if (parsed.front) list.push(String(parsed.front).trim())
        if (parsed.back) list.push(String(parsed.back).trim())
      }
    } catch {
      // Fallback if JSON parsing fails
    }
  }

  if (list.length === 0) {
    if (raw.includes('|||')) {
      list = raw.split('|||').map((s) => s.trim()).filter(Boolean)
    } else if (raw.includes('\n')) {
      list = raw.split('\n').map((s) => s.trim()).filter(Boolean)
    } else if (raw.includes(',') && raw.includes('http')) {
      list = raw.split(',').map((s) => s.trim()).filter(Boolean)
    } else {
      list = [raw]
    }
  }

  const front = list[0] || ''
  const back = list[1] || ''

  return {
    front,
    back,
    all: list,
    raw,
  }
}

export function formatProductImages(front: string, back?: string, gallery: string[] = []): string {
  const all = [
    (front || '').trim(),
    (back || '').trim(),
    ...gallery.map((g) => (g || '').trim()),
  ].filter(Boolean)

  if (all.length === 0) return ''
  if (all.length === 1) return all[0]
  return all.join('|||')
}
