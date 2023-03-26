import { formatEUR } from 'lib/helpers'
import { IPropiedad } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineEditCalendar,
  MdOutlineHouse,
  MdOutlineLocationOn,
  MdOutlineStraighten,
} from 'react-icons/md'
import Pill from './Pill'

type Props = {
  propiedad: IPropiedad
}

export default function PropiedadCard({ propiedad }: Props) {
  return (
    <>
      {propiedad && (
        <div className="relative flex flex-col gap-4 rounded-md bg-white pb-6 text-zinc-800 shadow-md">
          <Pill>{propiedad.operacion.replace('-', ' ')}</Pill>
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-md ">
            <Image
              className="relative block h-auto w-full "
              src={urlForImage(propiedad.coverImage).url()}
              alt={propiedad.title}
              fill
              priority
            />
          </div>

          <div className="px-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4 sm:justify-start">
                <h3 className=" text-xl font-semibold tracking-wide text-zinc-900 ">
                  <div className="flex items-baseline">
                    <span className="font-bold ">
                      {formatEUR(propiedad.price)}
                    </span>
                    {propiedad.operacion === 'en-alquiler' && (
                      <span className="text-xs font-medium ">/mes</span>
                    )}
                  </div>
                </h3>
              </div>

              <div className=" mb-2 flex flex-col gap-1">
                <div className="flex items-center gap-1 text-lg text-zinc-500">
                  <MdOutlineHouse size={24} />
                  {/* <Buildings size={24} weight="duotone" color="currentColor" /> */}
                  <span className="capitalize text-zinc-700">
                    {propiedad.tipo}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-lg text-zinc-500">
                  <MdOutlineLocationOn size={24} />
                  {/* <MapPin size={24} weight="duotone" color="currentColor" /> */}
                  <div className="capitalize text-zinc-700">
                    {propiedad.localizacionPadre && (
                      <span>{propiedad.localizacionPadre.parent.title} - </span>
                    )}
                    <span>{propiedad.localizacion}</span>
                  </div>
                </div>
              </div>

              <div className="text-md grid grid-flow-col grid-rows-1 border-t border-zinc-300 pt-4">
                {propiedad.bedrooms && (
                  <div className="flex items-center justify-center gap-1 text-zinc-600">
                    <MdOutlineBed size={20} />
                    {/* <Bed size={20} weight="duotone" color="currentColor" /> */}
                    <span className="">{propiedad.bedrooms}</span>
                  </div>
                )}

                {propiedad.bathrooms && (
                  <div className="flex items-center justify-center gap-1 text-zinc-600">
                    <MdOutlineBathtub size={20} />
                    {/* <Bathtub size={20} weight="duotone" color="currentColor" /> */}
                    <span className="">{propiedad.bathrooms}</span>
                  </div>
                )}
                {propiedad.size && (
                  <div className="flex items-center justify-center gap-1 text-zinc-600">
                    <MdOutlineStraighten size={20} />
                    {/* <Ruler size={20} weight="duotone" color="currentColor" /> */}
                    <span className="text-md">{propiedad.size}</span>
                    <span className="text-md">
                      m<sup className="font-features sups">2</sup>
                    </span>
                  </div>
                )}
                {propiedad.year && (
                  <div className="flex items-center justify-center gap-1 text-zinc-600">
                    <MdOutlineEditCalendar size={20} />
                    {/* <CalendarBlank size={20} weight="duotone" color="currentColor" /> */}
                    <span className="">{propiedad.year}</span>
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
