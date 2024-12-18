/*
 * Project Name: MgCMS
 * Author: Sarindramalala Rivomanana MANDANIAINA | riv0manana.dev
 * License: Creative Commons Attribution-NonCommercial (CC BY-NC)
 *          Commercial use requires a license. See LICENSE-COMMERCIAL.md for more details.
 * 
 * Description: Code first CMS for locale store
 * 
 * Copyright 2024 riv0manana.dev
 * 
 * For commercial use, please contact: contact@riv0manana.dev
 */


import Footer from '@/components/molecules/Footer/Footer'
import { ReactNode } from 'react'
import PublicHeader from '@/components/organisms/PublicHeader/PublicHeader'

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen container px-4 py-8 space-y-4">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default PublicLayout