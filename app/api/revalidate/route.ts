import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

// Sanity document types that trigger revalidation
type SanityDocumentType = 'propiedad' | 'paginas' | 'operacion' | 'tipo' | 'localizacion'

interface SanityWebhookBody {
  _type: SanityDocumentType
  slug?: { current: string }
}

const secret = process.env.SANITY_REVALIDATE_SECRET

export async function POST(req: NextRequest) {
  try {
    // Verify webhook signature and parse body
    const { isValidSignature, body } = await parseBody<SanityWebhookBody>(
      req,
      secret,
      true // Log parse errors
    )

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid signature', revalidated: false },
        { status: 401 }
      )
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: 'Bad request: missing _type', revalidated: false },
        { status: 400 }
      )
    }

    const { _type, slug } = body
    const revalidatedPaths: string[] = []

    // Revalidate based on document type
    switch (_type) {
      case 'propiedad':
        // Revalidate the specific property page (both languages)
        if (slug?.current) {
          revalidatePath(`/en/propiedad/${slug.current}`)
          revalidatePath(`/es/propiedad/${slug.current}`)
          revalidatedPaths.push(`/*/propiedad/${slug.current}`)
        }
        // Revalidate home page (featured/latest properties)
        revalidatePath('/en')
        revalidatePath('/es')
        revalidatedPaths.push('/en', '/es')
        // Revalidate search/listing page
        revalidatePath('/en/propiedades')
        revalidatePath('/es/propiedades')
        revalidatedPaths.push('/*/propiedades')
        break

      case 'paginas':
        // Revalidate the specific page (both languages)
        if (slug?.current) {
          revalidatePath(`/en/${slug.current}`)
          revalidatePath(`/es/${slug.current}`)
          revalidatedPaths.push(`/*/${slug.current}`)
        }
        break

      case 'operacion':
      case 'tipo':
      case 'localizacion':
        // These affect filter dropdowns on home and search pages
        revalidatePath('/en')
        revalidatePath('/es')
        revalidatePath('/en/propiedades')
        revalidatePath('/es/propiedades')
        revalidatedPaths.push('/en', '/es', '/*/propiedades')
        break

      default:
        return NextResponse.json(
          { message: `Unknown document type: ${_type}`, revalidated: false },
          { status: 400 }
        )
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated paths for ${_type}`,
      paths: revalidatedPaths,
      now: Date.now(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json(
      { message: 'Error revalidating', revalidated: false },
      { status: 500 }
    )
  }
}
