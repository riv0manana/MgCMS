'use client'

import ListingSection from "@/components/atoms/ListingSection/ListingSection"
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


import PaginatedListing, { PaginatedListingProps } from "@/components/atoms/PaginatedListing/PaginatedListing"
import ProductCard from "@/components/molecules/ProductCard/ProductCard"
import { ShoppingCart } from "lucide-react"
import { useTranslations } from "next-intl"

export type PropuctListingProps = Omit<
    PaginatedListingProps<Product>, 'className' | 'renderItem'
>

const ProductListing = (props: PropuctListingProps) => {
    const t = useTranslations('components.organisms.ProductListing')
    return (
        <ListingSection title={t('title')}>
            <PaginatedListing
                {...props}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 place-items-center"
                renderItem={(product, i) => (
                    <ProductCard isLCP={i === 0} product={product}>
                        <ProductCard.AddToBasketBtn
                            product={product}
                            icon={<ShoppingCart className="ml-2 h-4 w-4" />}
                            label={t('basketBtn')}
                        />
                    </ProductCard>
                )}
            />
        </ListingSection>

    )
}

export default ProductListing