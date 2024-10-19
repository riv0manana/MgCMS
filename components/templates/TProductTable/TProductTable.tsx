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


import { getProducts } from "@/services/actions/product.action"
import ProductTable from "@/components/organisms/tables/ProductTable/ProductTable";

const TProductTable = async () => {
    const [, data] = await getProducts();
    return (
        <ProductTable products={data?.documents} />
    )
}

export default TProductTable