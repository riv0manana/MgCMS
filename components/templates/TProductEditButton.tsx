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



import { editProduct } from "@/services/actions/product.action"
import ProductEditBtn, { ProductEditBtnProps } from "@/components/organisms/buttons/ProductEditBtn";

export type TProductEditButtonProps = Omit<ProductEditBtnProps, 'submit' | 'callback'>;

const TProductEditButton = (props: TProductEditButtonProps) => {
    return (
        <ProductEditBtn {...props} submit={editProduct} />
    )
}

export default TProductEditButton