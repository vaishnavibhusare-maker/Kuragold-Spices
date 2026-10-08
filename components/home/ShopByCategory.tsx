import Image from 'next/image'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

const CATEGORIES = [
  {
    title: 'Pure Grounded Spices',
    subtitle: 'Haldi, Red Chilli & Coriander Powders',
    tag: '3 Products Available',
    href: '/products?category=pure_grounded',
    image: '/products/cat_pure_grounded.webp',
    isAvailable: true,
  },
  {
    title: 'Blended Spices',
    subtitle: 'Garam Masala & Biryani Blends',
    tag: 'Coming Soon',
    href: '/products?category=blended',
    image: '/products/cat_blended.webp',
    isAvailable: false,
  },
  {
    title: 'Whole Spices',
    subtitle: 'Whole Coriander, Pepper & Cumin',
    tag: 'Coming Soon',
    href: '/products?category=whole',
    image: '/products/cat_whole.webp',
    isAvailable: false,
  },
]

export function ShopByCategory({ contentMap = {} }: { contentMap?: Record<string, string> }) {
  const sectionLabel = contentMap.home_cat_section_label || 'Shop By Category'
  const title = contentMap.home_cat_title || 'Discover Spices for Every Kitchen'

  return (
    <section className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="flex flex-col overflow-hidden rounded-2xl border border-border-gold/50 bg-white shadow-sm"
            >
              <div className="relative h-48 w-full overflow-hidden bg-cream">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-xs px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-gold-light">
                  {cat.tag}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between bg-maroon-dark p-5 text-ivory">
                <div>
                  <h3 className="font-heading text-xl font-bold text-gold">{cat.title}</h3>
                  <p className="mt-1 font-body text-xs text-gold-muted">{cat.subtitle}</p>
                </div>

                <div className="mt-4 flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-gold">
                  <span>Explore Category</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
