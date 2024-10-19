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



import OrderForm, { OrderFormProps } from "@/components/molecules/forms/OrderForm/OrderForm"
import { createOrder } from "@/services/actions/order.action"

export type TOrderFormProps = Omit<OrderFormProps, 'submit'>

const TOrderForm = (props: TOrderFormProps) => {
    return (
        <OrderForm {...props} submit={createOrder} />
    )
}

export default TOrderForm