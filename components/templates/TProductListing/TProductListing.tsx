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


import ListingSection from '@/components/atoms/ListingSection/ListingSection'
import ProductCard from '@/components/molecules/ProductCard/ProductCard'
import { ShoppingCart } from 'lucide-react'
import { getProducts } from '@/services/actions/product.action'
import { getTranslations } from 'next-intl/server'

const TProductListing = async () => {
    const [, data] = await getProducts();
    const products = data?.documents || [];
    const t = await getTranslations('components.templates.TProductListing')
    return (
        <ListingSection title={t('title')}>
            {products.map((product, i) => (
                <ProductCard isLCP={i === 0} key={`rcmd_product_${i}`} product={product}>
                    <ProductCard.AddToBasketBtn
                        product={product}
                        icon={<ShoppingCart className="ml-2 h-4 w-4" />}
                        label={t('basketBtn')}
                    />
                </ProductCard>
            ))}
        </ListingSection>
    )
}

export default TProductListing