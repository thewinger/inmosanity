import { IPropiedad } from 'lib/interfaces'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import { NumericFormat } from 'react-number-format'

type Props = {
  propiedad: IPropiedad
}

export default function PropiedadCard({ propiedad }: Props) {
  return (
    <>
      {propiedad && (
        <div className="relative flex h-full w-full min-w-full flex-col gap-2 rounded-md border-2 border-zinc-100 bg-white text-zinc-800 shadow-md backdrop-blur-md">
          <div className="relative aspect-[3/2] w-full rounded-md border-2 border-zinc-100">
            <Image
              className="relative block h-auto w-full rounded-md"
              src={urlForImage(propiedad.coverImage).url()}
              alt={propiedad.title}
              fill
              priority
            />
          </div>
          <div className="px-4 pb-4">
            <div className="absolute top-6 left-6 shrink-0 rounded-md border bg-white/60 py-1 px-2 text-xs font-semibold uppercase text-green-900 shadow-sm backdrop-blur-md  ">
              {propiedad.operacion.replace('-', ' ')}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4 sm:justify-start">
                <h3 className="font-sans text-xl font-semibold tracking-wide text-green-700 ">
                  <div className="flex items-baseline">
                    <span className="font-bold ">
                      <NumericFormat
                        valueIsNumericString={true}
                        value={propiedad.price}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="€"
                      />
                    </span>
                    {propiedad.operacion === 'en-alquiler' && (
                      <span className="text-xs font-medium ">/mes</span>
                    )}
                  </div>
                </h3>
              </div>
              <div className="xsgap-2  flex flex-col">
                <div className="flex items-center gap-2 text-lg text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="text-md font-medium capitalize text-zinc-800">
                    {propiedad.tipo}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-lg text-zinc-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="capitalize text-zinc-800">
                    <span>{propiedad.localizacion}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-around">
                {propiedad.bedrooms && (
                  <div className="flex gap-1 text-lg text-zinc-500 only:grow only:self-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v12m18-7v7M3 14c0-.552.895-1 2-1h14c1.105 0 2 .448 2 1v2c0 .552-.895 1-2 1H5c-1.105 0-2-.448-2-1v-2zm2-3.25c0-.414.249-.75.556-.75h3.888c.307 0 .556.336.556.75v1.5c0 .414-.249.75-.556.75H5.556C5.249 13 5 12.664 5 12.25v-1.5z"
                      />
                    </svg>
                    <span className="text-md font-medium text-zinc-800">
                      {propiedad.bedrooms}
                    </span>
                  </div>
                )}

                {propiedad.bathrooms && (
                  <div className="flex items-center gap-1 text-lg text-zinc-500 only:grow only:self-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m7 18-1 1M6 12V6c0-2 1-3 3-3v0l2 1h0M18 19v-1M4 13h16M4 13H3m1 0c0 3 2 5 3 5h10c1 0 3-2 3-5m0 0h1"
                      />
                    </svg>
                    <span className="text-md font-medium text-zinc-800">
                      {propiedad.bathrooms}
                    </span>
                  </div>
                )}
                {propiedad.size && (
                  <div className="flex gap-1 text-lg text-zinc-800 only:grow only:self-start">
                    <span className="text-md font-medium ">
                      {propiedad.size}
                    </span>
                    <span className="xtext-sm text-zinc-600 ">
                      m<sup className="font-features sups">2</sup>
                    </span>
                  </div>
                )}
                {propiedad.year && (
                  <div className="flex gap-1 text-lg text-zinc-800 only:grow only:self-start">
                    <span className="text-zinc-600">año</span>
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
