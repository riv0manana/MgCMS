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


import Header from "@/components/atoms/Header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClockArrowUpIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import TLogoutButton from "@/components/templates/TLogoutButton"

const AdminHeader = () => {
    const t = useTranslations('components.organisms.AdminHeader')
    return (
        <Header>
            <Link href="/dashboard/orders" aria-label={t('sr-btn.orders')}>
                <Button aria-label={t('sr-btn.orders')} variant="ghost">
                    <ClockArrowUpIcon className="h-8 w-8 text-main-600" />
                </Button>
            </Link>
            <Link href="/dashboard/products" aria-label={t('sr-btn.products')}>
                <Button aria-label={t('sr-btn.products')} variant="ghost">
                    <ClockArrowUpIcon className="h-8 w-8 text-main-600" />
                </Button>
            </Link>
            <TLogoutButton />
        </Header>
    )
}

export default AdminHeader