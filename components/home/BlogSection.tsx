import Image from 'next/image'
import Link from 'next/link'
import { LinkButton } from '@/components/ui/Button'
import { SectionLabel } from '@/components/ui/SectionLabel'
import type { Blog } from '@/types'

export function BlogSection({ blogs, contentMap = {} }: { blogs: Blog[]; contentMap?: Record<string, string> }) {
  const sectionLabel = contentMap.home_story_section_label || 'Our Story'
  const title = contentMap.home_story_title || 'Crafted with Passion, Ground with Purity.'
  const subtitle =
    contentMap.home_story_subtitle ||
    'Discover the tradition, purity, and passion behind every pack of Kura Gold Spices.'

  const storyHeadline = contentMap.home_story_headline || 'Authentic Hyderabad Spices Delivered Fresh to Your Kitchen'
  const storyBody =
    contentMap.home_story_body ||
    "At Kura Gold Spices (a brand of JK Enterprises), our journey began with a single promise: to deliver 100% pure, unadulterated spices straight from Hyderabad’s rich culinary heritage to your family's table. We cold-grind natural spice seeds in small batches to preserve essential oils, rich natural aroma, and authentic taste."

  return (
    <section className="bg-ivory px-6 py-12 sm:px-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
          <h2 className="font-heading text-3xl font-bold text-maroon sm:text-4xl">
            {blogs.length === 0 ? title : 'Stories, Tips & Cooking Inspiration'}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {blogs.length === 0
              ? subtitle
              : 'Explore articles on spice purity, authentic recipes, and kitchen tips.'}
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="overflow-hidden rounded-3xl border border-border-gold/60 bg-white shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Image Showcase */}
              <div className="relative h-48 sm:h-72 lg:h-[420px] lg:col-span-5 rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl overflow-hidden bg-cream">
                <Image
                  src="/products/kura_gold_our_story_kitchen.webp"
                  alt="Kura Gold Spices Heritage"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-contain lg:object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/50 via-transparent to-transparent lg:hidden" />
              </div>

              {/* Right Story Content */}
              <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-center gap-4">
                <p className="font-heading text-xl sm:text-2xl font-bold text-maroon">
                  {storyHeadline}
                </p>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {storyBody}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border-gold/30 mt-2">
                  <div className="rounded-xl bg-ivory p-3.5 border border-border-gold/40">
                    <p className="font-heading text-xs font-bold text-maroon">🌿 100% Pure</p>
                    <p className="mt-1 text-[11px] text-muted">Zero artificial dyes, fillers, or chemicals.</p>
                  </div>
                  <div className="rounded-xl bg-ivory p-3.5 border border-border-gold/40">
                    <p className="font-heading text-xs font-bold text-maroon">❄️ Cold Ground</p>
                    <p className="mt-1 text-[11px] text-muted">Locks in natural essential oils &amp; aroma.</p>
                  </div>
                  <div className="rounded-xl bg-ivory p-3.5 border border-border-gold/40">
                    <p className="font-heading text-xs font-bold text-maroon">📍 Hyderabad</p>
                    <p className="mt-1 text-[11px] text-muted">Authentic South Indian spice lineage.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <LinkButton href="/about" variant="primary">
                    Read Our Story →
                  </LinkButton>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border-gold/50 bg-white shadow-sm transition-all duration-300 hover:border-gold hover:shadow-lg"
              >
                <div className="relative h-44 w-full bg-cream">
                  {blog.cover_image && (
                    <Image
                      src={blog.cover_image}
                      alt={blog.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-"
                    />
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-maroon px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-ivory">
                    {blog.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-maroon group-hover:underline">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted leading-relaxed line-clamp-2">{blog.excerpt}</p>
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 font-body text-xs font-bold uppercase tracking-wider text-maroon group-hover:text-gold">
                    Read Story →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {blogs.length > 0 && (
          <div className="mt-10 text-center">
            <LinkButton href="/blog" variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-ivory">
              View All Blogs
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  )
}
