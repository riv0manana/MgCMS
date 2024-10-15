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


import Footer from '@/components/molecules/Footer'
import Header from '@/components/organisms/Header'
import { ReactNode } from 'react'

const PublicLayout = ({children}: {children: ReactNode}) => {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  )
}

export default PublicLayout