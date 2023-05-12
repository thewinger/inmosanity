'use client'

import { Featured } from '@/lib/interfaces'
import { urlForImage } from '@/lib/sanity.image'
import clsx from 'clsx'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import useMedia from 'use-media'
import Shimmer from './Shimmer'
import Pill from './ui/Pill'

type PropType = {
  propiedades: Featured[]
}

const ProductSliderDesktop = ({ propiedades }: PropType) => {
  const vertical = useMedia({ minWidth: '1024px' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false })
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    axis: 'x',
    /* axis: vertical ? 'y' : 'y', */
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return
      embla.scrollTo(index)
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

  const formattedSlides = propiedades.map((propiedad) => {
    return {
      sourceUrl: urlForImage(propiedad.coverImage).url(),
      title: propiedad.coverImage.asset?._ref,
    }
  })

  return (
    <div className={clsx('flex w-full gap-4', !vertical && 'flex-col')}>
      <div
        className={clsx(
          'embla relative m-0 block aspect-[3/2] w-full overflow-hidden rounded p-0',
          vertical && 'order-2 '
        )}
      >
        <div
          className='embla__viewport aspect-[3/2] w-full'
          ref={mainViewportRef}
        >
          <div className='embla__container xoverflow-x-hidden flex h-full gap-2'>
            {propiedades.map((propiedad) => (
              <Link
                key={propiedad.slug}
                href={`/propiedad/${propiedad.slug}`}
                className='embla__slide xmax-h-[420px] xbasis-5/5 relative aspect-[3/2] min-w-full shrink-0 grow-0 overflow-hidden rounded-md '
              >
                <Pill>{`${propiedad.tipo} - ${propiedad.operacion}`}</Pill>
                {propiedad && propiedad.coverImage && (
                  <Image
                    className='block  aspect-[3/2]  w-full rounded-md object-cover '
                    src={urlForImage(propiedad.coverImage).url()}
                    alt={propiedad.title}
                    width={630}
                    height={420}
                    placeholder='blur'
                    blurDataURL={Shimmer}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'embla embla--thumb relative m-0 block overflow-hidden p-0',
          !vertical && 'w-full',
          vertical && 'order-1 w-40'
        )}
      >
        <div
          className={clsx('embla__viewport w-full', vertical && 'h-full')}
          ref={thumbViewportRef}
        >
          <div
            className={clsx(
              'embla__container embla__container--thumb xh-full flex gap-1',
              vertical && 'flex-col gap-1'
            )}
          >
            {formattedSlides.map((slide, index) => (
              <div
                key={index}
                className={clsx(
                  'embla__slide embla__slide--thumb aspect-[3/2] w-full basis-1/6 rounded transition-opacity',
                  index == selectedIndex &&
                    'is-selected border-2 border-green-500 opacity-100',
                  !(index == selectedIndex) && 'opacity-75',
                  vertical && 'w-full'
                )}
              >
                <button
                  onClick={() => onThumbClick(index)}
                  className='embla__slide__inner embla__slide__inner--thumb relative aspect-[3/2] w-full'
                  type='button'
                >
                  <Image
                    className='embla__slide__thumbnail  relative block rounded object-cover'
                    src={slide.sourceUrl}
                    alt={slide.title ? slide.title : ''}
                    sizes='(max-width: 420px) 100vw, 420px'
                    fill
                    priority
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSliderDesktop
