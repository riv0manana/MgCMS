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


import React from 'react'
import ProductCard from '@/components/molecules/ProductCard/ProductCard'
import { ShoppingCart } from 'lucide-react'
import { getProducts } from '@/services/actions/product.action'
import ScrollableSection from '@/components/atoms/ScrollableSection/ScrollableSection'
import { getTranslations } from 'next-intl/server'

const TRecommendedProduct = async () => {
    const [, data] = await getProducts({
        limit: '20',
        filters: JSON.stringify({
            filters: [{field: 'promoted', value: true, operator: 'eq'}]
        })
    });
    const products = data?.documents || [];
    const t = await getTranslations('components.templates.TRecommendedProduct')

    if (!products.length) return null;
    
    return (
        <ScrollableSection title={t('title')}>
            {products.map((product, i) => (
                <ProductCard isLCP={i === 0} disableHover key={`rcmd_product_${i}`} product={product}>
                    <ProductCard.AddToBasketBtn
                        product={product}
                        icon={<ShoppingCart className="ml-2 h-4 w-4" />}
                        label={t('basketBtn')}
                    />
                </ProductCard>
            ))}
        </ScrollableSection>
    )
}

export default TRecommendedProduct