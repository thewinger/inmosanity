import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { i18n } from './i18n-config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams
  const newSearchParams = new URLSearchParams()

  const createQueryString = (searchParams: object) => {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== '') {
        newSearchParams.set(key, value)
      }
    }

    return newSearchParams.toString()
  }

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one

  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/background.png',
      '/footer_border.svg',
      '/hero-golf.jpg',
      '/hero-golfball.jpg',
      '/Logo_Inmogolf.png',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'es.svg',
      'uk.svg',

      // Your other files in `public`
    ].includes(pathname)
  )
    return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    const newUrl = searchParams
      ? NextResponse.redirect(
          new URL(
            `/${locale}/${pathname}?${createQueryString(searchParams)}`,
            request.url
          )
        )
      : NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))

    return newUrl
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|sitemap.xml|robots.txt|_next/static|studio|_next/image|favicon.ico).*)',
  ],
}
