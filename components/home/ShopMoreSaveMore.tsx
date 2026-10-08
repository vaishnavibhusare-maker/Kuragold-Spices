import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

const COMBOS = [
  {
    title: 'Daily Essential Spice Box',
    desc: 'Haldi + Red Chilli + Coriander Powder Combo',
    link: '/products/combo-pack',
  },
  {
    title: 'Family Kitchen Spice Combo',
    desc: 'Multi-pack sizes for everyday household cooking',
    link: '/products/combo-pack',
  },
  {
    title: 'Special Celebration Pack',
    desc: 'Premium selection of essential ground spices',
    link: '/products/combo-pack',
  },
]

export function ShopMoreSaveMore({ contentMap = {} }: { contentMap?: Record<string, string> }) {
  const sectionLabel = contentMap.home_combos_section_label || 'Shop More & Save More'
  const title = contentMap.home_combos_title || 'Bigger Flavours. Better Combinations.'

  const combos = [
    {
      id: 'combo1',
      title: contentMap.home_combo1_title || 'Daily Essential Spice Box',
      desc: contentMap.home_combo1_desc || 'Haldi + Red Chilli + Coriander Powder Combo',
      link: '/products/combo-pack',
    },
    {
      id: 'combo2',
      title: contentMap.home_combo2_title || 'Family Kitchen Spice Combo',
      desc: contentMap.home_combo2_desc || 'Multi-pack sizes for everyday household cooking',
      link: '/products/combo-pack',
    },
    {
      id: 'combo3',
      title: contentMap.home_combo3_title || 'Special Celebration Pack',
      desc: contentMap.home_combo3_desc || 'Premium selection of essential ground spices',
      link: '/products/combo-pack',
    },
  ]

  return (
    <section className="bg-cream/60 px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((combo) => (
            <Link
              key={combo.id}
              href={combo.link}
              className="group flex flex-col justify-between rounded-2xl border border-gold/40 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold hover:shadow-lg"
            >
              <div>
                <span className="rounded-full bg-cream px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-maroon">
                  Combo Pack
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-maroon">{combo.title}</h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">{combo.desc}</p>
              </div>

              <div className="mt-6 flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-maroon group-hover:text-gold transition-colors">
                <span>Explore Combo</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
