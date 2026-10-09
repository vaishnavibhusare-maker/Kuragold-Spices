import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Lato, Playfair_Display } from 'next/font/google'
import { CONTACT_WA, SITE_NAME, TAGLINE } from '@/lib/constants'
import '@/styles/globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kuragoldspices.com'),
  title: {
    default: `${SITE_NAME} | Pure & Natural Indian Spices`,
    template: `%s | ${SITE_NAME}`,
  },
  description: `${SITE_NAME} — pure and natural Indian spices from Hyderabad, Telangana. ${TAGLINE}. Order on WhatsApp: ${CONTACT_WA}.`,
  keywords: ['kura gold spices', 'pure indian spices', 'hyderabad spices', 'natural spices', 'jk enterprises'],
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '64x64' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['/icon.png'],
    apple: [{ url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Pure & Natural Indian Spices`,
    description: `${SITE_NAME} — pure and natural Indian spices from Hyderabad, Telangana.`,
    type: 'website',
    images: [{ url: '/logo.webp' }],
  },
  verification: {
    google: 'fxfUQ1uIKetxH5aw_Kn-ZFuoxg8sJmiPflfB-N31ZwY',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable} ${cormorant.variable}`}>
      <head>
        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1PXWJ237DB"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1PXWJ237DB');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "yuies48mxv");
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1129745762960647');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1129745762960647&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="min-h-screen bg-ivory font-body text-ink antialiased">{children}</body>
    </html>
  )
}
