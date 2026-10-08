import Image from 'next/image'
import { LinkButton } from '@/components/ui/Button'
import type { Product, SiteClaim } from '@/types'

const HERO_BADGES = [
  { label: '100% Pure', icon: '🌿' },
  { label: 'No Added Colour', icon: '✨' },
  { label: 'Make In India', icon: '✦' },
  { label: 'Net Wt. 50g - 500g', icon: '📦' },
]

interface HeroProps {
  products?: Product[]
  claims: SiteClaim[]
  contentMap?: Record<string, string>
}

function renderHeadlineText(text: string) {
  if (text.includes('Gold')) {
    const parts = text.split('Gold')
    return (
      <>
        {parts[0]}
        <span className="font-accent italic text-gold">Gold</span>
        {parts.slice(1).join('Gold')}
      </>
    )
  }
  return text
}

export function Hero({ claims, contentMap = {} }: HeroProps) {
  const natural = claims.find((c) => c.key === 'natural')
  const noColour = claims.find((c) => c.key === 'no_colour')
  const showBadge = Boolean(natural && noColour)

  const headlineText = contentMap.home_hero_headline || 'The Gold Standard of Indian Spices.'
  const subheadlineText =
    contentMap.home_hero_subheadline ||
    'Pure, hand-ground spices from Hyderabad — where heritage tradition meets uncompromising purity. Sourced directly from premier Indian farms, cold-processed to retain natural essential oils, and packed with zero added artificial colors or preservatives for authentic everyday cooking.'

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#5C0E0E_0%,#7A1515_50%,#3D0A0A_100%)] px-6 py-10 sm:px-10 sm:py-16 lg:py-0">
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:gap-12 lg:min-h-[88vh] lg:grid-cols-2">
        <div>
          {showBadge && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/40 px-4 py-1.5 font-body text-xs font-bold uppercase tracking-wide text-gold-light">
              <span aria-hidden="true">✦</span>
              {natural!.value} | {noColour!.value}
            </p>
          )}

          <h1 className="font-heading text-4xl font-black leading-tight text-ivory sm:text-5xl lg:text-6xl">
            {renderHeadlineText(headlineText)}
          </h1>

          <p className="mt-5 max-w-xl font-body text-sm sm:text-base leading-relaxed text-white/95 font-normal">
            {subheadlineText}
          </p>

          {/* Key Feature Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {HERO_BADGES.map((b) => (
              <span
                key={b.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-black/40 border border-gold/50 px-3.5 py-1.5 font-body text-xs font-bold text-gold-light shadow-md backdrop-blur-sm"
              >
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <LinkButton href="/products" variant="primary" className="px-8 py-3 text-sm font-bold shadow-lg">
              Explore Products
            </LinkButton>
          </div>
        </div>

        {/* Right Side: Hero Image Showcase */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative h-64 w-full overflow-hidden rounded-3xl border-2 border-gold/40 shadow-2xl sm:h-80 lg:h-[400px]">
            <Image
              src="/hero-spices-showcase.png"
              alt="Authentic Indian Spices - Kura Gold Spices"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/80 backdrop-blur-md border border-gold/40 p-3 text-center text-white">
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-gold-light">
                ✦ 100% PURE &amp; NATURAL HYDERABAD SPICES ✦
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
