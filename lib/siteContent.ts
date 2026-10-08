import fs from 'fs'
import path from 'path'
import { createClient } from '@/lib/supabase/server'

export interface SiteContentItem {
  key: string
  value: string
  category: 'header' | 'home' | 'about' | 'quality' | 'careers' | 'contact' | 'policies'
  label: string
  type: 'text' | 'textarea'
  section?: string
}

export const DEFAULT_SITE_CONTENT: SiteContentItem[] = [
  // Header & Announcements
  {
    key: 'announcement_text',
    value: '🚚  FREE SHIPPING: ORDERS ABOVE ₹399/- IN HYDERABAD   ✦   JK ENTERPRISES · HYDERABAD, TELANGANA, INDIA',
    category: 'header',
    label: 'Top Announcement Bar Text',
    type: 'text',
    section: 'Header Announcement',
  },

  // --- HOME PAGE SECTIONS ---
  // Hero Section
  {
    key: 'home_hero_headline',
    value: 'The Gold Standard of Indian Spices.',
    category: 'home',
    label: 'Home Hero Main Headline',
    type: 'text',
    section: 'Hero Section',
  },
  {
    key: 'home_hero_subheadline',
    value: 'Pure, hand-ground spices from Hyderabad — where heritage tradition meets uncompromising purity. Sourced directly from premier Indian farms, cold-processed to retain natural essential oils, and packed with zero added artificial colors or preservatives for authentic everyday cooking.',
    category: 'home',
    label: 'Home Hero Subtitle',
    type: 'textarea',
    section: 'Hero Section',
  },

  // Shop By Category
  {
    key: 'home_cat_section_label',
    value: 'Shop By Category',
    category: 'home',
    label: 'Category Section Label',
    type: 'text',
    section: 'Shop By Category Section',
  },
  {
    key: 'home_cat_title',
    value: 'Discover Spices for Every Kitchen',
    category: 'home',
    label: 'Category Section Title',
    type: 'text',
    section: 'Shop By Category Section',
  },

  // Best Sellers
  {
    key: 'home_bestsellers_section_label',
    value: 'Best Sellers',
    category: 'home',
    label: 'Best Sellers Section Label',
    type: 'text',
    section: 'Best Sellers Section',
  },
  {
    key: 'home_bestsellers_title',
    value: 'Loved by Kitchens Across India',
    category: 'home',
    label: 'Best Sellers Section Title',
    type: 'text',
    section: 'Best Sellers Section',
  },
  {
    key: 'home_bestsellers_subtitle',
    value: 'Our most popular pure ground spices, packed with authentic flavor and aroma.',
    category: 'home',
    label: 'Best Sellers Subtitle',
    type: 'textarea',
    section: 'Best Sellers Section',
  },

  // Combos / Shop More & Save More
  {
    key: 'home_combos_section_label',
    value: 'Shop More & Save More',
    category: 'home',
    label: 'Combos Section Label',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combos_title',
    value: 'Bigger Flavours. Better Combinations.',
    category: 'home',
    label: 'Combos Section Title',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo1_title',
    value: 'Daily Essential Spice Box',
    category: 'home',
    label: 'Combo 1 Title',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo1_desc',
    value: 'Haldi + Red Chilli + Coriander Powder Combo',
    category: 'home',
    label: 'Combo 1 Description',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo2_title',
    value: 'Family Kitchen Spice Combo',
    category: 'home',
    label: 'Combo 2 Title',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo2_desc',
    value: 'Multi-pack sizes for everyday household cooking',
    category: 'home',
    label: 'Combo 2 Description',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo3_title',
    value: 'Special Celebration Pack',
    category: 'home',
    label: 'Combo 3 Title',
    type: 'text',
    section: 'Shop More & Save More Section',
  },
  {
    key: 'home_combo3_desc',
    value: 'Premium selection of essential ground spices',
    category: 'home',
    label: 'Combo 3 Description',
    type: 'text',
    section: 'Shop More & Save More Section',
  },

  // Why Choose Us / Quality Preview
  {
    key: 'home_quality_section_label',
    value: 'Why Choose Us',
    category: 'home',
    label: 'Quality Section Label',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_title',
    value: 'Purity is Our Promise',
    category: 'home',
    label: 'Quality Section Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_subtitle',
    value: 'Every pouch of Kura Gold Spices is backed by strict standards of farm sourcing, unadulterated purity, and hygienic care.',
    category: 'home',
    label: 'Quality Section Subtitle',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card1_title',
    value: '100% Natural Ingredients',
    category: 'home',
    label: 'Card 1 Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card1_desc',
    value: 'Pure spices ground without synthetic dyes, MSG, artificial colors, or starch fillers—preserving full essential oils and authentic flavor.',
    category: 'home',
    label: 'Card 1 Description',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card2_title',
    value: 'FSSAI Safety Certified',
    category: 'home',
    label: 'Card 2 Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card2_desc',
    value: 'Processed and packaged in hygienic facilities under strict Food Safety & Standards Authority of India (FSSAI) guidelines.',
    category: 'home',
    label: 'Card 2 Description',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card3_title',
    value: 'Farm-Direct Sourcing',
    category: 'home',
    label: 'Card 3 Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card3_desc',
    value: 'Sourced directly from premier spice-growing regions across India and gently processed to retain maximum pungency and natural aroma.',
    category: 'home',
    label: 'Card 3 Description',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card4_title',
    value: 'Multiple Pack Sizes',
    category: 'home',
    label: 'Card 4 Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card4_desc',
    value: 'Available in convenient moisture-lock zipper pouches tailored for daily home cooking, bulk family use, and gifting.',
    category: 'home',
    label: 'Card 4 Description',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card5_title',
    value: '24/7 Dedicated Support',
    category: 'home',
    label: 'Card 5 Title',
    type: 'text',
    section: 'Why Choose Us Section',
  },
  {
    key: 'home_quality_card5_desc',
    value: 'Reach our support team directly via WhatsApp or phone anytime for order tracking, bulk queries, and custom advice.',
    category: 'home',
    label: 'Card 5 Description',
    type: 'textarea',
    section: 'Why Choose Us Section',
  },

  // Our Cooking Recipes
  {
    key: 'home_recipes_section_label',
    value: 'OUR COOKING RECIPES',
    category: 'home',
    label: 'Recipes Section Label',
    type: 'text',
    section: 'Our Cooking Recipes Section',
  },
  {
    key: 'home_recipes_title',
    value: 'Where Every Spice Tells a Story',
    category: 'home',
    label: 'Recipes Section Title',
    type: 'text',
    section: 'Our Cooking Recipes Section',
  },
  {
    key: 'home_recipes_subtitle',
    value: 'From the aroma of freshly ground spices to the warmth of a family meal, discover chef-crafted recipes celebrating authentic Indian cooking with 100% pure Kura Gold Spices.',
    category: 'home',
    label: 'Recipes Section Subtitle',
    type: 'textarea',
    section: 'Our Cooking Recipes Section',
  },

  // Our Story
  {
    key: 'home_story_section_label',
    value: 'Our Story',
    category: 'home',
    label: 'Story Section Label',
    type: 'text',
    section: 'Our Story Section',
  },
  {
    key: 'home_story_title',
    value: 'Crafted with Passion, Ground with Purity.',
    category: 'home',
    label: 'Story Section Title',
    type: 'text',
    section: 'Our Story Section',
  },
  {
    key: 'home_story_subtitle',
    value: 'Discover the tradition, purity, and passion behind every pack of Kura Gold Spices.',
    category: 'home',
    label: 'Story Section Subtitle',
    type: 'textarea',
    section: 'Our Story Section',
  },
  {
    key: 'home_story_headline',
    value: 'Authentic Hyderabad Spices Delivered Fresh to Your Kitchen',
    category: 'home',
    label: 'Story Card Headline',
    type: 'text',
    section: 'Our Story Section',
  },
  {
    key: 'home_story_body',
    value: "At Kura Gold Spices (a brand of JK Enterprises), our journey began with a single promise: to deliver 100% pure, unadulterated spices straight from Hyderabad’s rich culinary heritage to your family's table. We cold-grind natural spice seeds in small batches to preserve essential oils, rich natural aroma, and authentic taste.",
    category: 'home',
    label: 'Story Card Body Text',
    type: 'textarea',
    section: 'Our Story Section',
  },

  // Good to Know / Frequently Asked Questions
  {
    key: 'home_faq_section_label',
    value: 'Good to Know',
    category: 'home',
    label: 'FAQ Section Label',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq_title',
    value: 'Frequently Asked Questions',
    category: 'home',
    label: 'FAQ Section Title',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq1_q',
    value: 'How do I place an order?',
    category: 'home',
    label: 'FAQ 1 Question',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq1_a',
    value: "Add the products and pack sizes you'd like to your cart, then tap Checkout. Our team confirms every order personally on WhatsApp before it's packed.",
    category: 'home',
    label: 'FAQ 1 Answer',
    type: 'textarea',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq2_q',
    value: 'What pack sizes are available?',
    category: 'home',
    label: 'FAQ 2 Question',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq2_a',
    value: 'Sizes vary by product, from 50g up to 500g. Each product page shows exactly which sizes are available.',
    category: 'home',
    label: 'FAQ 2 Answer',
    type: 'textarea',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq3_q',
    value: 'How do I pay?',
    category: 'home',
    label: 'FAQ 3 Question',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq3_a',
    value: 'Payment and delivery details are shared directly once your order is confirmed over WhatsApp.',
    category: 'home',
    label: 'FAQ 3 Answer',
    type: 'textarea',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq4_q',
    value: 'Can I ask a question before ordering?',
    category: 'home',
    label: 'FAQ 4 Question',
    type: 'text',
    section: 'Good to Know / FAQ Section',
  },
  {
    key: 'home_faq4_a',
    value: 'Of course — tap the WhatsApp button anywhere on the site and message us directly.',
    category: 'home',
    label: 'FAQ 4 Answer',
    type: 'textarea',
    section: 'Good to Know / FAQ Section',
  },

  // About Us Page - Hero Section
  {
    key: 'about_hero_label',
    value: "HYDERABAD'S HERITAGE SPICE HOUSE",
    category: 'about',
    label: 'Hero Eyebrow Label',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'about_hero_title',
    value: 'About Kura Gold Spices',
    category: 'about',
    label: 'Hero Main Title',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'about_hero_subtitle',
    value: 'Bringing Authentic Indian Flavours, Farm-Direct Purity & Culinary Heritage to Every Kitchen',
    category: 'about',
    label: 'Hero Subtitle / Tagline',
    type: 'textarea',
    section: 'Hero Banner Section',
  },
  {
    key: 'about_hero_badge1',
    value: '100% Pure & Natural',
    category: 'about',
    label: 'Hero Badge 1',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'about_hero_badge2',
    value: 'Hyderabad, Telangana',
    category: 'about',
    label: 'Hero Badge 2',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'about_hero_badge3',
    value: 'FSSAI License Certified',
    category: 'about',
    label: 'Hero Badge 3',
    type: 'text',
    section: 'Hero Banner Section',
  },

  // About Us Page - Brand Story Section
  {
    key: 'about_story_badge',
    value: 'A Unit of JK Enterprises',
    category: 'about',
    label: 'Card Sub-title Badge',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_card_title',
    value: 'Crafted for Lovers of Authentic Taste.',
    category: 'about',
    label: 'Dark Card Main Headline',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_card_text',
    value: 'Based in the historic city of Hyderabad, Telangana, Kura Gold Spices was born from a simple promise: to eliminate artificial adulteration and deliver pristine, aromatic spices directly to home cooks.',
    category: 'about',
    label: 'Dark Card Description Text',
    type: 'textarea',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_stat1_label',
    value: 'Spice Varieties',
    category: 'about',
    label: 'Card Stat 1 Label',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_stat2_label',
    value: 'Natural & Pure',
    category: 'about',
    label: 'Card Stat 2 Label',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_label',
    value: 'OUR BRAND STORY',
    category: 'about',
    label: 'Story Section Eyebrow Label',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_headline',
    value: 'Rooted in Tradition, Refined for Today’s Kitchens.',
    category: 'about',
    label: 'Story Main Headline',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_p1',
    value: 'At Kura Gold Spices, we believe that great food starts with uncompromised ingredients. Hyderabad has long been celebrated worldwide for its rich culinary traditions, royal biryanis, and vibrant spice markets. We carry that legacy forward into every pouch we package.',
    category: 'about',
    label: 'Story Paragraph 1',
    type: 'textarea',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_p2',
    value: 'We source raw spices directly from renowned farming regions across India. Each batch undergoes careful hand-selection, hygienic cleaning, and gentle processing to preserve the spice’s natural essential oils, deep color, and intense aroma.',
    category: 'about',
    label: 'Story Paragraph 2',
    type: 'textarea',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_p3',
    value: 'Whether you are preparing a quick weeknight curry, an authentic Sunday feast, or experimenting with regional delicacies, Kura Gold Spices delivers the exact warmth and flavor your family deserves.',
    category: 'about',
    label: 'Story Paragraph 3',
    type: 'textarea',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_pill1',
    value: 'Zero Added Dyes',
    category: 'about',
    label: 'Quality Pill 1',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_pill2',
    value: 'No Preservatives',
    category: 'about',
    label: 'Quality Pill 2',
    type: 'text',
    section: 'Brand Story Section',
  },
  {
    key: 'about_story_pill3',
    value: 'Aroma Lock Pouches',
    category: 'about',
    label: 'Quality Pill 3',
    type: 'text',
    section: 'Brand Story Section',
  },

  // About Us Page - Vision & Mission Section
  {
    key: 'about_purpose_label',
    value: 'OUR PURPOSE',
    category: 'about',
    label: 'Purpose Eyebrow Label',
    type: 'text',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_purpose_title',
    value: 'Guided by Vision & Driven by Mission',
    category: 'about',
    label: 'Purpose Section Title',
    type: 'text',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_purpose_subtitle',
    value: 'Building a healthier, more flavourful future for Indian homes through unadulterated purity.',
    category: 'about',
    label: 'Purpose Section Subtitle',
    type: 'textarea',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_vision_title',
    value: 'Our Vision',
    category: 'about',
    label: 'Vision Card Title',
    type: 'text',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_vision_text',
    value: 'To become India’s most trusted household name for pure, authentic spices—celebrated for preserving regional culinary heritage while setting modern benchmarks in hygiene, safety, and freshness.',
    category: 'about',
    label: 'Vision Card Text',
    type: 'textarea',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_mission_title',
    value: 'Our Mission',
    category: 'about',
    label: 'Mission Card Title',
    type: 'text',
    section: 'Vision & Mission Section',
  },
  {
    key: 'about_mission_text',
    value: 'To deliver unadulterated, farm-fresh spices in convenient pack sizes for every kitchen—ensuring that every meal cooked with Kura Gold Spices is rich in natural aroma, essential oils, and wholesome nutrition.',
    category: 'about',
    label: 'Mission Card Text',
    type: 'textarea',
    section: 'Vision & Mission Section',
  },

  // About Us Page - 4 Pillars of Excellence Section
  {
    key: 'about_pillars_label',
    value: 'WHY FAMILIES TRUST US',
    category: 'about',
    label: 'Pillars Section Eyebrow Label',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillars_title',
    value: 'The 4 Pillars of Kura Gold Excellence',
    category: 'about',
    label: 'Pillars Section Title',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillars_subtitle',
    value: 'Every pouch of Kura Gold Spices is backed by strict standards of quality, farm sourcing, and hygienic care.',
    category: 'about',
    label: 'Pillars Section Subtitle',
    type: 'textarea',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar1_title',
    value: 'Direct Farm Sourcing',
    category: 'about',
    label: 'Pillar 1 Title',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar1_desc',
    value: 'We select prime raw spices directly from trusted farmers and traditional spice cultivation hubs across India.',
    category: 'about',
    label: 'Pillar 1 Description',
    type: 'textarea',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar2_title',
    value: 'Natural Essential Oils',
    category: 'about',
    label: 'Pillar 2 Title',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar2_desc',
    value: 'Processed at controlled temperatures to lock in volatile oils, natural pungency, and authentic aromatic warmth.',
    category: 'about',
    label: 'Pillar 2 Description',
    type: 'textarea',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar3_title',
    value: 'Zero Adulteration',
    category: 'about',
    label: 'Pillar 3 Title',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar3_desc',
    value: '100% pure spices with no added synthetic dyes, MSG, artificial flavors, or starch fillers—guaranteed.',
    category: 'about',
    label: 'Pillar 3 Description',
    type: 'textarea',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar4_title',
    value: 'Multiple Pack Sizes',
    category: 'about',
    label: 'Pillar 4 Title',
    type: 'text',
    section: '4 Pillars of Excellence Section',
  },
  {
    key: 'about_pillar4_desc',
    value: 'Available in convenient 50g to 500g pouches tailored for small families, large households, and culinary lovers.',
    category: 'about',
    label: 'Pillar 4 Description',
    type: 'textarea',
    section: '4 Pillars of Excellence Section',
  },

  // About Us Page - The Kura Gold Advantage Section
  {
    key: 'about_adv_label',
    value: 'THE KURA GOLD ADVANTAGE',
    category: 'about',
    label: 'Advantage Section Eyebrow Label',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv_title',
    value: 'What Makes Kura Gold Different?',
    category: 'about',
    label: 'Advantage Section Title',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv_subtitle',
    value: 'Unlike mass-market commercial brands that mix salt, starch, and synthetic colors into spice powders, Kura Gold Spices maintains strict purity standards:',
    category: 'about',
    label: 'Advantage Section Subtitle',
    type: 'textarea',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv1_title',
    value: 'Pure Unadulterated Taste',
    category: 'about',
    label: 'Advantage Item 1 Title',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv1_desc',
    value: 'Full-bodied flavor requiring smaller pinch quantities per dish.',
    category: 'about',
    label: 'Advantage Item 1 Description',
    type: 'textarea',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv2_title',
    value: 'Hygiene & Safety Certified',
    category: 'about',
    label: 'Advantage Item 2 Title',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv2_desc',
    value: 'Processed under strict valid FSSAI guidelines for ultimate peace of mind.',
    category: 'about',
    label: 'Advantage Item 2 Description',
    type: 'textarea',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv3_title',
    value: '24/7 Dedicated Support',
    category: 'about',
    label: 'Advantage Item 3 Title',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv3_desc',
    value: 'Need custom pack orders or quick answers? Reach our team directly on WhatsApp 24/7.',
    category: 'about',
    label: 'Advantage Item 3 Description',
    type: 'textarea',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv_card_title',
    value: 'Tested for Purity & Excellence',
    category: 'about',
    label: 'Side Card Title',
    type: 'text',
    section: 'The Kura Gold Advantage Section',
  },
  {
    key: 'about_adv_card_desc',
    value: 'Every batch of Kura Gold Spices is crafted to elevate your daily meals into wholesome, aromatic culinary experiences.',
    category: 'about',
    label: 'Side Card Description',
    type: 'textarea',
    section: 'The Kura Gold Advantage Section',
  },

  // About Us Page - Call To Action Section
  {
    key: 'about_cta_label',
    value: 'BRING HOME AUTHENTIC FLAVOURS',
    category: 'about',
    label: 'CTA Eyebrow Label',
    type: 'text',
    section: 'Call To Action Banner Section',
  },
  {
    key: 'about_cta_title',
    value: 'Taste the Pure Difference of Kura Gold Spices',
    category: 'about',
    label: 'CTA Main Headline',
    type: 'text',
    section: 'Call To Action Banner Section',
  },
  {
    key: 'about_cta_subtitle',
    value: "Order your favorite spices today and experience the rich aroma, vibrant color, and uncompromised purity of Hyderabad's finest spice blends.",
    category: 'about',
    label: 'CTA Description Text',
    type: 'textarea',
    section: 'Call To Action Banner Section',
  },

  // Quality & Lab Page - Hero Section
  {
    key: 'quality_hero_label',
    value: 'OUR QUALITY PROMISE',
    category: 'quality',
    label: 'Hero Eyebrow Label',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'quality_hero_title1',
    value: 'Quality You Can Taste.',
    category: 'quality',
    label: 'Hero Headline Line 1',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'quality_hero_title2',
    value: 'Care You Can Trust.',
    category: 'quality',
    label: 'Hero Headline Line 2',
    type: 'text',
    section: 'Hero Banner Section',
  },
  {
    key: 'quality_hero_subtitle',
    value: 'Every Kura Gold product is created with a simple purpose — to bring dependable quality and authentic flavour to everyday cooking.',
    category: 'quality',
    label: 'Hero Subtitle Text',
    type: 'textarea',
    section: 'Hero Banner Section',
  },

  // Quality & Lab Page - Why Choose Kura Gold Section
  {
    key: 'quality_badge_title',
    value: 'Rooted in Indian kitchens,',
    category: 'quality',
    label: 'Image Badge Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_badge_subtitle',
    value: 'crafted for modern homes.',
    category: 'quality',
    label: 'Image Badge Subtitle',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_why_label',
    value: 'WHY CHOOSE KURA GOLD',
    category: 'quality',
    label: 'Section Eyebrow Label',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_why_title',
    value: 'Purity is Our Promise',
    category: 'quality',
    label: 'Section Main Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_why_subtitle',
    value: 'From carefully selected raw spices to hygienic processing and safe packaging – we ensure quality you can see, smell and trust.',
    category: 'quality',
    label: 'Section Subtitle',
    type: 'textarea',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card1_title',
    value: 'FSSAI Certified',
    category: 'quality',
    label: 'Card 1 Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card1_desc',
    value: 'Manufactured and packed under a valid FSSAI license ensuring safe and hygienic products.',
    category: 'quality',
    label: 'Card 1 Description',
    type: 'textarea',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card2_title',
    value: 'Made in India',
    category: 'quality',
    label: 'Card 2 Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card2_desc',
    value: 'Proudly grown, sourced and packed in India, supporting our farmers and local communities.',
    category: 'quality',
    label: 'Card 2 Description',
    type: 'textarea',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card3_title',
    value: 'Multiple Pack Sizes',
    category: 'quality',
    label: 'Card 3 Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card3_desc',
    value: 'From 50g to 500g, pick the pack that fits your kitchen and your needs.',
    category: 'quality',
    label: 'Card 3 Description',
    type: 'textarea',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card4_title',
    value: '24/7 Dedicated Support',
    category: 'quality',
    label: 'Card 4 Title',
    type: 'text',
    section: 'Why Choose Kura Gold Section',
  },
  {
    key: 'quality_card4_desc',
    value: 'Reach out to our team directly on WhatsApp, any time, any day.',
    category: 'quality',
    label: 'Card 4 Description',
    type: 'textarea',
    section: 'Why Choose Kura Gold Section',
  },

  // Quality & Lab Page - Our Quality Journey Section
  {
    key: 'quality_journey_label',
    value: 'OUR JOURNEY',
    category: 'quality',
    label: 'Journey Section Eyebrow',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_journey_title',
    value: 'A Passion for Flavour. A Promise of Quality.',
    category: 'quality',
    label: 'Journey Main Headline',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_journey_p1',
    value: 'Kura Gold Spices was created with a simple belief – great food begins with great spices.',
    category: 'quality',
    label: 'Journey Paragraph 1',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_journey_p2',
    value: 'We work with trusted suppliers, follow careful quality checks and pack every product with care to bring the best flavours to your home.',
    category: 'quality',
    label: 'Journey Paragraph 2',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step1_title',
    value: 'Carefully Sourced',
    category: 'quality',
    label: 'Step 1 Title',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step1_desc',
    value: 'We choose the best quality raw spices from trusted farmers and markets.',
    category: 'quality',
    label: 'Step 1 Description',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step2_title',
    value: 'Cleaned & Processed',
    category: 'quality',
    label: 'Step 2 Title',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step2_desc',
    value: 'Every spice is cleaned and processed with care to retain its natural oils and aroma.',
    category: 'quality',
    label: 'Step 2 Description',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step3_title',
    value: 'Quality Checked',
    category: 'quality',
    label: 'Step 3 Title',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step3_desc',
    value: 'Strict quality checks are done at every step to ensure purity and consistency.',
    category: 'quality',
    label: 'Step 3 Description',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step4_title',
    value: 'Packed with Care',
    category: 'quality',
    label: 'Step 4 Title',
    type: 'text',
    section: 'Our Quality Journey Section',
  },
  {
    key: 'quality_step4_desc',
    value: 'Hygienically packed to lock in freshness, flavour and goodness.',
    category: 'quality',
    label: 'Step 4 Description',
    type: 'textarea',
    section: 'Our Quality Journey Section',
  },

  // Quality & Lab Page - More Than a Spice Section
  {
    key: 'quality_promise_label',
    value: 'MORE THAN A SPICE.',
    category: 'quality',
    label: 'Promise Section Eyebrow',
    type: 'text',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise_title',
    value: "It's Our Promise.",
    category: 'quality',
    label: 'Promise Section Title',
    type: 'text',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise1_title',
    value: 'Consistent Quality',
    category: 'quality',
    label: 'Promise 1 Title',
    type: 'text',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise1_desc',
    value: 'We aim to deliver a dependable spice experience across our product range.',
    category: 'quality',
    label: 'Promise 1 Description',
    type: 'textarea',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise2_title',
    value: 'Authentic Flavour',
    category: 'quality',
    label: 'Promise 2 Title',
    type: 'text',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise2_desc',
    value: 'Our products are made for the flavours that belong in everyday Indian kitchens.',
    category: 'quality',
    label: 'Promise 2 Description',
    type: 'textarea',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise3_title',
    value: 'Customer First',
    category: 'quality',
    label: 'Promise 3 Title',
    type: 'text',
    section: 'More Than a Spice Section',
  },
  {
    key: 'quality_promise3_desc',
    value: 'From choosing a product to placing an order, we keep the experience simple and accessible.',
    category: 'quality',
    label: 'Promise 3 Description',
    type: 'textarea',
    section: 'More Than a Spice Section',
  },

  // Quality & Lab Page - Certifications & Trust Section
  {
    key: 'quality_cert_label',
    value: 'CERTIFICATIONS & TRUST',
    category: 'quality',
    label: 'Certifications Section Eyebrow',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert_title',
    value: 'Certified. Verified. Trusted.',
    category: 'quality',
    label: 'Certifications Main Title',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_fssai_no',
    value: '23626030003544',
    category: 'quality',
    label: 'FSSAI License Certificate Number',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_promise_text',
    value: 'Every batch of Kura Gold Spices is subjected to rigorous laboratory testing for moisture, volatile oil content, and zero synthetic dye adulteration.',
    category: 'quality',
    label: 'Quality Lab Testing Guarantee Text',
    type: 'textarea',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert1_title',
    value: 'FSSAI CERTIFIED',
    category: 'quality',
    label: 'Badge 1 Title',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert1_sub',
    value: 'LIC. 23626030003544',
    category: 'quality',
    label: 'Badge 1 Subtitle',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert2_title',
    value: 'GOVT. OF TELANGANA',
    category: 'quality',
    label: 'Badge 2 Title',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert2_sub',
    value: 'TELANGANA, INDIA',
    category: 'quality',
    label: 'Badge 2 Subtitle',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert3_title',
    value: 'MAKE IN INDIA',
    category: 'quality',
    label: 'Badge 3 Title',
    type: 'text',
    section: 'Certifications & Trust Section',
  },
  {
    key: 'quality_cert3_sub',
    value: 'PROUDLY INDIAN',
    category: 'quality',
    label: 'Badge 3 Subtitle',
    type: 'text',
    section: 'Certifications & Trust Section',
  },

  // Quality & Lab Page - Call To Action Banner Section
  {
    key: 'quality_cta_title',
    value: 'Quality That Belongs in Every Kitchen',
    category: 'quality',
    label: 'CTA Banner Title',
    type: 'text',
    section: 'Call To Action Banner Section',
  },
  {
    key: 'quality_cta_subtitle',
    value: 'Explore the Kura Gold range and discover spices made for everyday Indian cooking.',
    category: 'quality',
    label: 'CTA Banner Subtitle',
    type: 'textarea',
    section: 'Call To Action Banner Section',
  },

  // Careers Page
  {
    key: 'careers_status_title',
    value: 'No Active Job Openings Currently',
    category: 'careers',
    label: 'Careers Hiring Status Banner Title',
    type: 'text',
  },
  {
    key: 'careers_status_body',
    value: 'We are currently operating with a full team. However, we are always eager to connect with passionate culinary talent, spice technologists, and sales professionals for future expansions.',
    category: 'careers',
    label: 'Careers Hiring Status Message',
    type: 'textarea',
  },
  {
    key: 'careers_resume_email',
    value: 'careers@kuragoldspices.com',
    category: 'careers',
    label: 'Resume Submission Email Address',
    type: 'text',
  },

  // Contact & Footer
  {
    key: 'contact_phone',
    value: '+91 89787 26655',
    category: 'contact',
    label: 'Customer Support Phone Number',
    type: 'text',
  },
  {
    key: 'contact_whatsapp',
    value: '918978726655',
    category: 'contact',
    label: 'WhatsApp Business Number',
    type: 'text',
  },
  {
    key: 'contact_email',
    value: 'info@kuragoldspices.com',
    category: 'contact',
    label: 'Support & General Inquiry Email',
    type: 'text',
  },

  // Policies
  {
    key: 'shipping_delivery_timeline',
    value: '2 to 10 business days',
    category: 'policies',
    label: 'Shipping Delivery Timeline Notice',
    type: 'text',
  },
  {
    key: 'shipping_free_limit',
    value: '₹399',
    category: 'policies',
    label: 'Free Shipping Threshold Amount',
    type: 'text',
  },
]

const LOCAL_STORE_PATH = path.join(process.cwd(), 'data', 'site_content.json')

function readLocalStore(): Record<string, string> {
  try {
    if (fs.existsSync(LOCAL_STORE_PATH)) {
      const raw = fs.readFileSync(LOCAL_STORE_PATH, 'utf8')
      return JSON.parse(raw)
    }
  } catch {
    // Ignore error
  }
  return {}
}

function writeLocalStore(store: Record<string, string>) {
  try {
    const dir = path.dirname(LOCAL_STORE_PATH)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(LOCAL_STORE_PATH, JSON.stringify(store, null, 2), 'utf8')
  } catch {
    // Ignore error
  }
}

export async function getSiteContentMap(): Promise<Record<string, string>> {
  const contentMap: Record<string, string> = {}

  // 1. Load default values
  DEFAULT_SITE_CONTENT.forEach((item) => {
    contentMap[item.key] = item.value
  })

  // 2. Overlay local JSON store values
  const localData = readLocalStore()
  Object.assign(contentMap, localData)

  // 3. Attempt to overlay Supabase site_content values if available
  try {
    const supabase = createClient()
    const { data } = await supabase.from('site_content').select('key, value')
    if (data && data.length > 0) {
      data.forEach((row) => {
        if (row.key && row.value !== null) {
          contentMap[row.key] = row.value
        }
      })
    }
  } catch {
    // Supabase fallback silently to local/defaults
  }

  return contentMap
}

export async function getSingleContent(key: string, fallback: string = ''): Promise<string> {
  const map = await getSiteContentMap()
  return map[key] ?? fallback
}

export async function updateContentKey(key: string, value: string) {
  // Update local JSON store
  const localData = readLocalStore()
  localData[key] = value
  writeLocalStore(localData)

  // Attempt Supabase update
  try {
    const supabase = createClient()
    await supabase.from('site_content').upsert({ key, value }, { onConflict: 'key' })
  } catch {
    // Supabase fallback silently
  }
}
