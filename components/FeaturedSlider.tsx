'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { Featured } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import Shimmer from 'lib/Shimmer'
import Image from 'next/image'
import Link from 'next/link'
import Pill from './ui/Pill'

type PropType = {
  propiedades: Featured[]
}

const FeaturedSlider = ({ propiedades }: PropType) => {
  const [mainViewportRef] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
  })

  return (
    <div className='embla'>
      <div className='embla__viewport overflow-x-hidden ' ref={mainViewportRef}>
        <div className='embla__container x-ml-6 flex items-stretch gap-2'>
          {propiedades.map((propiedad) => (
            <Link
              key={propiedad.slug}
              href={`/propiedad/${propiedad.slug}`}
              className='embla__slide xmax-h-[420px] relative aspect-[3/2] min-w-0 shrink-0 grow-0 basis-4/5 '
            >
              <Pill>
                {`${propiedad.tipo} - ${propiedad.operacion.replace('-', ' ')}`}
              </Pill>
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
  )
}

export default FeaturedSlider
