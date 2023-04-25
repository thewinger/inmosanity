'use client'

import { Thumb } from './ProductSliderThumb'
import Shimmer from './Shimmer'
import { urlForImage } from '@/lib/sanity.image'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { Image as SanityImage } from 'sanity'

type PropType = {
  slides: SanityImage[]
}

const ProductSlider = ({ slides }: PropType) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index)
    },
    [embla, emblaThumbs]
  )

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return
    setSelectedIndex(embla.selectedScrollSnap())
    emblaThumbs.scrollTo(embla.selectedScrollSnap())
  }, [embla, emblaThumbs, setSelectedIndex])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
  }, [embla, onSelect])

  const formattedSlides = slides.map((slide) => {
    return {
      sourceUrl: urlForImage(slide).url(),
      title: slide.asset?._ref,
    }
  })

  return (
    <div className='flex w-full flex-col'>
      <div className='embla relative m-0 mb-4 block w-full overflow-hidden rounded p-0'>
        <div className='embla__viewport w-full' ref={mainViewportRef}>
          <div className='embla__container xoverflow-x-hidden flex h-full gap-2'>
            {formattedSlides.map((slide, index) => (
              <div className='embla__slide min-w-full' key={index}>
                <div className='embla__slide__inner relative aspect-[3/2] overflow-hidden rounded'>
                  <Image
                    className='embla__slide__img relative block rounded object-cover'
                    src={slide.sourceUrl}
                    alt={slide.title ? slide.title : ''}
                    fill
                    sizes='(max-width: 1024px) 100vw, 768px'
                    placeholder='blur'
                    blurDataURL={Shimmer}
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='embla embla--thumb relative m-0  block w-full overflow-hidden p-0'>
        <div className='embla__viewport w-full ' ref={thumbViewportRef}>
          <div className='embla__container embla__container--thumb xoverflow-x-hidden flex h-full gap-1'>
            {formattedSlides.map((slide, index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={slide.sourceUrl}
                imgTitle={slide.title ? slide.title : ''}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSlider
