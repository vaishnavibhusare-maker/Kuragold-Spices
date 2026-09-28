'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function toggleProductActive(id: string, isActive: boolean) {
  const supabase = createClient()
  await supabase.from('products').update({ is_active: isActive }).eq('id', id)
  revalidatePath('/admin/products')
}

export async function createProduct() {
  const supabase = createClient()
  const slug = `new-product-${Date.now()}`
  const { data, error } = await supabase
    .from('products')
    .insert({ name: 'New Product', slug, category: 'pure_grounded', status: 'active', is_active: false, description: '' })
    .select('id')
    .single()

  if (error || !data) return

  revalidatePath('/admin/products')
  redirect(`/admin/products/${data.id}`)
}

export async function updateProduct(id: string, oldSlug: string, formData: FormData) {
  const supabase = createClient()
  const newSlug = String(formData.get('slug') ?? oldSlug)

  await supabase
    .from('products')
    .update({
      name: String(formData.get('name') ?? ''),
      slug: newSlug,
      category: String(formData.get('category') ?? 'pure_grounded'),
      tagline: String(formData.get('tagline') ?? ''),
      description: String(formData.get('description') ?? ''),
      image_url: String(formData.get('image_url') ?? ''),
      is_active: formData.get('is_active') === 'on',
      status: String(formData.get('status') ?? 'active'),
      is_best_seller: formData.get('is_best_seller') === 'on',
      is_featured: formData.get('is_featured') === 'on',
      sort_order: Number(formData.get('sort_order') ?? 0),
    })
    .eq('id', id)

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  revalidatePath('/products')
  revalidatePath(`/products/${oldSlug}`)
  revalidatePath('/')
  redirect('/admin/products?updated=true')
}

export async function deleteProduct(id: string, slug?: string) {
  const supabase = createClient()
  // Delete variants first if any
  await supabase.from('product_variants').delete().eq('product_id', id)
  // Delete main product
  await supabase.from('products').delete().eq('id', id)

  revalidatePath('/admin/products')
  revalidatePath('/products')
  if (slug) revalidatePath(`/products/${slug}`)
  revalidatePath('/')

  redirect('/admin/products?deleted=true')
}

export async function addVariant(productId: string, slug: string, sizeLabel: string, price: number) {
  const supabase = createClient()
  await supabase
    .from('product_variants')
    .insert({ product_id: productId, size_label: sizeLabel, price_inr: price, sort_order: 99 })

  revalidatePath(`/admin/products/${productId}`)
  revalidatePath(`/products/${slug}`)
}

export async function updateVariant(id: string, price: number, slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('product_variants')
    .update({ price_inr: price })
    .eq('id', id)
    .select('product_id')
    .single()

  if (data) revalidatePath(`/admin/products/${data.product_id}`)
  revalidatePath(`/products/${slug}`)
}

export async function toggleVariantActive(id: string, isActive: boolean, slug: string) {
  const supabase = createClient()
  const { data } = await supabase
    .from('product_variants')
    .update({ is_active: isActive })
    .eq('id', id)
    .select('product_id')
    .single()

  if (data) revalidatePath(`/admin/products/${data.product_id}`)
  revalidatePath(`/products/${slug}`)
}

export async function deleteVariant(id: string, productId: string, slug: string) {
  const supabase = createClient()
  await supabase.from('product_variants').delete().eq('id', id)
  revalidatePath(`/admin/products/${productId}`)
  revalidatePath(`/products/${slug}`)
}

export async function toggleClaim(key: string, isConfirmed: boolean) {
  const supabase = createClient()
  await supabase.from('site_claims').update({ is_confirmed: isConfirmed }).eq('key', key)
  revalidatePath('/admin/claims')
}

export async function markEnquiryRead(id: string, isRead: boolean) {
  const supabase = createClient()
  await supabase.from('enquiries').update({ is_read: isRead }).eq('id', id)
  revalidatePath('/admin/enquiries')
}

// ── BLOG ACTIONS ──────────────────────────────────────────────────────────
export async function createBlog() {
  const supabase = createClient()
  const slug = `blog-${Date.now()}`
  const { data, error } = await supabase
    .from('blogs')
    .insert({ title: 'New Blog Post', slug, category: 'general', is_published: false })
    .select('id')
    .single()

  if (error || !data) return

  revalidatePath('/admin/blog')
  redirect(`/admin/blog/${data.id}`)
}

export async function updateBlog(id: string, formData: FormData) {
  const supabase = createClient()
  const isPublished = formData.get('is_published') === 'on'

  await supabase
    .from('blogs')
    .update({
      title: String(formData.get('title') ?? ''),
      slug: String(formData.get('slug') ?? ''),
      excerpt: String(formData.get('excerpt') ?? ''),
      content: String(formData.get('content') ?? ''),
      cover_image: String(formData.get('cover_image') ?? ''),
      category: String(formData.get('category') ?? 'general'),
      is_published: isPublished,
      published_at: isPublished ? new Date().toISOString() : null,
    })
    .eq('id', id)

  revalidatePath('/admin/blog')
  revalidatePath(`/admin/blog/${id}`)
  revalidatePath('/blog')
}

export async function deleteBlog(id: string) {
  const supabase = createClient()
  await supabase.from('blogs').delete().eq('id', id)
  revalidatePath('/admin/blog')
  redirect('/admin/blog')
}

export async function updateSiteContentAction(formData: FormData) {
  const { updateContentKey } = await import('@/lib/siteContent')

  const entries = Array.from(formData.entries())
  for (const [key, value] of entries) {
    if (typeof value === 'string' && !key.startsWith('$ACTION_')) {
      await updateContentKey(key, value)
    }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin/content')
  redirect('/admin/content?saved=true')
}
