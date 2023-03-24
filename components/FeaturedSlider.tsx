import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'
import { IFeatured } from 'lib/interfaces'
import Shimmer from 'lib/Shimmer'
import { urlForImage } from 'lib/sanity.image'
import Pill from './Pill'

type PropType = {
  propiedades: IFeatured[]
}

const FeaturedSlider = ({ propiedades }: PropType) => {
  const [mainViewportRef] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
  })

  return (
    <div className="embla ">
      <div className="embla__viewport h-full " ref={mainViewportRef}>
        <div className="embla__container -ml-4 flex flex-row gap-2">
          {propiedades.map((propiedad) => (
            <Link
              key={propiedad.slug}
              href={`/propiedad/${propiedad.slug}`}
              className="embla__slide relative aspect-[3/2] min-w-0 flex-shrink-0 flex-grow-0 basis-5/6"
            >
              <Pill>
                {`${propiedad.tipo} - ${propiedad.operacion.replace('-', ' ')}`}
              </Pill>
              <Image
                className="block  w-full rounded object-cover"
                src={urlForImage(propiedad.coverImage).url()}
                alt={propiedad.title}
                fill
                placeholder="blur"
                blurDataURL={Shimmer}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedSlider
