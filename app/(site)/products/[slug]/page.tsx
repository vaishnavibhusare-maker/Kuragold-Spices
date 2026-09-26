import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { ProductPurchasePanel } from '@/components/products/ProductPurchasePanel'
import { ProductDetailedSpecs } from '@/components/products/ProductDetailedSpecs'
import { ProductGallery } from '@/components/products/ProductGallery'
import { LinkButton } from '@/components/ui/Button'
import { getProductBySlug, getProducts } from '@/hooks/useProducts'
import { CATEGORY_LABELS } from '@/lib/constants'
import { buildComingSoonNotifyMessage } from '@/lib/whatsapp'

const PLACEHOLDER_DESCRIPTION = ''

interface ProductPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.tagline
      ? `${product.tagline} — ${product.name} from Kura Gold Spices.`
      : product.name,
    openGraph: product.image_url ? { images: [{ url: product.image_url }] } : undefined,
  }
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)
  if (!product) notFound()

  const isComingSoon = product.status === 'coming_soon'
  const hasDescription = Boolean(product.description) && product.description !== PLACEHOLDER_DESCRIPTION

  if (isComingSoon) {
    return (
      <main className="bg-ivory px-6 py-16 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-xs font-bold uppercase tracking-widest text-gold mb-2">
            {CATEGORY_LABELS[product.category] ?? 'Pure Spice'}
          </p>
          <h1 className="font-heading text-3xl font-bold text-maroon sm:text-4xl mb-2">{product.name}</h1>
          {product.tagline && (
            <p className="font-accent text-lg italic text-gold mb-8">{product.tagline}</p>
          )}

          <div className="rounded-3xl border border-gold/40 bg-white p-8 sm:p-10 shadow-lg mb-8">
            <span className="inline-block rounded-full bg-maroon-dark px-6 py-2 font-body text-xs font-bold uppercase tracking-widest text-gold-light mb-4 shadow-sm">
              Coming Soon
            </span>
            <p className="font-heading text-xl font-bold text-maroon mb-3">
              We are working on bringing this spice to you.
            </p>
            <p className="text-sm text-muted mb-8 leading-relaxed max-w-md mx-auto">
              Get notified immediately on WhatsApp as soon as this product is available for order.
            </p>

            <a
              href={buildComingSoonNotifyMessage(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-maroon bg-cream/60 px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-maroon hover:bg-maroon hover:text-ivory shadow-md transition-transform"
            >
              NOTIFY ME
            </a>
          </div>

          <LinkButton href="/products" variant="outline">
            ← Back to All Products
          </LinkButton>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-ivory px-6 py-16 sm:px-10">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2">
        <ProductGallery
          productName={product.name}
          frontImage={product.image_url}
          backImage={product.back_image_url}
          images={product.images}
        />

        <div>
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">
            {CATEGORY_LABELS[product.category] ?? 'Spice Powder'}
          </p>
          <h1 className="mt-1 font-heading text-3xl font-bold text-maroon sm:text-4xl">{product.name}</h1>
          {product.tagline && (
            <p className="mt-2 font-accent text-lg italic text-gold">{product.tagline}</p>
          )}

          <div className="my-5 h-px bg-border-gold/50" />

          {product.description && (
            <div className="mb-6 space-y-2">
              <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                Product Description
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-ink/80">{product.description}</p>
            </div>
          )}

          {/* Product Highlights */}
          <div className="mb-6 rounded-xl border border-gold/30 bg-cream/40 p-4 space-y-2 text-xs font-body text-ink">
            <div className="flex items-center gap-2 font-bold text-maroon">
              <span>✦ 100% Pure & Natural</span>
              <span className="text-gold">•</span>
              <span>✦ No Added Colors</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <span>✦ FSSAI Certified: 23626030003544</span>
              <span>•</span>
              <span>✦ Sourced from Premium Farms</span>
            </div>
          </div>

          <ProductPurchasePanel product={product} />
        </div>
      </div>

      {/* Comprehensive Original Product Specifications */}
      <div className="mx-auto max-w-5xl">
        <ProductDetailedSpecs slug={product.slug} fallbackDescription={product.description} />
      </div>
    </main>
  )
}
