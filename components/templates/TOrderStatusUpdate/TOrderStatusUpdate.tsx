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

import OrderStatusUpdate, { OrderStatusUpdateProps } from "@/components/molecules/OrderStatusUpdate/OrderStatusUpdate"
import { updateOrder } from "@/services/actions/order.action"

export type TOrderStatusUpdateProps = Omit<OrderStatusUpdateProps, 'submit'>

const TOrderStatusUpdate = (props: TOrderStatusUpdateProps) => {
    return (
        <OrderStatusUpdate {...props} submit={updateOrder} />
    )
}

export default TOrderStatusUpdate