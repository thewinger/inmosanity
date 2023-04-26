import Link from 'next/link'

import { CaretRightIcon, FacebookIcon, InstagramIcon } from './ui/icons'

const Footer = () => {
  return (
    <footer className='bg-zinc-50'>
      <div className=' h-[220px] bg-footerBorder bg-cover bg-right'></div>
      <div className='grid grid-cols-1 gap-10 bg-green-700 px-4 py-8 text-green-50 lg:grid-cols-2 lg:gap-12 lg:px-12'>
        <div className='columna flex flex-col gap-2'>
          <h3 className='py-2 text-sm font-semibold uppercase  tracking-wide lg:px-0'>
            Quienes somos
          </h3>
          <div className='flex flex-col gap-2 '>
            <p>
              Agencia inmobiliaria ubicada en el Centro Comercial dentro del
              Residencial Bonalba especializada en la compraventa y el alquiler
              de viviendas, plazas de parking y locales comerciales en la zona.
              Más de 15 años en Bonalba nos avalan para dar el mejor servicio y
              atención a nuestros clientes.
            </p>
            <p>
              Tambien ofrecemos servicio postventa y servicios integrales con el
              fin de facilitar a nuestros clientes su bien estar en Bonalba,
              bien sea para su vivienda de vacaciones, habitual o en alquiler.
            </p>
            <Link
              href='/aviso-legal'
              className='slef-start mt-4 flex w-fit items-center rounded-md bg-green-950/30 px-4 py-1 lg:justify-start lg:gap-2'
            >
              <span className='nderline py-2 text-sm '>Aviso legal</span>
              <CaretRightIcon size={16} weight='bold' />
            </Link>
          </div>
        </div>

        <div className='columna  flex flex-col gap-2 lg:col-start-2'>
          <h3 className='py-2  text-sm font-semibold uppercase  tracking-wide lg:px-0'>
            Contacto
          </h3>
          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='flex basis-1/2 flex-col gap-4'>
              <div className='flex w-full justify-start gap-3'>
                <Link
                  className='text-green-50'
                  href='https://www.facebook.com/BonalbaInmogolf/'
                >
                  <FacebookIcon size={44} weight='regular' />
                </Link>
                <Link
                  className='text-green-50'
                  href='https://www.instagram.com/inmogolfbonalba/'
                >
                  <InstagramIcon size={44} weight='regular' />
                </Link>
              </div>
              <p className='xpb-2'>
                Entre Semana: 10:00 - 19:30 <br />
                Sábados hasta las 14:00
              </p>
              <p className='xpb-2'>
                <Link className='underline' href='tel:965959663'>
                  965959663
                </Link>{' '}
                -{' '}
                <Link className='underline' href='tel:655849409'>
                  655849409
                </Link>
              </p>
              <Link href='https://goo.gl/maps/ETpkKCv9wPuQs9CQ7'>
                Calle Vespre, Centro Comercial Bonalba local 11, 03110, Mutxamel
                (Alicante), Spain
              </Link>
            </div>
            <div className='basis-1/2'>
              <div className='h-full w-full overflow-hidden rounded-md '>
                <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.9347420700537!2d-0.4396482870882033!3d38.44297627326901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd623a620272964f%3A0xe3358cd49c71b93!2sInmobiliaria%20Inmogolf%20Bonalba!5e0!3m2!1sen!2ses!4v1682507335851!5m2!1sen!2ses'
                  style={{ border: 0, width: '100%', height: '100%' }}
                  /* allowFullScreen */
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer
