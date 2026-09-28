'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import {
  Upload,
  Image as ImageIcon,
  X,
  Check,
  Link as LinkIcon,
  FolderOpen,
  Loader2,
  ArrowLeftRight,
  Plus,
  Trash2,
  Layers,
  Sparkles,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { parseProductImages, formatProductImages } from '@/lib/productImages'
import { cn } from '@/lib/utils'

interface ImageInputPickerProps {
  name?: string
  defaultValue?: string
  label?: string
  className?: string
}

const PRESET_MEDIA_ASSETS = [
  { label: 'Red Chilli Pouch (Front)', url: '/products/chilli.webp', category: 'Products' },
  { label: 'Haldi Pouch (Front)', url: '/products/haldi.webp', category: 'Products' },
  { label: 'Dhaniya Pouch (Front)', url: '/products/dhania.webp', category: 'Products' },
  { label: 'Combo 3-Pouches', url: '/products/Kura_Gold_Combo_Pack_3_Exact_Pouches.png', category: 'Products' },
  { label: 'Garam Masala Blend', url: '/products/Kura_Gold_Garam_Masala_Blend.png', category: 'Products' },
  { label: 'Chicken Biryani Blend', url: '/products/Kura_Gold_Chicken_Biryani_Blend.png', category: 'Products' },
  { label: 'Mutton Biryani Blend', url: '/products/Kura_Gold_Mutton_Biryani_Blend.png', category: 'Products' },
  { label: 'Raw Coriander Seeds', url: '/products/raw_coriander_seeds.png', category: 'Whole Spices' },
  { label: 'Raw Black Pepper', url: '/products/raw_black_pepper.png', category: 'Whole Spices' },
  { label: 'Raw Cumin Seeds', url: '/products/raw_cumin_seeds.png', category: 'Whole Spices' },
  { label: 'Hyderabadi Chicken Biryani', url: '/recipes/recipe_hyderabadi_chicken_biryani.png', category: 'Recipes' },
  { label: 'Andhra Mutton Curry', url: '/recipes/recipe_andhra_mutton_curry.png', category: 'Recipes' },
  { label: 'Golden Dal Tadka', url: '/recipes/recipe_golden_dal_tadka.png', category: 'Recipes' },
  { label: 'Aloo Gobi Dhaniya Fry', url: '/recipes/recipe_aloo_gobi_fry.png', category: 'Recipes' },
  { label: 'Logo', url: '/logo.webp', category: 'Brand' },
]

export function ImageInputPicker({
  name = 'image_url',
  defaultValue = '',
  label = 'Product Images (Front, Back & Gallery)',
  className,
}: ImageInputPickerProps) {
  // Parse initial state
  const initial = parseProductImages(defaultValue)
  const [frontUrl, setFrontUrl] = useState<string>(initial.front)
  const [backUrl, setBackUrl] = useState<string>(initial.back)
  const [extraUrls, setExtraUrls] = useState<string[]>(initial.all.slice(2))

  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [uploadTarget, setUploadTarget] = useState<'front' | 'back' | 'batch' | number>('batch')

  // Gallery Modal state
  const [showGallery, setShowGallery] = useState<boolean>(false)
  const [galleryTargetSlot, setGalleryTargetSlot] = useState<'front' | 'back' | 'batch' | number>('batch')
  const [selectedGalleryUrls, setSelectedGalleryUrls] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>('All')

  const fileInputBatchRef = useRef<HTMLInputElement>(null)
  const fileInputFrontRef = useRef<HTMLInputElement>(null)
  const fileInputBackRef = useRef<HTMLInputElement>(null)

  // Upload a single file to Supabase or DataURL
  const uploadSingleFile = async (file: File): Promise<string> => {
    try {
      const supabase = createClient()
      const fileExt = file.name.split('.').pop()
      const fileName = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`
      const filePath = `product-images/${fileName}`

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

      if (!error && data) {
        const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(filePath)
        if (publicUrlData?.publicUrl) {
          return publicUrlData.publicUrl
        }
      }

      // Fallback Data URL
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '')
        reader.readAsDataURL(file)
      })
    } catch {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : '')
        reader.readAsDataURL(file)
      })
    }
  }

  // Handle file uploads (single or batch multiple files at once)
  const handleBatchFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetSlot: 'front' | 'back' | 'batch' | number) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setIsUploading(true)
    setUploadTarget(targetSlot)

    try {
      const uploadedUrls: string[] = []
      for (const file of files) {
        const url = await uploadSingleFile(file)
        if (url) uploadedUrls.push(url)
      }

      if (targetSlot === 'front' && uploadedUrls[0]) {
        setFrontUrl(uploadedUrls[0])
      } else if (targetSlot === 'back' && uploadedUrls[0]) {
        setBackUrl(uploadedUrls[0])
      } else if (typeof targetSlot === 'number') {
        const updated = [...extraUrls]
        updated[targetSlot] = uploadedUrls[0]
        setExtraUrls(updated)
      } else {
        // Batch upload multiple files: fill front, then back, then extra
        let urlsToAssign = [...uploadedUrls]
        let newFront = frontUrl
        let newBack = backUrl
        const newExtra = [...extraUrls]

        if (!newFront && urlsToAssign.length > 0) {
          newFront = urlsToAssign.shift()!
        }
        if (!newBack && urlsToAssign.length > 0) {
          newBack = urlsToAssign.shift()!
        }
        if (urlsToAssign.length > 0) {
          newExtra.push(...urlsToAssign)
        }

        setFrontUrl(newFront)
        setBackUrl(newBack)
        setExtraUrls(newExtra)
      }
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = ''
    }
  }

  // Swap front & back images
  const handleSwapFrontBack = () => {
    const temp = frontUrl
    setFrontUrl(backUrl)
    setBackUrl(temp)
  }

  // Handle multi-select confirm from gallery
  const handleConfirmGallerySelection = () => {
    if (selectedGalleryUrls.length === 0) {
      setShowGallery(false)
      return
    }

    if (galleryTargetSlot === 'front' && selectedGalleryUrls[0]) {
      setFrontUrl(selectedGalleryUrls[0])
    } else if (galleryTargetSlot === 'back' && selectedGalleryUrls[0]) {
      setBackUrl(selectedGalleryUrls[0])
    } else if (typeof galleryTargetSlot === 'number') {
      const updated = [...extraUrls]
      updated[galleryTargetSlot] = selectedGalleryUrls[0]
      setExtraUrls(updated)
    } else {
      // Batch assign
      let urlsToAssign = [...selectedGalleryUrls]
      let newFront = frontUrl
      let newBack = backUrl
      const newExtra = [...extraUrls]

      if (!newFront && urlsToAssign.length > 0) {
        newFront = urlsToAssign.shift()!
      }
      if (!newBack && urlsToAssign.length > 0) {
        newBack = urlsToAssign.shift()!
      }
      if (urlsToAssign.length > 0) {
        newExtra.push(...urlsToAssign)
      }

      setFrontUrl(newFront)
      setBackUrl(newBack)
      setExtraUrls(newExtra)
    }

    setSelectedGalleryUrls([])
    setShowGallery(false)
  }

  // Open Gallery for target slot
  const openGalleryFor = (slot: 'front' | 'back' | 'batch' | number) => {
    setGalleryTargetSlot(slot)
    setSelectedGalleryUrls([])
    setShowGallery(true)
  }

  // Formatted value for hidden form input
  const combinedFormattedValue = formatProductImages(frontUrl, backUrl, extraUrls)

  const categories = ['All', 'Products', 'Whole Spices', 'Recipes', 'Brand']

  const filteredAssets = PRESET_MEDIA_ASSETS.filter(
    (asset) => activeTab === 'All' || asset.category === activeTab
  )

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <label className="block font-body text-xs font-bold uppercase tracking-wide text-maroon flex items-center gap-1.5">
            <Layers size={15} className="text-gold" />
            {label}
          </label>
          <p className="text-[11px] text-muted">
            Add front side view, backside view (nutrition/ingredients), and extra gallery images.
          </p>
        </div>

        {/* Global Batch Action Bar */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            ref={fileInputBatchRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleBatchFileUpload(e, 'batch')}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => fileInputBatchRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-maroon bg-maroon px-3 py-1.5 font-body text-xs font-bold text-white hover:bg-maroon-dark transition-colors shadow-2xs"
            title="Select multiple image files at once to fill Front and Back slots"
          >
            {isUploading && uploadTarget === 'batch' ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Upload size={14} />
            )}
            Upload Multiple Files
          </button>

          <button
            type="button"
            onClick={() => openGalleryFor('batch')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gold/60 bg-gold/20 px-3 py-1.5 font-body text-xs font-bold text-maroon-dark hover:bg-gold transition-colors shadow-2xs"
          >
            <ImageIcon size={14} />
            Media Gallery
          </button>

          {(frontUrl || backUrl) && (
            <button
              type="button"
              onClick={handleSwapFrontBack}
              className="inline-flex items-center gap-1 rounded-lg border border-border-gold/60 bg-cream/50 px-2.5 py-1.5 font-body text-xs font-bold text-muted hover:text-maroon hover:bg-cream transition-colors"
              title="Swap Front Side and Back Side images"
            >
              <ArrowLeftRight size={14} />
              Swap
            </button>
          )}
        </div>
      </div>

      {/* Hidden input sent in server actions */}
      <input type="hidden" name={name} value={combinedFormattedValue} />

      {/* Grid of Main Slots: Front Side & Back Side */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* ── FRONT SIDE IMAGE SLOT ── */}
        <div className="flex flex-col gap-2.5 rounded-xl border border-gold/40 bg-white p-4 shadow-2xs relative">
          <div className="flex items-center justify-between border-b border-border-gold/30 pb-2">
            <span className="font-body text-xs font-bold uppercase tracking-wider text-maroon flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-maroon text-[10px] text-white font-bold">1</span>
              Front Side Image (Main Pouch View)
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold uppercase text-emerald-800">
              Primary View
            </span>
          </div>

          <div className="relative flex-1">
            <LinkIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={frontUrl}
              onChange={(e) => setFrontUrl(e.target.value)}
              placeholder="Paste Front Image URL or upload..."
              className="w-full rounded-lg border border-border-gold/80 bg-cream/10 py-1.5 pl-8 pr-7 text-xs text-ink outline-none focus:border-gold"
            />
            {frontUrl && (
              <button
                type="button"
                onClick={() => setFrontUrl('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-maroon"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Thumbnail preview */}
          {frontUrl ? (
            <div className="relative flex items-center gap-3 rounded-lg border border-border-gold/40 bg-cream/20 p-2">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white border border-border-gold/40">
                <Image src={frontUrl} alt="Front View" fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-[11px] font-bold text-maroon truncate">Front Side Pouch</p>
                <p className="font-mono text-[10px] text-muted truncate">{frontUrl}</p>
              </div>
              <button
                type="button"
                onClick={() => setFrontUrl('')}
                className="rounded-full bg-white p-1 text-muted hover:text-maroon hover:bg-red-50"
                title="Remove Front Image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-gold/60 bg-cream/10 p-3 text-center">
              <FolderOpen size={20} className="text-gold mb-1" />
              <p className="font-body text-[11px] font-bold text-maroon">No Front Side Image</p>
              <div className="mt-2 flex gap-1.5">
                <input
                  ref={fileInputFrontRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBatchFileUpload(e, 'front')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputFrontRef.current?.click()}
                  className="rounded-md border border-maroon/40 bg-white px-2.5 py-1 text-[10px] font-bold text-maroon hover:bg-maroon hover:text-white"
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => openGalleryFor('front')}
                  className="rounded-md border border-gold/40 bg-white px-2.5 py-1 text-[10px] font-bold text-maroon-dark hover:bg-gold"
                >
                  Pick Gallery
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── BACK SIDE IMAGE SLOT ── */}
        <div className="flex flex-col gap-2.5 rounded-xl border border-gold/40 bg-white p-4 shadow-2xs relative">
          <div className="flex items-center justify-between border-b border-border-gold/30 pb-2">
            <span className="font-body text-xs font-bold uppercase tracking-wider text-maroon flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-dark text-[10px] text-white font-bold">2</span>
              Back Side Image (Pouch Back / Ingredients)
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold uppercase text-amber-900">
              Backside View
            </span>
          </div>

          <div className="relative flex-1">
            <LinkIcon size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={backUrl}
              onChange={(e) => setBackUrl(e.target.value)}
              placeholder="Paste Backside Image URL or upload..."
              className="w-full rounded-lg border border-border-gold/80 bg-cream/10 py-1.5 pl-8 pr-7 text-xs text-ink outline-none focus:border-gold"
            />
            {backUrl && (
              <button
                type="button"
                onClick={() => setBackUrl('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-maroon"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Thumbnail preview */}
          {backUrl ? (
            <div className="relative flex items-center gap-3 rounded-lg border border-border-gold/40 bg-cream/20 p-2">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white border border-border-gold/40">
                <Image src={backUrl} alt="Back View" fill className="object-contain p-1" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-[11px] font-bold text-maroon truncate">Back Side Pouch</p>
                <p className="font-mono text-[10px] text-muted truncate">{backUrl}</p>
              </div>
              <button
                type="button"
                onClick={() => setBackUrl('')}
                className="rounded-full bg-white p-1 text-muted hover:text-maroon hover:bg-red-50"
                title="Remove Back Image"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border-gold/60 bg-cream/10 p-3 text-center">
              <FolderOpen size={20} className="text-gold mb-1" />
              <p className="font-body text-[11px] font-bold text-maroon">No Back Side Image</p>
              <div className="mt-2 flex gap-1.5">
                <input
                  ref={fileInputBackRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBatchFileUpload(e, 'back')}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputBackRef.current?.click()}
                  className="rounded-md border border-maroon/40 bg-white px-2.5 py-1 text-[10px] font-bold text-maroon hover:bg-maroon hover:text-white"
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => openGalleryFor('back')}
                  className="rounded-md border border-gold/40 bg-white px-2.5 py-1 text-[10px] font-bold text-maroon-dark hover:bg-gold"
                >
                  Pick Gallery
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── ADDITIONAL GALLERY IMAGES SECTION ── */}
      {extraUrls.length > 0 && (
        <div className="space-y-3 rounded-xl border border-border-gold/60 bg-cream/10 p-4">
          <span className="font-body text-xs font-bold uppercase tracking-wider text-muted block">
            Additional Product Gallery Images ({extraUrls.length})
          </span>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {extraUrls.map((url, idx) => (
              <div key={idx} className="flex items-center gap-2 rounded-lg border border-border-gold/40 bg-white p-2">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded bg-cream border border-border-gold/40">
                  {url ? (
                    <Image src={url} alt={`Gallery ${idx + 1}`} fill className="object-contain p-1" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs">📷</div>
                  )}
                </div>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => {
                    const updated = [...extraUrls]
                    updated[idx] = e.target.value
                    setExtraUrls(updated)
                  }}
                  placeholder={`Gallery Image #${idx + 3} URL...`}
                  className="flex-1 rounded border border-border-gold/60 py-1 px-2 text-xs text-ink outline-none"
                />
                <button
                  type="button"
                  onClick={() => setExtraUrls(extraUrls.filter((_, i) => i !== idx))}
                  className="p-1 text-muted hover:text-maroon"
                  title="Remove Image"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Extra Slot Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setExtraUrls([...extraUrls, ''])}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon hover:underline"
        >
          <Plus size={14} />
          Add Another Gallery Image Slot
        </button>

        {(frontUrl || backUrl || extraUrls.length > 0) && (
          <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-0.5 flex items-center gap-1">
            <Sparkles size={12} className="text-emerald-600" />
            {frontUrl && backUrl ? 'Front & Back Images Ready' : 'Product Image Ready'}
          </span>
        )}
      </div>

      {/* ── PRESET MEDIA ASSETS GALLERY MODAL (MULTI-SELECT SUPPORT) ── */}
      {showGallery && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6">
          <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-gold/30 bg-white p-6 shadow-2xl space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border-gold/40 pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-maroon flex items-center gap-2">
                  <ImageIcon size={20} className="text-gold" />
                  Media Gallery Picker
                </h3>
                <p className="text-xs text-muted">
                  Select image(s) to add to {galleryTargetSlot === 'front' ? 'Front Side' : galleryTargetSlot === 'back' ? 'Back Side' : 'Product Slots'}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGallery(false)}
                className="rounded-full bg-cream p-1.5 text-muted hover:bg-maroon hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  className={cn(
                    'rounded-full px-3 py-1 font-body text-xs font-bold transition-all border',
                    activeTab === cat
                      ? 'bg-maroon text-white border-maroon'
                      : 'bg-cream/50 text-ink border-border-gold/60 hover:bg-gold/20'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Assets Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 max-h-96 overflow-y-auto p-1">
              {filteredAssets.map((asset) => {
                const isSelected = selectedGalleryUrls.includes(asset.url)
                return (
                  <div
                    key={asset.url}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedGalleryUrls(selectedGalleryUrls.filter((u) => u !== asset.url))
                      } else {
                        setSelectedGalleryUrls([...selectedGalleryUrls, asset.url])
                      }
                    }}
                    className={cn(
                      'group relative flex flex-col items-center rounded-xl border p-2.5 cursor-pointer transition-all bg-white shadow-2xs hover:shadow-md',
                      isSelected
                        ? 'border-maroon ring-2 ring-maroon/30 bg-maroon/5'
                        : 'border-border-gold/60 hover:border-gold'
                    )}
                  >
                    <div className="relative h-24 w-full rounded-lg bg-cream/60 overflow-hidden mb-2">
                      <Image
                        src={asset.url}
                        alt={asset.label}
                        fill
                        className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                      />
                      {isSelected && (
                        <div className="absolute top-1 right-1 rounded-full bg-maroon p-1 text-white shadow-xs">
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                    <p className="font-body text-[11px] font-bold text-maroon text-center line-clamp-1 w-full">
                      {asset.label}
                    </p>
                    <span className="text-[9px] text-muted uppercase tracking-wider">{asset.category}</span>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-border-gold/40 pt-4 flex items-center justify-between">
              <span className="text-xs font-bold text-maroon">
                {selectedGalleryUrls.length} Image(s) Selected
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowGallery(false)}
                  className="rounded-full border border-border-gold bg-cream/60 px-5 py-2 font-body text-xs font-bold uppercase text-muted hover:text-maroon"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmGallerySelection}
                  className="rounded-full bg-maroon px-6 py-2 font-body text-xs font-bold uppercase text-white hover:bg-maroon-dark shadow-md"
                >
                  Add Selected Image(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
