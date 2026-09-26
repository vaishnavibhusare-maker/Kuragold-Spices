'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle } from 'lucide-react'
import { AddToCartButton } from './AddToCartButton'
import { PriceDisplay } from './PriceDisplay'
import { SizeSelector } from './SizeSelector'
import { useWishlist } from '@/context/WishlistContext'
import { buildSingleProductOrderMessage, buildComingSoonNotifyMessage } from '@/lib/whatsapp'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

export function ProductCard({ product }: { product: Product }) {
  const isComingSoon = product.status === 'coming_soon'
  const { isWishlisted, toggleWishlist } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const variants = product.product_variants || []
  const [selectedId, setSelectedId] = useState(variants[0]?.id)
  const selected = variants.find((v) => v.id === selectedId) ?? variants[0]

  if (isComingSoon) {
    return (
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-border-gold/60 bg-white shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
        <div className="relative block h-52 bg-cream">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-4 opacity-75 transition-opacity duration-300 group-hover:opacity-100 group-"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-4xl opacity-30">🌿</div>
          )}
          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-maroon-dark px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest text-gold-light shadow-md">
              Coming Soon
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">{product.tagline || 'Spices'}</p>
            <h3 className="font-heading text-lg font-bold text-maroon">{product.name}</h3>
          </div>
          <p className="text-xs text-muted leading-relaxed">
            We are working on bringing this pure spice to your kitchen. Stay tuned for launch!
          </p>

          <a
            href={buildComingSoonNotifyMessage(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex items-center justify-center rounded-full border border-maroon/60 bg-cream/50 px-4 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-maroon transition-colors hover:bg-maroon hover:text-ivory shadow-2xs"
          >
            NOTIFY ME
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-gold/60 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="relative block h-48 bg-cream">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              'object-contain p-6 transition-all duration-300',
              product.back_image_url && 'group-hover:opacity-0'
            )}
          />
        )}
        {product.back_image_url && (
          <Image
            src={product.back_image_url}
            alt={`${product.name} Backside`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-6 opacity-0 transition-all duration-300 group-hover:opacity-100"
          />
        )}
      </Link>

      {/* Wishlist Toggle Button */}
      <button
        type="button"
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        onClick={(e) => {
          e.preventDefault()
          toggleWishlist(product.id)
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-xs transition-colors hover:bg-white"
      >
        <Heart
          size={16}
          className={wishlisted ? 'fill-maroon text-maroon' : 'text-muted hover:text-maroon'}
        />
      </button>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <Link href={`/products/${product.slug}`}>
          <p className="font-body text-xs font-bold uppercase tracking-wide text-gold">{product.tagline}</p>
          <h3 className="font-heading text-lg font-bold text-maroon">{product.name}</h3>
        </Link>

        {selected && (
          <div className="mt-auto flex flex-col gap-3">
            <SizeSelector variants={variants} selectedId={selected.id} onSelect={(v) => setSelectedId(v.id)} />
            <PriceDisplay price={selected.price_inr} />

            <div className="flex flex-col gap-2 sm:flex-row">
              <AddToCartButton
                productId={product.id}
                productName={product.name}
                productImage={product.image_url}
                variantId={selected.id}
                sizeLabel={selected.size_label}
                price={selected.price_inr}
                className="flex-1 py-2.5 text-xs"
              />
              <a
                href={buildSingleProductOrderMessage(product.name, selected.size_label, selected.price_inr)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-full border-2 border-maroon bg-white px-3 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-maroon transition-colors hover:bg-maroon hover:text-ivory"
              >
                Shop Now
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
