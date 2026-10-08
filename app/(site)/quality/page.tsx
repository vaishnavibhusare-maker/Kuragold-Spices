import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Leaf,
  ShieldCheck,
  Package,
  Truck,
  Gem,
  UtensilsCrossed,
  Users,
  Search,
  MessageCircle,
  Award,
  MapPin,
  Headphones,
} from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getClaims } from '@/hooks/useClaims'
import { FSSAI_LIC, SITE_NAME } from '@/lib/constants'
import { buildGeneralInquiryMessage } from '@/lib/whatsapp'
import { getSiteContentMap } from '@/lib/siteContent'

export const metadata: Metadata = {
  title: 'Quality',
  description: `Our quality commitments, process, and certifications at ${SITE_NAME}.`,
}

export const dynamic = 'force-dynamic'

export default async function QualityPage() {
  const [claims, contentMap] = await Promise.all([
    getClaims(),
    getSiteContentMap(),
  ])
  const isConfirmed = (key: string) => claims.some((c) => c.key === key && c.is_confirmed)

  const certs = [
    {
      key: 'fssai',
      title: contentMap.quality_cert1_title || 'FSSAI CERTIFIED',
      subtitle: contentMap.quality_cert1_sub || `LIC. ${contentMap.quality_fssai_no || FSSAI_LIC}`,
      icon: '/badges/fssai.webp',
      width: 72,
      height: 72,
    },
    {
      key: 'telangana',
      title: contentMap.quality_cert2_title || 'GOVT. OF TELANGANA',
      subtitle: contentMap.quality_cert2_sub || 'TELANGANA, INDIA',
      icon: '/badges/telangana.webp',
      width: 72,
      height: 72,
    },
    {
      key: 'make_india',
      title: contentMap.quality_cert3_title || 'MAKE IN INDIA',
      subtitle: contentMap.quality_cert3_sub || 'PROUDLY INDIAN',
      icon: '/badges/make_in_india.webp',
      width: 140,
      height: 72,
    },
  ]

  const activeCerts = certs.filter((c) => isConfirmed(c.key))
  const whatsappUrl = buildGeneralInquiryMessage()

  const promises = [
    {
      icon: Gem,
      title: contentMap.quality_promise1_title || 'Consistent Quality',
      description: contentMap.quality_promise1_desc || 'We aim to deliver a dependable spice experience across our product range.',
    },
    {
      icon: UtensilsCrossed,
      title: contentMap.quality_promise2_title || 'Authentic Flavour',
      description: contentMap.quality_promise2_desc || 'Our products are made for the flavours that belong in everyday Indian kitchens.',
    },
    {
      icon: Users,
      title: contentMap.quality_promise3_title || 'Customer First',
      description: contentMap.quality_promise3_desc || 'From choosing a product to placing an order, we keep the experience simple and accessible.',
    },
  ]

  return (
    <main className="bg-cream/20">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#3D0A0A_0%,#5C0E0E_60%,#4A0B0B_100%)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 sm:px-8 lg:py-8">
          <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <span className="font-body text-[11px] font-bold uppercase tracking-widest text-gold">
                {contentMap.quality_hero_label || 'OUR QUALITY PROMISE'}
              </span>
              <h1 className="mt-1.5 font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl leading-tight">
                {contentMap.quality_hero_title1 || 'Quality You Can Taste.'}<br />
                <span className="text-gold-light">{contentMap.quality_hero_title2 || 'Care You Can Trust.'}</span>
              </h1>

              {/* Leaf Ornament Divider */}
              <div className="my-2.5 flex items-center gap-2.5 text-gold">
                <div className="h-px w-8 bg-gold/40" />
                <Leaf className="h-3 w-3" />
                <div className="h-px w-8 bg-gold/40" />
              </div>

              <p className="max-w-xl font-body text-xs text-cream/90 sm:text-sm leading-relaxed">
                {contentMap.quality_hero_subtitle || 'Every Kura Gold product is created with a simple purpose — to bring dependable quality and authentic flavour to everyday cooking.'}
              </p>
            </div>
            {/* Right Image Container */}
            <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-48 lg:col-span-5 lg:h-[220px]">
              <Image
                src="/about/quality-hero-spices.jpg"
                alt="Kura Gold Authentic Spices"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain object-center lg:object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE KURA GOLD */}
      <section className="bg-cream/40 px-6 py-8 sm:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
            {/* Left Column: Mortar & Pestle Image Card */}
            <div className="relative overflow-hidden rounded-[24px] border-2 border-gold/40 bg-[#3D0A0A] shadow-md lg:col-span-4 min-h-[340px] sm:min-h-[360px]">
              <Image
                src="/about/mortar-pestle-clean.png"
                alt="Mortar and pestle spices"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-center lg:object-cover"
                priority
              />
              {/* Overlay Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-transparent to-transparent" />

              {/* High-Contrast Crisp HTML Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-[#3D0A0A] p-3.5 sm:p-4 text-center border-2 border-[#E5B842]/60 shadow-2xl">
                {/* Floating Top Leaf Icon */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-[#3D0A0A] border-2 border-[#E5B842] text-[#E5B842] shadow-md">
                  <Leaf className="h-3.5 w-3.5 text-[#E5B842] fill-[#E5B842]/30" />
                </div>
                <p className="mt-1 font-heading text-xs sm:text-sm font-bold text-[#E5B842] tracking-wide">
                  {contentMap.quality_badge_title || 'Rooted in Indian kitchens,'}
                </p>
                <p className="mt-0.5 font-heading text-[11px] sm:text-xs font-bold text-[#FFF8E7]">
                  {contentMap.quality_badge_subtitle || 'crafted for modern homes.'}
                </p>
              </div>
            </div>

            {/* Right Column: Heading & 4 White Cards Grid */}
            <div className="flex flex-col justify-between lg:col-span-8">
              {/* Header directly aligned in front of image over 4 cards */}
              <div className="text-center mb-4">
                <div className="mb-1.5 flex items-center justify-center gap-3">
                  <span className="h-px w-8 bg-gold" />
                  <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    {contentMap.quality_why_label || 'WHY CHOOSE KURA GOLD'}
                  </span>
                  <span className="h-px w-8 bg-gold" />
                </div>

                <h2 className="font-heading text-2xl font-bold text-maroon sm:text-3xl lg:text-4xl">
                  {contentMap.quality_why_title || 'Purity is Our Promise'}
                </h2>
                <p className="mx-auto mt-1.5 max-w-lg text-xs text-muted leading-relaxed sm:text-sm">
                  {contentMap.quality_why_subtitle || 'From carefully selected raw spices to hygienic processing and safe packaging – we ensure quality you can see, smell and trust.'}
                </p>
              </div>

              {/* 4 White Cards Grid */}
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: FSSAI Certified */}
                <div className="flex h-[255px] flex-col justify-between rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
                  <div>
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                      <Award className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-maroon sm:text-base">
                      {contentMap.quality_card1_title || 'FSSAI Certified'}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_card1_desc || 'Manufactured and packed under a valid FSSAI license ensuring safe and hygienic products.'}
                    </p>
                  </div>
                  {/* Illustration Image 1 */}
                  <div className="mt-2 flex h-12 items-end justify-center">
                    <Image
                      src="/about/illust-factory.png"
                      alt="FSSAI Certified Factory"
                      width={95}
                      height={40}
                      className="object-contain mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>

                {/* Card 2: Made in India */}
                <div className="flex h-[255px] flex-col justify-between rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
                  <div>
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                      <MapPin className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-maroon sm:text-base">
                      {contentMap.quality_card2_title || 'Made in India'}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_card2_desc || 'Proudly grown, sourced and packed in India, supporting our farmers and local communities.'}
                    </p>
                  </div>
                  {/* Illustration Image 2 */}
                  <div className="mt-2 flex h-12 items-end justify-center">
                    <Image
                      src="/about/illust-farm.png"
                      alt="Made in India Farm"
                      width={95}
                      height={40}
                      className="object-contain mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>

                {/* Card 3: Multiple Pack Sizes */}
                <div className="flex h-[255px] flex-col justify-between rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
                  <div>
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                      <Package className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-maroon sm:text-base">
                      {contentMap.quality_card3_title || 'Multiple Pack Sizes'}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_card3_desc || 'From 50g to 500g, pick the pack that fits your kitchen and your needs.'}
                    </p>
                  </div>
                  {/* Illustration Image 3 */}
                  <div className="mt-2 flex h-12 items-end justify-center">
                    <Image
                      src="/about/illust-pouches.png"
                      alt="Multiple Pack Sizes"
                      width={95}
                      height={40}
                      className="object-contain mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>

                {/* Card 4: Direct WhatsApp Support */}
                <div className="flex h-[255px] flex-col justify-between rounded-2xl border border-border-gold/60 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md">
                  <div>
                    <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-gold shadow-sm">
                      <Headphones className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="font-heading text-sm font-bold text-maroon sm:text-base">
                      {contentMap.quality_card4_title || '24/7 Dedicated Support'}
                    </h3>
                    <p className="mt-1 text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_card4_desc || 'Reach out to our team directly on WhatsApp, any time, any day.'}
                    </p>
                  </div>
                  {/* Illustration Image 4 */}
                  <div className="mt-2 flex h-12 items-end justify-center">
                    <Image
                      src="/about/illust-phone.png"
                      alt="Direct WhatsApp Support"
                      width={95}
                      height={40}
                      className="object-contain mix-blend-multiply opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR QUALITY JOURNEY */}
      <section className="bg-cream/20 px-6 py-8 sm:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading & Paragraphs */}
            <div className="lg:col-span-5">
              <div className="mb-2 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  {contentMap.quality_journey_label || 'OUR JOURNEY'}
                </span>
              </div>

              <h2 className="font-heading text-3xl font-bold leading-tight text-maroon sm:text-4xl">
                {contentMap.quality_journey_title || 'A Passion for Flavour.<br />A Promise of Quality.'}
              </h2>

              <div className="mt-4 space-y-3 text-xs sm:text-sm text-muted leading-relaxed">
                <p>
                  {contentMap.quality_journey_p1 || 'Kura Gold Spices was created with a simple belief – great food begins with great spices.'}
                </p>
                <p>
                  {contentMap.quality_journey_p2 || 'We work with trusted suppliers, follow careful quality checks and pack every product with care to bring the best flavours to your home.'}
                </p>
              </div>
            </div>

            {/* Right Column: 4 Step Nodes Timeline */}
            <div className="lg:col-span-7">
              <div className="relative">
                {/* Horizontal Dotted Connector Line (Desktop) */}
                <div className="absolute left-8 right-8 top-6 hidden h-0.5 border-t-2 border-dashed border-maroon/30 lg:block" />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Step 1 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold shadow-md border-2 border-white">
                      <Leaf className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-3 font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                      {contentMap.quality_step1_title || 'Carefully Sourced'}
                    </h3>
                    <p className="mt-1.5 max-w-[180px] text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_step1_desc || 'We choose the best quality raw spices from trusted farmers and markets.'}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold shadow-md border-2 border-white">
                      <UtensilsCrossed className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-3 font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                      {contentMap.quality_step2_title || 'Cleaned & Processed'}
                    </h3>
                    <p className="mt-1.5 max-w-[180px] text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_step2_desc || 'Every spice is cleaned and processed with care to retain its natural oils and aroma.'}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold shadow-md border-2 border-white">
                      <ShieldCheck className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-3 font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                      {contentMap.quality_step3_title || 'Quality Checked'}
                    </h3>
                    <p className="mt-1.5 max-w-[180px] text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_step3_desc || 'Strict quality checks are done at every step to ensure purity and consistency.'}
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon text-gold shadow-md border-2 border-white">
                      <Package className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mt-3 font-heading text-xs font-bold uppercase tracking-wider text-maroon">
                      {contentMap.quality_step4_title || 'Packed with Care'}
                    </h3>
                    <p className="mt-1.5 max-w-[180px] text-[11px] text-muted leading-relaxed">
                      {contentMap.quality_step4_desc || 'Hygienically packed to lock in freshness, flavour and goodness.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MORE THAN A SPICE */}
      <section className="bg-cream/60 px-6 py-8 sm:px-10 lg:py-12">
        <div className="mx-auto max-w-6xl text-center">
          <SectionLabel className="justify-center">
            {contentMap.quality_promise_label || 'MORE THAN A SPICE.'}
          </SectionLabel>
          <h2 className="mt-1.5 font-heading text-2xl font-bold text-maroon sm:text-3xl">
            {contentMap.quality_promise_title || "It's Our Promise."}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {promises.map((promise) => (
              <div
                key={promise.title}
                className="relative rounded-2xl border border-border-gold/60 bg-white p-5 pt-8 text-center shadow-sm transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                {/* Floating Circle Icon Badge */}
                <div className="absolute -top-5 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-maroon text-gold shadow-md border-2 border-white">
                  <promise.icon className="h-5 w-5 text-gold" />
                </div>

                <h3 className="font-heading text-base font-bold text-maroon">
                  {promise.title}
                </h3>
                <p className="mt-2 text-xs text-muted leading-relaxed">
                  {promise.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CERTIFICATIONS & TRUST */}
      <section className="bg-white px-6 py-6 sm:px-10 lg:py-10 border-t border-b border-border-gold/40">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel className="justify-center">
            {contentMap.quality_cert_label || 'CERTIFICATIONS & TRUST'}
          </SectionLabel>
          <h2 className="mt-1.5 font-heading text-2xl font-bold text-maroon sm:text-3xl">
            {contentMap.quality_cert_title || 'Certified. Verified. Trusted.'}
          </h2>

          {activeCerts.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 divide-y divide-border-gold/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {activeCerts.map((cert) => (
                <div key={cert.key} className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-14 w-20">
                    <Image
                      src={cert.icon}
                      alt={cert.title}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </div>
                  <p className="mt-2.5 font-body text-xs font-bold uppercase tracking-wider text-maroon">
                    {cert.title}
                  </p>
                  <p className="mt-0.5 font-body text-[11px] text-muted">
                    {cert.subtitle}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-xs text-muted">Certifications dynamically updated from database.</p>
          )}
        </div>
      </section>

      {/* SECTION 6: BOTTOM CALL TO ACTION BANNER */}
      <section className="relative overflow-hidden bg-maroon-dark text-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10 lg:py-10">
          <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
            {/* Left Image */}
            <div className="relative h-36 w-full overflow-hidden rounded-xl sm:h-40 lg:col-span-4 lg:h-44">
              <Image
                src="/about/spices-left.png"
                alt="Kura Gold Pure Range"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain object-center lg:object-cover"
              />
            </div>

            {/* Right Text & Action Buttons */}
            <div className="lg:col-span-8">
              <h2 className="font-heading text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                {contentMap.quality_cta_title || 'Quality That Belongs in Every Kitchen'}
              </h2>
              <p className="mt-2 font-body text-xs text-cream/90 sm:text-sm leading-relaxed">
                {contentMap.quality_cta_subtitle || 'Explore the Kura Gold range and discover spices made for everyday Indian cooking.'}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-lg bg-gold px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-maroon transition-colors hover:bg-gold-light"
                >
                  Explore Our Products
                </Link>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-whatsapp px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-whatsapp-dark"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
