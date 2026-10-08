import { BestSellers } from '@/components/home/BestSellers'
import { BlogSection } from '@/components/home/BlogSection'
import { FAQ } from '@/components/home/FAQ'
import { Hero } from '@/components/home/Hero'
import { QualityPreview } from '@/components/home/QualityPreview'
import { RecipesComingSoon } from '@/components/home/RecipesComingSoon'
import { ShopByCategory } from '@/components/home/ShopByCategory'
import { ShopMoreSaveMore } from '@/components/home/ShopMoreSaveMore'
import { TrustBar } from '@/components/home/TrustBar'
import { getClaims } from '@/hooks/useClaims'
import { getProducts, getBestSellers, getPublishedBlogs } from '@/hooks/useProducts'
import { getSiteContentMap } from '@/lib/siteContent'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [products, claims, bestSellers, blogs, contentMap] = await Promise.all([
    getProducts(),
    getClaims(),
    getBestSellers(),
    getPublishedBlogs(),
    getSiteContentMap(),
  ])

  return (
    <main>
      <Hero products={products} claims={claims} contentMap={contentMap} />
      <TrustBar claims={claims} />
      <ShopByCategory contentMap={contentMap} />
      <BestSellers products={bestSellers} contentMap={contentMap} />
      <ShopMoreSaveMore contentMap={contentMap} />
      <QualityPreview claims={claims} contentMap={contentMap} />
      <RecipesComingSoon contentMap={contentMap} />
      <BlogSection blogs={blogs} contentMap={contentMap} />
      <FAQ contentMap={contentMap} />
    </main>
  )
}
