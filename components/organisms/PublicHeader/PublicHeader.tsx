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

import Header from "@/components/atoms/Header/Header"
import BasketButton from "@/components/molecules/BasketButton/BasketButton"
import OrderBasket from "@/components/molecules/OrderBasket/OrderBasket"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClockArrowUpIcon } from "lucide-react"
import { useTranslations } from "next-intl"

const PublicHeader = () => {
    const t = useTranslations('components.organisms.PublicHeader')
    return (
        <Header>
            <BasketButton aria-label={t('sr-btn.cart')}>
                <OrderBasket />
            </BasketButton>
            <Link href="/tracking" aria-label={t('sr-btn.tracking')}>
                <Button aria-label={t('sr-btn.tracking')} variant="ghost" className="h-10">
                    <ClockArrowUpIcon className="h-6 w-6 text-main-600" />
                </Button>
            </Link>
        </Header>
    )
}

export default PublicHeader