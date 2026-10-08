import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Package,
  ShieldCheck,
  Leaf,
  UtensilsCrossed,
  Award,
  CheckCircle2,
  MapPin,
  Sparkles,
  HeartHandshake,
  Eye,
  Target,
  Flame,
  ShoppingBag,
  MessageCircle,
  Clock,
  ThumbsUp,
} from 'lucide-react'
import { getProducts } from '@/hooks/useProducts'
import { SITE_NAME, WA_NUMBER } from '@/lib/constants'
import { getSiteContentMap } from '@/lib/siteContent'

const whatsappLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello Kura Gold Spices team, I would like to inquire about your spice range.')}`

export const metadata: Metadata = {
  title: 'About Us',
  description: `Discover the story of ${SITE_NAME} (JK Enterprises, Hyderabad) — authentic Indian spices, farm-direct sourcing, zero adulteration, and traditional culinary heritage.`,
}

export const dynamic = 'force-dynamic'

export default async function AboutPage() {
  const [products, contentMap] = await Promise.all([
    getProducts(),
    getSiteContentMap(),
  ])
  const productCount = Math.max(products.length, 4)

  return (
    <main className="bg-ivory text-ink">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#3D0A0A_0%,#5C0E0E_50%,#3D0A0A_100%)] py-6 sm:py-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Left Spice Graphic */}
          <div className="relative hidden h-28 w-28 shrink-0 sm:block md:h-36 md:w-36 lg:h-40 lg:w-40">
            <Image
              src="/about/spices-left.png"
              alt="Red Chilli Powder in Terracotta Bowl"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>

          {/* Center Banner Content */}
          <div className="flex-1 text-center px-4 max-w-3xl mx-auto">
            <div className="mb-1.5 flex items-center justify-center gap-2">
              <span className="h-px w-5 bg-gold/60" />
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.2em] text-gold-light">
                {contentMap.about_hero_label || "HYDERABAD'S HERITAGE SPICE HOUSE"}
              </span>
              <span className="h-px w-5 bg-gold/60" />
            </div>

            <h1 className="font-heading text-2xl font-bold tracking-wide text-ivory sm:text-3xl md:text-4xl">
              {contentMap.about_hero_title || 'About Kura Gold Spices'}
            </h1>

            <p className="mt-1.5 font-accent text-sm sm:text-base italic text-[#F7E7CE] font-semibold max-w-xl mx-auto leading-relaxed">
              &quot;{contentMap.about_hero_subtitle || 'Bringing Authentic Indian Flavours, Farm-Direct Purity & Culinary Heritage to Every Kitchen'}&quot;
            </p>

            {/* Quick Trust Chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#4A0A0A]/90 border border-gold/40 px-2.5 py-0.5 text-[11px] font-medium text-ivory shadow-sm">
                <Leaf className="h-3 w-3 text-gold" /> {contentMap.about_hero_badge1 || '100% Pure & Natural'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#4A0A0A]/90 border border-gold/40 px-2.5 py-0.5 text-[11px] font-medium text-ivory shadow-sm">
                <MapPin className="h-3 w-3 text-gold" /> {contentMap.about_hero_badge2 || 'Hyderabad, Telangana'}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#4A0A0A]/90 border border-gold/40 px-2.5 py-0.5 text-[11px] font-medium text-ivory shadow-sm">
                <ShieldCheck className="h-3 w-3 text-gold" /> {contentMap.about_hero_badge3 || 'FSSAI License Certified'}
              </span>
            </div>
          </div>

          {/* Right Spice Graphic */}
          <div className="relative hidden h-28 w-28 shrink-0 sm:block md:h-36 md:w-36 lg:h-40 lg:w-40">
            <Image
              src="/about/spices-right.png"
              alt="Turmeric, Cumin and Star Anise Bowls"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. OUR STORY & HYDERABAD ROOTED HERITAGE */}
      <section className="bg-ivory px-6 py-6 sm:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Column: Visual Brand Story Banner */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-[#3D0A0A] p-5 text-ivory shadow-lg sm:p-6">
                {/* Decorative Background Glow */}
                <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-gold/10 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-maroon-dark/60 border border-gold/30 px-2.5 py-0.5 text-[11px] font-bold text-gold">
                    <Sparkles className="h-3 w-3 text-gold" /> {contentMap.about_story_badge || 'A Unit of JK Enterprises'}
                  </div>

                  <h3 className="font-heading text-xl font-bold leading-snug text-ivory sm:text-2xl">
                    {contentMap.about_story_card_title || 'Crafted for Lovers of Authentic Taste.'}
                  </h3>

                  <p className="mt-2 text-xs text-cream/90 leading-relaxed">
                    {contentMap.about_story_card_text || 'Based in the historic city of Hyderabad, Telangana, Kura Gold Spices was born from a simple promise: to eliminate artificial adulteration and deliver pristine, aromatic spices directly to home cooks.'}
                  </p>

                  <div className="mt-4 pt-4 border-t border-gold/30 grid grid-cols-2 gap-3">
                    <div>
                      <span className="block font-heading text-xl sm:text-2xl font-bold text-gold">
                        {productCount}+
                      </span>
                      <span className="text-[10px] text-cream/80 uppercase tracking-wider font-semibold">
                        {contentMap.about_story_stat1_label || 'Spice Varieties'}
                      </span>
                    </div>

                    <div>
                      <span className="block font-heading text-xl sm:text-2xl font-bold text-gold">
                        100%
                      </span>
                      <span className="text-[10px] text-cream/80 uppercase tracking-wider font-semibold">
                        {contentMap.about_story_stat2_label || 'Natural & Pure'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="h-px w-6 bg-gold" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  {contentMap.about_story_label || 'OUR BRAND STORY'}
                </span>
              </div>

              <h2 className="font-heading text-xl font-bold leading-tight text-maroon sm:text-2xl md:text-3xl">
                {contentMap.about_story_headline || 'Rooted in Tradition, Refined for Today’s Kitchens.'}
              </h2>

              <div className="mt-3 space-y-2.5 font-body text-xs sm:text-sm leading-relaxed text-muted">
                <p>
                  {contentMap.about_story_p1 || 'At Kura Gold Spices, we believe that great food starts with uncompromised ingredients. Hyderabad has long been celebrated worldwide for its rich culinary traditions, royal biryanis, and vibrant spice markets. We carry that legacy forward into every pouch we package.'}
                </p>
                <p>
                  {contentMap.about_story_p2 || 'We source raw spices directly from renowned farming regions across India. Each batch undergoes careful hand-selection, hygienic cleaning, and gentle processing to preserve the spice’s natural essential oils, deep color, and intense aroma.'}
                </p>
                <p>
                  {contentMap.about_story_p3 || 'Whether you are preparing a quick weeknight curry, an authentic Sunday feast, or experimenting with regional delicacies, Kura Gold Spices delivers the exact warmth and flavor your family deserves.'}
                </p>
              </div>

              {/* Quality Guarantee Badges */}
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-cream border border-gold/30 px-3 py-1 text-[11px] font-bold text-maroon">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> {contentMap.about_story_pill1 || 'Zero Added Dyes'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cream border border-gold/30 px-3 py-1 text-[11px] font-bold text-maroon">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> {contentMap.about_story_pill2 || 'No Preservatives'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-cream border border-gold/30 px-3 py-1 text-[11px] font-bold text-maroon">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> {contentMap.about_story_pill3 || 'Aroma Lock Pouches'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISION & MISSION SECTION */}
      <section className="bg-[#FAF6F0] px-6 py-6 sm:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-5">
            <div className="mb-1 flex items-center justify-center gap-2.5">
              <span className="h-px w-6 bg-gold" />
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                {contentMap.about_purpose_label || 'OUR PURPOSE'}
              </span>
              <span className="h-px w-6 bg-gold" />
            </div>

            <h2 className="font-heading text-xl font-bold text-maroon sm:text-2xl md:text-3xl">
              {contentMap.about_purpose_title || 'Guided by Vision & Driven by Mission'}
            </h2>
            <p className="mx-auto mt-1 max-w-md text-xs text-muted leading-relaxed">
              {contentMap.about_purpose_subtitle || 'Building a healthier, more flavourful future for Indian homes through unadulterated purity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Vision Card */}
            <div className="relative rounded-2xl border-2 border-gold/40 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-md">
                <Eye className="h-5 w-5 text-gold" />
              </div>

              <h3 className="font-heading text-lg font-bold text-maroon">
                {contentMap.about_vision_title || 'Our Vision'}
              </h3>

              <p className="mt-2 text-xs text-muted leading-relaxed">
                {contentMap.about_vision_text || 'To become India’s most trusted household name for pure, authentic spices—celebrated for preserving regional culinary heritage while setting modern benchmarks in hygiene, safety, and freshness.'}
              </p>
            </div>

            {/* Mission Card */}
            <div className="relative rounded-2xl border-2 border-gold/40 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-md">
                <Target className="h-5 w-5 text-gold" />
              </div>

              <h3 className="font-heading text-lg font-bold text-maroon">
                {contentMap.about_mission_title || 'Our Mission'}
              </h3>

              <p className="mt-2 text-xs text-muted leading-relaxed">
                {contentMap.about_mission_text || 'To deliver unadulterated, farm-fresh spices in convenient pack sizes for every kitchen—ensuring that every meal cooked with Kura Gold Spices is rich in natural aroma, essential oils, and wholesome nutrition.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4 PILLARS OF KURA GOLD PURITY */}
      <section className="bg-ivory px-6 py-6 sm:px-8 lg:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-5">
            <div className="mb-1 flex items-center justify-center gap-2.5">
              <span className="h-px w-6 bg-gold" />
              <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                {contentMap.about_pillars_label || 'WHY FAMILIES TRUST US'}
              </span>
              <span className="h-px w-6 bg-gold" />
            </div>

            <h2 className="font-heading text-xl font-bold text-maroon sm:text-2xl md:text-3xl">
              {contentMap.about_pillars_title || 'The 4 Pillars of Kura Gold Excellence'}
            </h2>
            <p className="mx-auto mt-1 max-w-lg text-xs text-muted leading-relaxed">
              {contentMap.about_pillars_subtitle || 'Every pouch of Kura Gold Spices is backed by strict standards of quality, farm sourcing, and hygienic care.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Pillar 1 */}
            <div className="rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                <Leaf className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-heading text-sm font-bold text-maroon">
                {contentMap.about_pillar1_title || 'Direct Farm Sourcing'}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-[#3A2414] leading-relaxed">
                {contentMap.about_pillar1_desc || 'We select prime raw spices directly from trusted farmers and traditional spice cultivation hubs across India.'}
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                <Flame className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-heading text-sm font-bold text-maroon">
                {contentMap.about_pillar2_title || 'Natural Essential Oils'}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-[#3A2414] leading-relaxed">
                {contentMap.about_pillar2_desc || 'Processed at controlled temperatures to lock in volatile oils, natural pungency, and authentic aromatic warmth.'}
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                <ShieldCheck className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-heading text-sm font-bold text-maroon">
                {contentMap.about_pillar3_title || 'Zero Adulteration'}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-[#3A2414] leading-relaxed">
                {contentMap.about_pillar3_desc || '100% pure spices with no added synthetic dyes, MSG, artificial flavors, or starch fillers—guaranteed.'}
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                <Package className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-heading text-sm font-bold text-maroon">
                {contentMap.about_pillar4_title || 'Multiple Pack Sizes'}
              </h3>
              <p className="mt-1.5 text-xs font-medium text-[#3A2414] leading-relaxed">
                {contentMap.about_pillar4_desc || 'Available in convenient 50g to 500g pouches tailored for small families, large households, and culinary lovers.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT SETS US APART */}
      <section className="bg-[#FAF6F0] px-6 py-6 sm:px-8 lg:py-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-1.5 flex items-center gap-2.5">
                <span className="h-px w-6 bg-gold" />
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  {contentMap.about_adv_label || 'THE KURA GOLD ADVANTAGE'}
                </span>
              </div>

              <h2 className="font-heading text-xl font-bold leading-tight text-maroon sm:text-2xl md:text-3xl">
                {contentMap.about_adv_title || 'What Makes Kura Gold Different?'}
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-[#3A2414] font-medium leading-relaxed">
                {contentMap.about_adv_subtitle || 'Unlike mass-market commercial brands that mix salt, starch, and synthetic colors into spice powders, Kura Gold Spices maintains strict purity standards:'}
              </p>

              <div className="mt-4 space-y-2.5">
                <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-white p-3 shadow-sm">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon text-gold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-maroon sm:text-sm">
                      {contentMap.about_adv1_title || 'Pure Unadulterated Taste'}
                    </h4>
                    <p className="mt-0.5 text-xs text-[#3A2414] font-medium">
                      {contentMap.about_adv1_desc || 'Full-bodied flavor requiring smaller pinch quantities per dish.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-white p-3 shadow-sm">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon text-gold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-maroon sm:text-sm">
                      {contentMap.about_adv2_title || 'Hygiene & Safety Certified'}
                    </h4>
                    <p className="mt-0.5 text-xs text-[#3A2414] font-medium">
                      {contentMap.about_adv2_desc || 'Processed under strict valid FSSAI guidelines for ultimate peace of mind.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 rounded-xl border border-gold/30 bg-white p-3 shadow-sm">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon text-gold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-heading text-xs font-bold text-maroon sm:text-sm">
                      {contentMap.about_adv3_title || '24/7 Dedicated Support'}
                    </h4>
                    <p className="mt-0.5 text-xs text-[#3A2414] font-medium">
                      {contentMap.about_adv3_desc || 'Need custom pack orders or quick answers? Reach our team directly on WhatsApp 24/7.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Visual Banner */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border-2 border-gold/40 bg-white p-5 shadow-md text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold shadow-md">
                  <Award className="h-6 w-6 text-gold" />
                </div>

                <h3 className="font-heading text-xl font-bold text-maroon">
                  {contentMap.about_adv_card_title || 'Tested for Purity & Excellence'}
                </h3>

                <p className="mt-1.5 text-xs text-muted leading-relaxed max-w-sm mx-auto">
                  {contentMap.about_adv_card_desc || 'Every batch of Kura Gold Spices is crafted to elevate your daily meals into wholesome, aromatic culinary experiences.'}
                </p>

                <div className="mt-5 flex justify-center gap-2.5">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-maroon px-4 py-2 text-xs font-bold text-gold transition-all duration-300 hover:bg-maroon-dark hover:shadow-md"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" /> Explore Products
                  </Link>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-maroon bg-white px-4 py-2 text-xs font-bold text-maroon transition-all duration-300 hover:bg-cream"
                  >
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-600" /> WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BOTTOM BANNER */}
      <section className="bg-[linear-gradient(135deg,#3D0A0A_0%,#5C0E0E_50%,#3D0A0A_100%)] py-8 sm:py-10 text-ivory text-center px-6">
        <div className="mx-auto max-w-4xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 border border-gold/40 px-3.5 py-0.5 text-[11px] font-bold text-gold mb-2">
            <Sparkles className="h-3 w-3 text-gold" /> {contentMap.about_cta_label || 'BRING HOME AUTHENTIC FLAVOURS'}
          </span>

          <h2 className="font-heading text-xl font-bold text-ivory sm:text-2xl md:text-3xl">
            {contentMap.about_cta_title || 'Taste the Pure Difference of Kura Gold Spices'}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-cream/90 max-w-lg mx-auto leading-relaxed">
            {contentMap.about_cta_subtitle || "Order your favorite spices today and experience the rich aroma, vibrant color, and uncompromised purity of Hyderabad's finest spice blends."}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#E5B842] px-6 py-2.5 text-xs font-bold text-maroon shadow-md transition-all duration-300 hover:bg-[#F3C856]"
            >
              <ShoppingBag className="h-4 w-4 text-maroon" /> Shop Spices Now
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4 text-white" /> Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
