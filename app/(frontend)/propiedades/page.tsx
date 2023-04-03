'use client'

import React from 'react'

export default function PropiedadesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <p>Search: {Object.entries(searchParams)}</p>
    </>
  )
}
