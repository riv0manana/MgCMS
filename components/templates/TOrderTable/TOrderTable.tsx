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


import OrderTable from "@/components/organisms/tables/OrderTable/OrderTable"
import { getOrders, updateOrder } from "@/services/actions/order.action"

const TOrderTable = async () => {
    const [, data] = await getOrders();
    return (
        <OrderTable updateStatus={updateOrder} items={data?.documents} />
    )
}

export default TOrderTable