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


export type TProductListingProps = {
    queries: BaseQuery;
}

const TProductListing = async ({ queries }: TProductListingProps) => {
    const [, data] = await getProducts({
        ...queries,
        limit: queries.limit || '8'
    });
    return (
        <ProductListing
            getElements={getProducts}
            initialElements={data?.documents}
            total={data?.total}
            limit={queries.limit ? Number(queries.limit) : 8}
            infinite
        />
    )
}

export default TProductListing