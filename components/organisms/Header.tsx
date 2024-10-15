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



import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ClockArrowUpIcon } from 'lucide-react'
import BasketButton from '@/components/molecules/BasketButton'
import OrderBasket from '@/components/molecules/OrderBasket'
import { useTranslations } from 'next-intl'

export default function Header() {
    const t = useTranslations('components.organisms.Header')
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <Link aria-labelledby='Logo' href="/" className="mr-6 flex items-center space-x-2">
                <span className="font-extrabold gest text-2xl text-main-700">DEMO</span>
                </Link>
                <div className="flex items-center justify-between space-x-2 md:justify-end">
                    <BasketButton>
                        <OrderBasket/>
                        <span className="sr-only">{t('sr-btn.cart')}</span>
                    </BasketButton>
                    <Link href="/tracking" aria-label='Track my order'>
                        <Button variant="ghost" size="icon">
                            <ClockArrowUpIcon className="h-6 w-6 text-main-600" />
                            <span className="sr-only">{t('sr-btn.tracking')}</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}