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

import { deleteProduct } from "@/services/actions/product.action"
import ProductDeleteBtn, { ProductDeleteBtnProps } from "@/components/organisms/buttons/ProductDeleteBtn"

export type TProductDeleteBtnProps = Omit<ProductDeleteBtnProps, 'submit'>
const TProductDeleteBtn = (props: TProductDeleteBtnProps) => {
    return (
        <ProductDeleteBtn {...props} submit={deleteProduct} />
    )
}

export default TProductDeleteBtn