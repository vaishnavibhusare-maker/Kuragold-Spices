import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { SiteClaim } from '@/types'

const CARDS = [
  {
    key: 'natural',
    icon: '🌿',
    title: '100% Natural Ingredients',
    badge: 'Zero Adulteration',
    description: 'Pure spices ground without synthetic dyes, MSG, artificial colors, or starch fillers—preserving full essential oils and authentic flavor.',
  },
  {
    key: 'fssai',
    icon: '🏅',
    title: 'FSSAI Safety Certified',
    badge: 'Lic. 23626030003544',
    description: 'Processed and packaged in hygienic facilities under strict Food Safety & Standards Authority of India (FSSAI) guidelines.',
  },
  {
    key: 'farm_sourced',
    icon: '🌾',
    title: 'Farm-Direct Sourcing',
    badge: 'Cold-Ground Process',
    description: 'Sourced directly from premier spice-growing regions across India and gently processed to retain maximum pungency and natural aroma.',
  },
  {
    key: 'pack_sizes',
    icon: '📦',
    title: 'Multiple Pack Sizes',
    badge: '50g to 500g Pouches',
    description: 'Available in convenient moisture-lock zipper pouches tailored for daily home cooking, bulk family use, and gifting.',
  },
  {
    key: 'support',
    icon: '💬',
    title: '24/7 Dedicated Support',
    badge: 'Instant Assistance',
    description: 'Reach our support team directly via WhatsApp or phone anytime for order tracking, bulk queries, and custom advice.',
  },
] as const

export function QualityPreview({
  claims: _claims,
  contentMap = {},
}: {
  claims?: SiteClaim[]
  contentMap?: Record<string, string>
} = {}) {
  const sectionLabel = contentMap.home_quality_section_label || 'Why Choose Us'
  const title = contentMap.home_quality_title || 'Purity is Our Promise'
  const subtitle =
    contentMap.home_quality_subtitle ||
    'Every pouch of Kura Gold Spices is backed by strict standards of farm sourcing, unadulterated purity, and hygienic care.'

  const cards = [
    {
      key: 'card1',
      icon: '🌿',
      badge: 'Zero Adulteration',
      title: contentMap.home_quality_card1_title || '100% Natural Ingredients',
      description:
        contentMap.home_quality_card1_desc ||
        'Pure spices ground without synthetic dyes, MSG, artificial colors, or starch fillers—preserving full essential oils and authentic flavor.',
    },
    {
      key: 'card2',
      icon: '🏅',
      badge: 'Lic. 23626030003544',
      title: contentMap.home_quality_card2_title || 'FSSAI Safety Certified',
      description:
        contentMap.home_quality_card2_desc ||
        'Processed and packaged in hygienic facilities under strict Food Safety & Standards Authority of India (FSSAI) guidelines.',
    },
    {
      key: 'card3',
      icon: '🌾',
      badge: 'Cold-Ground Process',
      title: contentMap.home_quality_card3_title || 'Farm-Direct Sourcing',
      description:
        contentMap.home_quality_card3_desc ||
        'Sourced directly from premier spice-growing regions across India and gently processed to retain maximum pungency and natural aroma.',
    },
    {
      key: 'card4',
      icon: '📦',
      badge: '50g to 500g Pouches',
      title: contentMap.home_quality_card4_title || 'Multiple Pack Sizes',
      description:
        contentMap.home_quality_card4_desc ||
        'Available in convenient moisture-lock zipper pouches tailored for daily home cooking, bulk family use, and gifting.',
    },
    {
      key: 'card5',
      icon: '💬',
      badge: 'Instant Assistance',
      title: contentMap.home_quality_card5_title || '24/7 Dedicated Support',
      description:
        contentMap.home_quality_card5_desc ||
        'Reach our support team directly via WhatsApp or phone anytime for order tracking, bulk queries, and custom advice.',
    },
  ]

  return (
    <section className="bg-[#FAF6F0] px-6 py-8 sm:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl text-center">
        <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
        <h2 className="font-heading text-2xl font-bold text-maroon sm:text-3xl lg:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-1.5 max-w-xl text-xs sm:text-sm font-medium text-[#3A2414] leading-relaxed mb-6">
          {subtitle}
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 text-left">
          {cards.map((card) => (
            <div
              key={card.key}
              className="flex flex-col justify-between rounded-2xl border border-border-gold/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-2xl" aria-hidden="true">{card.icon}</span>
                  <span className="rounded-full bg-cream border border-gold/30 px-2.5 py-0.5 font-body text-[10px] font-bold uppercase tracking-wider text-maroon">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-heading text-base font-bold text-maroon">
                  {card.title}
                </h3>

                <p className="mt-2 text-xs font-medium text-[#3A2414] leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <LinkButton href="/quality" variant="outline" className="mt-8 inline-flex border-maroon text-maroon hover:bg-maroon hover:text-ivory">
          View Quality Commitments
        </LinkButton>
      </div>
    </section>
  )
}
