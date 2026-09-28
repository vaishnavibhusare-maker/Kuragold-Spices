'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Sparkles, Maximize2, X, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  productName: string
  frontImage?: string
  backImage?: string
  images?: string[]
}

export function ProductGallery({
  productName,
  frontImage = '',
  backImage = '',
  images = [],
}: ProductGalleryProps) {
  // Combine all images into unique list
  const allImages = Array.from(new Set([frontImage, backImage, ...images].filter(Boolean)))
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false)

  if (allImages.length === 0) {
    return (
      <div className="relative flex h-80 items-center justify-center rounded-2xl bg-cream sm:h-96 border border-border-gold/40">
        <div className="text-center p-6">
          <span className="text-4xl">🌿</span>
          <p className="mt-2 font-body text-xs font-bold uppercase tracking-wider text-muted">Kura Gold Spice</p>
        </div>
      </div>
    )
  }

  const currentImage = allImages[selectedIndex] || allImages[0]
  const isFrontSide = selectedIndex === 0 || (currentImage === frontImage && frontImage !== '')
  const isBackSide = !isFrontSide && currentImage === backImage && backImage !== ''

  const badgeText = isFrontSide
    ? 'Front Side View'
    : isBackSide
    ? 'Back Side View (Ingredients & Specs)'
    : `Product View ${selectedIndex + 1}`

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image View Container */}
      <div
        onClick={() => setIsZoomOpen(true)}
        className="group relative h-80 w-full overflow-hidden rounded-2xl bg-cream border border-border-gold/50 shadow-sm sm:h-96 transition-all duration-300 cursor-pointer p-3 sm:p-5"
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={currentImage}
            alt={`${productName} ${badgeText}`}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* View Badge */}
        {allImages.length > 1 && (
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span
              className={cn(
                'rounded-full px-3 py-1 font-body text-[10px] font-bold uppercase tracking-widest shadow-xs transition-colors flex items-center gap-1.5',
                isBackSide
                  ? 'bg-amber-800 text-amber-100'
                  : isFrontSide
                  ? 'bg-maroon-dark text-gold-light'
                  : 'bg-gold-dark text-white'
              )}
            >
              <Sparkles size={11} />
              {badgeText}
            </span>
          </div>
        )}

        {/* Zoom Trigger Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setIsZoomOpen(true)
          }}
          className="absolute bottom-4 right-4 z-10 rounded-full bg-white/90 p-2 text-maroon shadow-md backdrop-blur-xs transition-colors hover:bg-maroon hover:text-white"
          title="Click to zoom image"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Interactive Thumbnails List (Front Side / Back Side / Extra Images) */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {allImages.map((imgUrl, idx) => {
            const isSelected = selectedIndex === idx
            const isBack = imgUrl === backImage && backImage !== frontImage
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  'relative flex flex-col items-center shrink-0 rounded-xl border p-1 transition-all bg-white shadow-2xs',
                  isSelected
                    ? 'border-maroon ring-2 ring-maroon/20 scale-105'
                    : 'border-border-gold/60 opacity-70 hover:opacity-100 hover:border-gold'
                )}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-cream/60">
                  <Image
                    src={imgUrl}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="mt-1 font-body text-[9px] font-bold uppercase tracking-wider text-maroon">
                  {idx === 0 ? 'Front' : isBack ? 'Back' : `View ${idx + 1}`}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Fullscreen Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-modal flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8">
          <div className="relative w-full max-w-4xl h-[80vh] flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-2 right-2 z-10 rounded-full bg-white/20 p-2 text-white hover:bg-white/40 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="relative w-full h-full">
              <Image
                src={currentImage}
                alt={`${productName} Zoomed View`}
                fill
                className="object-contain"
              />
            </div>

            <p className="mt-4 font-heading text-sm font-bold text-ivory flex items-center gap-2">
              {productName} — {badgeText}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
