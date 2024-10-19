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



import OrderTracker from '@/components/molecules/OrderTracker/OrderTracker'
import { getOrder } from '@/services/actions/order.action'
import { redirect } from 'next/navigation';

const TOrderTracker = async ({ id }: { id: string }) => {
    const [, order] = await getOrder(id);
    if (!order?.$id) redirect('/tracking');

    return (
        <OrderTracker order={order} />
    )
}

export default TOrderTracker