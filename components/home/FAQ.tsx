import { SectionLabel } from '@/components/ui/SectionLabel'

const FAQS = [
  {
    q: 'How do I place an order?',
    a: "Add the products and pack sizes you'd like to your cart, then tap Checkout. Our team confirms every order personally on WhatsApp before it's packed.",
  },
  {
    q: 'What pack sizes are available?',
    a: 'Sizes vary by product, from 50g up to 500g. Each product page shows exactly which sizes are available.',
  },
  {
    q: 'How do I pay?',
    a: 'Payment and delivery details are shared directly once your order is confirmed over WhatsApp.',
  },
  {
    q: 'Can I ask a question before ordering?',
    a: 'Of course — tap the WhatsApp button anywhere on the site and message us directly.',
  },
]

export function FAQ({ contentMap = {} }: { contentMap?: Record<string, string> }) {
  const sectionLabel = contentMap.home_faq_section_label || 'Good to Know'
  const title = contentMap.home_faq_title || 'Frequently Asked Questions'

  const faqs = [
    {
      q: contentMap.home_faq1_q || 'How do I place an order?',
      a:
        contentMap.home_faq1_a ||
        "Add the products and pack sizes you'd like to your cart, then tap Checkout. Our team confirms every order personally on WhatsApp before it's packed.",
    },
    {
      q: contentMap.home_faq2_q || 'What pack sizes are available?',
      a:
        contentMap.home_faq2_a ||
        'Sizes vary by product, from 50g up to 500g. Each product page shows exactly which sizes are available.',
    },
    {
      q: contentMap.home_faq3_q || 'How do I pay?',
      a:
        contentMap.home_faq3_a ||
        'Payment and delivery details are shared directly once your order is confirmed over WhatsApp.',
    },
    {
      q: contentMap.home_faq4_q || 'Can I ask a question before ordering?',
      a:
        contentMap.home_faq4_a ||
        'Of course — tap the WhatsApp button anywhere on the site and message us directly.',
    },
  ]

  return (
    <section className="bg-ivory px-6 py-8 sm:px-10 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex flex-col items-center text-center">
          <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
          <h2 className="font-heading text-2xl font-bold text-maroon sm:text-3xl lg:text-4xl">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-border-gold/60 bg-white px-5 py-4 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-maroon [&::-webkit-details-marker]:hidden">
                {faq.q}
                <span className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
