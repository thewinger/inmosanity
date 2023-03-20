import Image from 'next/image'
import Link from 'next/link'
import logo from '/public/Logo_Inmogolf.png'

export default function Header() {
  return (
    <header className="">
      <div className=" flex items-center justify-between border-b-2 border-zinc-50 px-6 py-2">
        <div>Menu</div>
        <Link href={`/`}>
          <h1 className="sr-only">Inmogolf Bonalba</h1>
          <Image src={logo} alt="Inmogolf Bonalba" className="h-12 w-auto" />
        </Link>

        <div>Contacto</div>
      </div>
    </header>
  )
}
