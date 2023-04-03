import Pill from './Pill'
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import HotelTwoToneIcon from '@mui/icons-material/HotelTwoTone'
import HouseTwoToneIcon from '@mui/icons-material/HouseTwoTone'
import PlaceTwoToneIcon from '@mui/icons-material/PlaceTwoTone'
import StraightenTwoToneIcon from '@mui/icons-material/StraightenTwoTone'
import { formatEUR } from 'lib/helpers'
import { IPropiedad } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

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
              sizes="(max-width: 768px) 100vw, 768px"
              fill
              priority
            />
          </div>

          <div className="px-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4 sm:justify-start">
                <h3 className=" text-xl font-semibold tracking-wide text-zinc-900 ">
                  <div className="relative flex items-center gap-2">
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
                  <HouseTwoToneIcon className="h-6 w-6" />
                  <span className="capitalize text-zinc-700">
                    {propiedad.tipo}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-lg text-zinc-500">
                  <PlaceTwoToneIcon className="h-6 w-6" />
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
                  <div className="flex items-center justify-center gap-1 text-zinc-500">
                    <HotelTwoToneIcon className="h-5 w-5" />
                    {/* <MdOutlineBed size={20} /> */}
                    <span className="text-zinc-700">{propiedad.bedrooms}</span>
                  </div>
                )}

                {propiedad.bathrooms && (
                  <div className="flex items-center justify-center gap-1 text-zinc-500">
                    <BathtubTwoToneIcon className="h-5 w-5" />
                    <span className="text-zinc-700">{propiedad.bathrooms}</span>
                  </div>
                )}
                {propiedad.size && (
                  <div className="flex items-center justify-center gap-1 text-zinc-500">
                    <StraightenTwoToneIcon className="h-5 w-5" />
                    <span className="text-md text-zinc-700">
                      {propiedad.size}
                    </span>
                    <span className="text-md text-zinc-700">
                      m<sup className="font-features sups">2</sup>
                    </span>
                  </div>
                )}
                {propiedad.year && (
                  <div className="flex items-center justify-center gap-1 text-zinc-500">
                    <CalendarMonthTwoToneIcon className="h-5 w-5" />
                    <span className="text-zinc-700">{propiedad.year}</span>
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
