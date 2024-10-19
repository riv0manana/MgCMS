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


import PublicHeader from "@/components/organisms/PublicHeader"
import { ReactNode } from "react"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <PublicHeader />
      <main className="min-h-screen bg-gradient-to-b from-second-50 to-main-50 flex items-center justify-center p-4">
        {children}
      </main>
    </>

  )
}

export default DashboardLayout