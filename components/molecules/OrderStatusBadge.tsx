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




import Badge, { BadgeProps } from "@/components/atoms/Badge";
import { useTranslations } from "next-intl";

export type OrderStatusBadgeProps = {
    order: Order;
}

const OrderStatusBadge = ({
    order,
}: OrderStatusBadgeProps) => {
    const common = useTranslations('Common.order.status')
    const mapStatusBadge = (status?: ORDER_STATUS): BadgeProps => {
        switch (status) {
            case 'PREPARING':
                return {
                    value: common(status),
                    variant: 'warning',
                };
            case 'CANCELED':
            case 'REFUND':
                return {
                    value: common(status),
                    variant: 'destructive',
                };
            case 'READY':
                return {
                    value: common(status),
                    variant: 'important',
                };
            case 'DELIVERED':
                return {
                    value: common(status),
                    variant: 'success',
                };
            default:
                return {
                    value: common('PENDING'),
                    variant: 'default', 
                }
        }
    }

    const props = mapStatusBadge(order.status)

    return (
        <Badge {...props} />
    )
}

export default OrderStatusBadge