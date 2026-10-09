import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/public'
import { parseProductImages } from '@/lib/productImages'
import type { Blog, Product } from '@/types'

// Raw fetchers for direct client-side calls
async function fetchProductsRaw(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .neq('status', 'future')
    .order('created_at')

  if (error || !data) return []

  return data.map((product) => {
    const parsed = parseProductImages(product.image_url)
    return {
      ...product,
      image_url: parsed.front,
      back_image_url: parsed.back,
      images: parsed.all,
      raw_image_url: product.image_url,
      product_variants: [...(product.product_variants || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    }
  }) as Product[]
}

async function fetchProductBySlugRaw(slug: string): Promise<Product | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null

  const parsed = parseProductImages(data.image_url)

  return {
    ...data,
    image_url: parsed.front,
    back_image_url: parsed.back,
    images: parsed.all,
    raw_image_url: data.image_url,
    product_variants: [...(data.product_variants || [])].sort(
      (a, b) => a.sort_order - b.sort_order
    ),
  } as Product
}

async function fetchBestSellersRaw(): Promise<Product[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('is_best_seller', true)
    .order('created_at')

  if (error || !data) return []

  return data.map((product) => {
    const parsed = parseProductImages(product.image_url)
    return {
      ...product,
      image_url: parsed.front,
      back_image_url: parsed.back,
      images: parsed.all,
      raw_image_url: product.image_url,
      product_variants: [...(product.product_variants || [])].sort(
        (a, b) => a.sort_order - b.sort_order
      ),
    }
  }) as Product[]
}

async function fetchPublishedBlogsRaw(): Promise<Blog[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from('blogs')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)

  return (data as Blog[]) ?? []
}

// Server side cached versions
const cachedGetProducts = unstable_cache(
  fetchProductsRaw,
  ['getProducts-cache-v1'],
  { revalidate: 60, tags: ['products'] }
)

const cachedGetBestSellers = unstable_cache(
  fetchBestSellersRaw,
  ['getBestSellers-cache-v1'],
  { revalidate: 60, tags: ['products'] }
)

const cachedGetPublishedBlogs = unstable_cache(
  fetchPublishedBlogsRaw,
  ['getPublishedBlogs-cache-v1'],
  { revalidate: 60, tags: ['blogs'] }
)

// Exported functions safe for both Server and Client environments
export const getProducts = (): Promise<Product[]> => {
  if (typeof window !== 'undefined') {
    return fetchProductsRaw()
  }
  return cachedGetProducts()
}

export const getProductBySlug = (slug: string): Promise<Product | null> => {
  if (typeof window !== 'undefined') {
    return fetchProductBySlugRaw(slug)
  }
  return unstable_cache(
    () => fetchProductBySlugRaw(slug),
    [`getProductBySlug-${slug}-v1`],
    { revalidate: 60, tags: ['products', `product-${slug}`] }
  )()
}

export const getBestSellers = (): Promise<Product[]> => {
  if (typeof window !== 'undefined') {
    return fetchBestSellersRaw()
  }
  return cachedGetBestSellers()
}

export const getPublishedBlogs = (): Promise<Blog[]> => {
  if (typeof window !== 'undefined') {
    return fetchPublishedBlogsRaw()
  }
  return cachedGetPublishedBlogs()
}
