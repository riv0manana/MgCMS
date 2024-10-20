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


import { getProducts } from '@/services/actions/product.action'
import ProductListing from '@/components/organisms/ProductListing/ProductListing'

const TProductListing = async () => {
    const [, data] = await getProducts({ limit: 20});
    return (
        <ProductListing
            getElements={getProducts}
            initialElements={data?.documents}
            total={data?.total}
            limit={10}
            infinite
        />
    )
}

export default TProductListing