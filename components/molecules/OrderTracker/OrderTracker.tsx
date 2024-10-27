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

import { cn } from "@/lib/utils";
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge/OrderStatusBadge";
import { CheckCircle, Clock, Truck, Utensils } from "lucide-react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import ShortOrderDetails from "@/components/atoms/ShortOrderDetails/ShortOrderDetails";
import { useTranslations } from "next-intl";
import AgentInfo from "@/components/atoms/AgentInfo/AgentInfo";
import TAgentPositionMap from "@/components/templates/TAgentPositionMap/TAgentPositionMap";

export type OrderTrackerProps = {
    order: Order,
    className?: string;
}

const OrderTracker = ({
    order,
    className
}: OrderTrackerProps) => {
    const t = useTranslations('components.molecules.OrderTracker')
    const getStatusIcon = (status?: ORDER_STATUS) => {
        switch (status) {
            case 'PENDING': return <Clock className="h-8 w-8 text-slate-600" />
            case 'PREPARING': return <Utensils className="h-8 w-8 text-yellow-500" />
            case 'READY': return <CheckCircle className="h-8 w-8 text-blue-500" />
            case 'DELIVERED': return <Truck className="h-8 w-8 text-green-500" />
            case 'CANCELED': return <CrossCircledIcon className="h-8 w-8 text-red-500" />
            case 'CANCELED': return <CrossCircledIcon className="h-8 w-8 text-red-500" />
            default: return <Clock className="h-8 w-8 text-slate-600" />
        }
    }
    return (
        <div className={cn("space-y-6", className)} >
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('label', { id: order.$id})}</h2>
                <OrderStatusBadge order={order} />
            </div>
            <div className="flex flex-col justify-center items-center space-x-4 space-y-4">
                <div className="flex flex-col items-center">
                    <div className={`rounded-full p-2`}>
                        {getStatusIcon(order.status)}
                    </div>
                    <div className={`h-1 w-16`} />
                </div>
                <ShortOrderDetails className="flex flex-col items-center" hideBtn order={order} />
                <AgentInfo agent={order.agent} />
                <TAgentPositionMap agent={order.agent} />
            </div>
        </div >
    )
}

export default OrderTracker