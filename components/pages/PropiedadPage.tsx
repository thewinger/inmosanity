import ProductSlider from '../ProductSlider'
import Pill from '../ui/Pill'
import { formatEUR } from 'lib/helpers'
import { IPropiedad } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import { notFound } from 'next/navigation'
import {
  MdOutlineBathtub,
  MdOutlineBed,
  MdOutlineEditCalendar,
  MdOutlineHouse,
  MdOutlineLocationOn,
  MdOutlineStraighten,
} from 'react-icons/md'

export interface PropiedadPageProps {
  preview?: boolean
  loading?: boolean
  propiedad: IPropiedad
}

export interface ILocalImage {
  sourceUrl: string
  title: string
}

export default function PropiedadPage(props: PropiedadPageProps) {
  const { propiedad } = props

  const slug = propiedad?.slug

  if (!slug) {
    notFound()
  }

  const imagesUrl: ILocalImage[] = propiedad.images.map((imagen) => {
    return {
      sourceUrl: urlForImage(imagen).url(),
      title: imagen.asset._ref,
    }
  })

  return (
    <>
      <div className="relative mx-auto mb-24 grid max-w-5xl auto-rows-auto grid-cols-1 gap-4 bg-white pt-4 pb-12 text-zinc-800 lg:grid-cols-2 lg:gap-y-10 lg:px-6 lg:shadow-md xl:shadow-md">
        <div className="lg:-col-end-1 relative flex flex-col md:flex-row md:items-start md:gap-2 lg:row-span-3">
          <Pill>{propiedad.operacion.replace('-', ' ').toUpperCase()}</Pill>
          <div className="sliderContainer lg:px4 relative flex grow items-center justify-center overflow-x-hidden">
            <ProductSlider key={propiedad.slug} slides={imagesUrl} />
          </div>
        </div>

        <div className="flex basis-5/12 flex-col gap-4 px-4 ">
          <div className="flex items-center gap-4 ">
            <h1 className="grow text-xl font-semibold tracking-wide">
              {propiedad.title}
            </h1>
            <button className=" hidden rounded-md bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-white shadow-sm shadow-green-700/50 hover:from-green-600 sm:block">
              Contactar
            </button>
          </div>
          <div className="hidden sm:block">
            <span className="text-2xl font-bold text-zinc-900 ">
              {formatEUR(propiedad.price)}
            </span>
            {propiedad.operacion === 'En Alquiler' && (
              <span className="font-medium text-zinc-700 ">/mes</span>
            )}
          </div>
          <div className="mb-2 flex flex-col gap-1">
            <div className="flex items-center gap-1 text-lg text-zinc-500">
              <MdOutlineHouse size={24} />
              {/* <Buildings size={24} weight="duotone" color="currentColor" /> */}
              <span className="text-md  capitalize text-zinc-800">
                {propiedad.tipo}
              </span>
            </div>

            <div className="flex items-center gap-1 text-lg text-zinc-500">
              <MdOutlineLocationOn size={24} />
              {/* <MapPin size={24} weight="duotone" color="currentColor" /> */}
              <div className="capitalize text-zinc-800">
                {propiedad.localizacionPadre &&
                  propiedad.localizacionPadre.parent && (
                    <span>{propiedad.localizacionPadre.parent.title} - </span>
                  )}
                <span>{propiedad.localizacion}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-flow-col grid-rows-1 border-y border-zinc-300 py-4">
            {propiedad.bedrooms && (
              <div className="flex items-center justify-center gap-1">
                <MdOutlineBed size={20} />
                {/* <Bed size={20} weight="duotone" color="currentColor" /> */}
                <span className="text-md  text-zinc-800">
                  {propiedad.bedrooms}
                </span>
              </div>
            )}

            {propiedad.bathrooms && (
              <div className="flex items-center justify-center gap-1">
                <MdOutlineBathtub size={20} />
                {/* <Bathtub size={20} weight="duotone" color="currentColor" /> */}
                <span className="text-md  text-zinc-800">
                  {propiedad.bathrooms}
                </span>
              </div>
            )}
            {propiedad.size && (
              <div className="flex items-center justify-center gap-1">
                <MdOutlineStraighten size={20} />
                {/* <Ruler size={20} weight="duotone" color="currentColor" /> */}
                <span className="text-md">{propiedad.size}</span>
                <span className="">
                  m<sup className="font-features sups">2</sup>
                </span>
              </div>
            )}
            {propiedad.year && (
              <div className="flex items-center justify-center gap-1">
                <MdOutlineEditCalendar size={20} />
                {/* <CalendarBlank size={20} weight="duotone" color="currentColor" /> */}
                <span className="">{propiedad.year}</span>
              </div>
            )}
          </div>
        </div>

        <div className="my-6 mx-4 lg:col-start-2 lg:my-0">
          {propiedad.caracteristicas && (
            <div className="rounded-lg border-2 border-zinc-100 bg-zinc-50 p-2">
              <ul className="flex flex-1 list-inside list-none flex-wrap justify-center gap-4 p-2 capitalize">
                {propiedad.caracteristicas.map((caracteristica) => (
                  <li key={caracteristica} className="flex items-center gap-1">
                    <svg
                      className="h-3 w-3 fill-emerald-600 stroke-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    {caracteristica}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {propiedad.description && (
          <div className="mx-4 text-lg font-normal lg:col-start-2">
            {propiedad.description}
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 m-2 flex items-center justify-around rounded-xl border-2 border-white bg-white/60 p-4 shadow-xl backdrop-blur sm:hidden md:hidden">
        {propiedad.price && (
          <div className="flex grow items-baseline">
            <span className="text-2xl font-bold text-zinc-900 ">
              {formatEUR(propiedad.price)}
            </span>
            {propiedad.operacion === 'En Alquiler' && (
              <span className="mt-4 font-medium text-zinc-700 ">/mes</span>
            )}
          </div>
        )}
        <button className="grow rounded-md bg-gradient-to-b from-green-600 to-green-700 px-4 py-2 text-white shadow-sm shadow-green-700/50 hover:from-green-600">
          Contactar
        </button>
      </div>
    </>
  )
}
