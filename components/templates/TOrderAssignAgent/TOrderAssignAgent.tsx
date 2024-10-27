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

import OrderAssignAgent, { OrderAssignAgentProps } from "@/components/molecules/OrderAssignAgent/OrderAssignAgent";
import { assignAgent } from "@/services/actions/order.action";

export type TOrderAssignAgentProps = Omit<OrderAssignAgentProps, 'submit'>

const TOrderAssignAgent = (props: TOrderAssignAgentProps) => {
    return (
        <OrderAssignAgent submit={assignAgent} {...props} />
    )
}

export default TOrderAssignAgent