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

import AdminHeader from "@/components/organisms/AdminHeader/AdminHeader"
import { ReactNode } from "react"

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <AdminHeader />
            <main className="min-h-screen bg-gradient-to-b from-second-50 to-main-50 container mx-auto px-4 max-w-2xl space-y-4">
                {children}
            </main>
        </>
    )
}

export default AdminLayout