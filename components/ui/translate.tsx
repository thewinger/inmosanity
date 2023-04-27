'use client'
import Script from 'next/script'

export const Translate = () => {
  return (
    <>
      <div className='gtranslate_wrapper'></div>
      <Script id='translate' strategy='afterInteractive'>
        {`window.gtranslateSettings = {"default_language":"es","detect_browser_language":true,"languages":["es","en"],"wrapper_selector":".gtranslate_wrapper","switcher_horizontal_position":"right","switcher_vertical_position":"top"}`}
      </Script>
      <Script src='https://cdn.gtranslate.net/widgets/latest/dwf.js' defer />
    </>
  )
}
