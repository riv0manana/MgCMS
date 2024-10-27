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
import { getAgents } from "@/services/actions/agent.action";
import { getOrders } from "@/services/actions/order.action"

const TOrderTable = async () => {
    const [, orders] = await getOrders();
    const [, agents] = await getAgents();
    return (
        <OrderTable items={orders?.documents} agents={agents?.documents} />
    )
}

export default TOrderTable