'use client'

import { i18n } from '@/i18n-config'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const params = useParams()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='uppercase'>
        {params?.lang}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {i18n.locales.map((locale) => {
          return (
            <DropdownMenuItem key={locale}>
              <Link href={redirectedPathName(locale)} className='uppercase'>
                {locale}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
