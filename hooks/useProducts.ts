import { unstable_cache } from 'next/cache'
import { createClient } from '@/lib/supabase/public'
import { parseProductImages } from '@/lib/productImages'
import type { Blog, Product } from '@/types'

export const getProducts = unstable_cache(
  async (): Promise<Product[]> => {
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
  },
  ['getProducts-cache-v1'],
  { revalidate: 60, tags: ['products'] }
)

export const getProductBySlug = (slug: string): Promise<Product | null> =>
  unstable_cache(
    async (): Promise<Product | null> => {
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
    },
    [`getProductBySlug-${slug}-v1`],
    { revalidate: 60, tags: ['products', `product-${slug}`] }
  )()

export const getBestSellers = unstable_cache(
  async (): Promise<Product[]> => {
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
  },
  ['getBestSellers-cache-v1'],
  { revalidate: 60, tags: ['products'] }
)

export const getPublishedBlogs = unstable_cache(
  async (): Promise<Blog[]> => {
    const supabase = createClient()
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)

    return (data as Blog[]) ?? []
  },
  ['getPublishedBlogs-cache-v1'],
  { revalidate: 60, tags: ['blogs'] }
)
