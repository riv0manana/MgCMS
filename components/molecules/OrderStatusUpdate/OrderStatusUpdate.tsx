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


'use client'

import OrderStatusFilter, { OrderStatusFilterProps } from '@/components/atoms/OrderStatusFilter/OrderStatusFilter';
import useActionToast from '@/hooks/ActionToast';
import { useTranslations } from 'next-intl';
import { useTransition } from 'react'

export type OrderStatusUpdateProps = Omit<OrderStatusFilterProps, 'onSelect' | 'hideAll' | 'current'> & {
    submit: (order_id: string, status: ORDER_STATUS) => Promise<ActionResponse<Order>>;
    order: Order;
}

const OrderStatusUpdate = ({
    submit,
    order,
    ...props
}: OrderStatusUpdateProps) => {
    const [loading, action] = useTransition();
    const toast = useActionToast()
    const t = useTranslations('components.molecules.OrderStatusUpdate')

    const updateOrderStatus = (newStatus: ORDER_STATUS) => {
        action(async () => {
            const [error, res] = await submit(order.$id!, newStatus);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.success.title'),
                    errorTitle: t('toast.error.title'),
                }
            )
        })
    }
    return (
        <OrderStatusFilter
            {...props}
            disabled={loading}
            hideAll
            onSelect={e => updateOrderStatus(e as ORDER_STATUS)}
            current={order.status}
        />
    )
}

export default OrderStatusUpdate