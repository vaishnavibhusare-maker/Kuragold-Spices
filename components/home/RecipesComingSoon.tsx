import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChefHat, ArrowRight, Sparkles, Utensils } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'

const FEATURED_HOME_RECIPES = [
  {
    id: 'hyderabadi-chicken-dum-biryani',
    title: 'Authentic Hyderabadi Chicken Dum Biryani',
    category: 'Biryani & Rice',
    prepTime: '45 mins',
    difficulty: 'Medium',
    spiceUsed: 'Kura Gold Red Chilli & Garam Masala',
    image: '/recipes/recipe_hyderabadi_chicken_biryani.png',
  },
  {
    id: 'andhra-spicy-red-chilli-mutton-curry',
    title: 'Andhra Fiery Red Chilli Mutton Curry',
    category: 'Royal Curries',
    prepTime: '20 mins',
    difficulty: 'Medium',
    spiceUsed: 'Kura Gold Red Chilli & Dhaniya Powder',
    image: '/recipes/recipe_andhra_mutton_curry.png',
  },
  {
    id: 'golden-turmeric-dal-tadka',
    title: 'Golden Turmeric Dal Tadka',
    category: 'Quick Sabzi & Snacks',
    prepTime: '10 mins',
    difficulty: 'Easy',
    spiceUsed: 'Kura Gold Haldi Powder & Cumin',
    image: '/recipes/recipe_golden_dal_tadka.png',
  },
]

export function RecipesComingSoon({ contentMap = {} }: { contentMap?: Record<string, string> }) {
  const sectionLabel = contentMap.home_recipes_section_label || 'OUR COOKING RECIPES'
  const title = contentMap.home_recipes_title || 'Where Every Spice Tells a Story'
  const subtitle =
    contentMap.home_recipes_subtitle ||
    'From the aroma of freshly ground spices to the warmth of a family meal, discover chef-crafted recipes celebrating authentic Indian cooking with 100% pure Kura Gold Spices.'

  return (
    <section className="bg-cream/40 border-y border-border-gold/40 px-6 py-14 sm:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <SectionLabel className="justify-center">{sectionLabel}</SectionLabel>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-maroon">
            {title}
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Featured Dish Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURED_HOME_RECIPES.map((recipe) => (
            <Link
              key={recipe.id}
              href="/recipes"
              className="group flex flex-col overflow-hidden rounded-3xl border border-border-gold/60 bg-white shadow-xs transition-all duration-300 hover:border-gold hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] w-full bg-cream overflow-hidden sm:h-48 sm:aspect-auto">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-"
                />
                <span className="absolute top-3 left-3 rounded-full bg-maroon px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wider text-ivory shadow-xs">
                  {recipe.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-heading text-base font-bold text-maroon group-hover:text-gold transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={13} className="text-gold" />
                      {recipe.prepTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <ChefHat size={13} className="text-gold" />
                      {recipe.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-ink/80 pt-1 border-t border-border-gold/30">
                    <strong className="text-maroon font-semibold">Key Spice:</strong> {recipe.spiceUsed}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-maroon group-hover:text-gold">
                  <span>View Recipe</span>
                  <ArrowRight size={14} className="transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="text-center pt-2">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white hover:bg-maroon-dark shadow-md transition-all duration-200"
          >
            <Utensils size={15} />
            Explore All Recipes
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
