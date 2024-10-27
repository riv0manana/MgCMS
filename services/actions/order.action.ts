'use server'

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

import {  ActionError, handleAppError, isFormSafe, isParamMissing, parseModelId, parseStringify, stringiThing } from "@/lib/utils"
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache"
import { createAdminClient, createSessionClient, dbQuery } from "@/services/appwrite.service"
import { getSessionKey } from "@/services/cookie.service"
import { orderForm } from "@/lib/forms"

export async function createOrder({
    items, amount, reduction, ...data
}: OrderParams) {
    try {
        const form = orderForm()
        if (
            !isFormSafe(data, form) || 
            isParamMissing([items.length, amount ])
        ) throw new ActionError('order_add_error', 400);

        const { database } = createAdminClient();

        // manually validate the total price to avoid price tampering
        const { query } = dbQuery<Product>('product', database);
        const promises = items.map(i => query(i.product.$id!))
        const product_items = await Promise.all(promises);

        const products = items.map(i => {
            const tmp = (product_items || []).find(p => p.$id === i.product.$id);
            return { ...i, product: tmp!}
        })

        let total = products.map(({qte, product: { price }}) => price * qte).reduce((a, b) => a + b, 0);
        if (!!reduction) {
            total -= reduction;
        }
        if (total !== amount) throw new ActionError('fraud_attempt', 401);

        const { addQuery, generateId } = dbQuery<Order>('order', database);
        // make sure to parse only needed data
        const order = await addQuery({
            products: product_items.map(i => parseModelId(i)),
            amount: total,
            reduction,
            orderInfo: stringiThing<OrderInfo[]>(products),
            status: 'PENDING',
            datetime: Date.now(),
            ...data
        } as any, generateId.unique());

        revalidateTag('orders');
        return parseStringify(order);
    } catch (error) {
        console.log(error)
        return handleAppError(error);
    }
}

export async function assignAgent(order_id: string, agent_id: string) {
    try {
        if (isParamMissing([order_id, agent_id])) throw new ActionError('order_edit_error', 400);

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { updateQuery, query } = dbQuery<Order>('order', database);

        const check_order = await query(order_id);
        if (!check_order?.$id) {
            throw new ActionError('fraud_attempt', 401);
        }
        const order = await updateQuery(check_order.$id, { agent: agent_id } as any);

        revalidateTag('orders');
        return parseStringify(order);
    } catch (error) {
        return handleAppError(error);
    }
} 

export async function updateOrder(order_id: string, status: ORDER_STATUS) {
    try {
        if (isParamMissing([order_id])) throw new ActionError('order_edit_error', 400);

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { updateQuery, query } = dbQuery<Order>('order', database);

        const check_order = await query(order_id);
        if (!check_order?.$id) {
            throw new ActionError('fraud_attempt', 401);
        }
        const order = await updateQuery(check_order.$id, { status });

        revalidateTag('orders');
        return parseStringify(order);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function basicOrderPayment(order_id: string, payRef: string) {
    try {
        if (isParamMissing([order_id])) throw new ActionError('order_payment_error', 400);

        const { database } = createAdminClient();
        const { updateQuery, query } = dbQuery<Order>('order', database);

        const check_order = await query(order_id);
        if (!check_order?.$id || !!check_order.payRef) {
            throw new ActionError('fraud_attempt', 401);
        }
        const order = await updateQuery(check_order.$id, { payRef, status: 'PREPARING' });

        revalidateTag('orders');
        revalidatePath(`/orders/${order_id}`);
        return parseStringify(order);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function checkPayRef(payRef: string) {
    try {
        if (isParamMissing([payRef])) throw new ActionError('order_check_ref_error', 400);

        const { database } = createAdminClient();
        const { queryAll, queryBuilder: q } = dbQuery<Order>('order', database);

        const { documents: [check_order]} = await queryAll([
            q.equal('payRef', payRef),
            q.limit(1)
        ]);
        if (!check_order?.$id || !check_order.payRef) {
            throw new ActionError('fraud_attempt', 401);
        }
        return parseStringify({ $id: check_order.$id});
    } catch (error) {
        return handleAppError(error);
    }
}


export const searchOrder = unstable_cache(async ({
    limit = 30,
    offset = 0,
    search = '',
}: BaseQuery = {}) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll, queryBuilder: q } = dbQuery<Order>('order', database);
        const orders = await queryAll([
            q.limit(limit),
            q.offset(offset),
            q.search('orderx', search)
        ])

        return parseStringify(orders)
    } catch (error) {
        return handleAppError(error);
    }
}, ['orders'], { tags: ["orders"]})


export const getOrders = unstable_cache(async ({
    limit = 30,
    offset = 0,
    query = [],
}: BaseQuery = {}) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll, queryBuilder: q } = dbQuery<Order>('order', database);
        const orders = await queryAll([
            q.limit(limit),
            q.offset(offset),
            q.orderDesc('datetime'),
            ...query
        ])
        
        return parseStringify(orders)
    } catch (error) {
        return handleAppError(error);
    }
}, ['orders'], { tags: ["orders"]})

export const getOrder = unstable_cache(async (order_id: string) => {
    try {
        const { database } = createAdminClient();
        const { query } = dbQuery<Order>('order', database);
        const order = await query(order_id)

        return parseStringify(order)
    } catch (error) {
        return handleAppError(error);
    }
}, ['orders'], { tags: ["orders"]})