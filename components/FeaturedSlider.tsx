import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import Image from 'next/image'
import { IFeatured } from 'lib/interfaces'
import Shimmer from 'lib/Shimmer'
import { urlForImage } from 'lib/sanity.image'

type PropType = {
  propiedades: IFeatured[]
}

const FeaturedSlider = ({ propiedades }: PropType) => {
  const [mainViewportRef] = useEmblaCarousel({
    align: 'center',
    skipSnaps: false,
  })

  return (
    <div className="embla h-60">
      <div className="embla__viewport h-full " ref={mainViewportRef}>
        <div className="embla__container -ml-4 flex h-full flex-row gap-2">
          {propiedades.map((propiedad) => (
            <Link
              key={propiedad.slug}
              href={`/propiedades/${propiedad.slug}`}
              className="embla__slide relative min-w-0 flex-shrink-0 flex-grow-0 basis-5/6 pl-4"
            >
              <div className="absolute top-4 left-4 z-50 rounded-md border bg-white/60 py-1 px-2 text-xs font-semibold uppercase text-green-900 shadow-sm  ">
                {`${propiedad.operacion.replace('-', ' ')} - ${propiedad.tipo}`}
              </div>
              <Image
                className="block aspect-[3/2] w-full rounded object-cover"
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
