import { formatEUR } from 'lib/helpers'
import { IPropiedad } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import {
  BathtubIcon,
  BedIcon,
  BuildingsIcon,
  CalendarBlankIcon,
  MapPinIcon,
  RulerIcon,
} from './icons'
import Pill from './Pill'

type Props = {
  propiedad: IPropiedad
}

export default function PropiedadCard({ propiedad }: Props) {
  return (
    <>
      {propiedad && (
        <div className='relative flex flex-col gap-4 rounded-md bg-white pb-6 text-zinc-800 shadow-md'>
          <Pill>{propiedad.operacion.replace('-', ' ')}</Pill>
          <div className='relative aspect-[3/2] w-full overflow-hidden rounded-t-md '>
            <Image
              className='relative block h-auto w-full '
              src={urlForImage(propiedad.coverImage).url()}
              alt={propiedad.title}
              sizes='(max-width: 768px) 100vw, 768px'
              fill
              priority
            />
          </div>

          <div className='px-4'>
            <div className='flex flex-col gap-2'>
              <div className='flex items-center justify-between gap-4 sm:justify-start'>
                <h3 className=' text-xl font-semibold tracking-wide text-zinc-900 '>
                  <div className='relative flex items-center gap-2'>
                    <span className='font-bold '>
                      {formatEUR(propiedad.price)}
                    </span>
                    {propiedad.operacion === 'en-alquiler' && (
                      <span className='text-xs font-medium '>/mes</span>
                    )}
                  </div>
                </h3>
              </div>

              <div className=' mb-2 flex flex-col gap-1'>
                <div className='flex items-center gap-1 text-lg text-zinc-500'>
                  <BuildingsIcon size={24} weight='duotone' />
                  <span className='capitalize text-zinc-700'>
                    {propiedad.tipo}
                  </span>
                </div>

                <div className='flex items-center gap-1 text-lg text-zinc-500'>
                  <MapPinIcon size={24} weight='duotone' />
                  <div className='capitalize text-zinc-700'>
                    {propiedad.localizacionPadre && (
                      <span>{propiedad.localizacionPadre.parent.title} - </span>
                    )}
                    <span>{propiedad.localizacion}</span>
                  </div>
                </div>
              </div>

              <div className='text-md grid grid-flow-col grid-rows-1 border-t border-zinc-300 pt-4'>
                {propiedad.bedrooms && (
                  <div className='flex items-center justify-center gap-1 text-zinc-500'>
                    <BedIcon size={20} weight='duotone' />
                    <span className='text-zinc-700'>{propiedad.bedrooms}</span>
                  </div>
                )}

                {propiedad.bathrooms && (
                  <div className='flex items-center justify-center gap-1 text-zinc-500'>
                    <BathtubIcon size={24} weight='duotone' />
                    <span className='text-zinc-700'>{propiedad.bathrooms}</span>
                  </div>
                )}
                {propiedad.size && (
                  <div className='flex items-center justify-center gap-1 text-zinc-500'>
                    <RulerIcon size={20} weight='duotone' />
                    <span className='text-md text-zinc-700'>
                      {propiedad.size}
                    </span>
                    <span className='text-md text-zinc-700'>
                      m<sup className='font-features sups'>2</sup>
                    </span>
                  </div>
                )}
                {propiedad.year && (
                  <div className='flex items-center justify-center gap-1 text-zinc-500'>
                    <CalendarBlankIcon size={20} weight='duotone' />
                    <span className='text-zinc-700'>{propiedad.year}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
