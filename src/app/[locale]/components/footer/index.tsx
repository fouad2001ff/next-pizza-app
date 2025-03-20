import { useTranslations } from 'next-intl'
import React from 'react'

const Footer = () => {
  const t = useTranslations('footer')
  return (
    <footer className='border border-accent-1 text-accent py-4 text-center'>
      <p> {t('copyright')}</p>
    </footer>
  )
}

export default Footer