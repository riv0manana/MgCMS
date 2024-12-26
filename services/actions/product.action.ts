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

import {  ActionError, handleAppError, isParamMissing, parseStringify } from "@/lib/utils"
import { revalidateTag, unstable_cache } from "next/cache"
import { createAdminClient, createSessionClient, dbQuery } from "@/services/appwrite.service"
import { getSessionKey } from "@/services/cookie.service"
import { createFilteredAction } from "@/lib/filters"

export async function addProduct(data: Omit<Product, 'slug'>) {
    try {
        const { name, price, imgUrl } = data;
        if (isParamMissing([name, price, imgUrl])) throw new ActionError('product_add_error', 400);

        const slug = name.replaceAll(' ', '-').toLowerCase();

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { addQuery, generateId } = dbQuery<Product>('product', database);

        const product = await addQuery({...data, slug }, generateId.unique());

        revalidateTag("products");
        return parseStringify(product);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function editProduct({$id, ...data}: Product) {
    try {
        if (isParamMissing([$id])) throw new ActionError('product_edit_error', 400);

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { updateQuery } = dbQuery<Product>('product', database);
        const product = await updateQuery($id!, data);

        revalidateTag("products");
        return parseStringify(product);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function deleteProduct (product_id: string) {
    try {
        const sessionKey = getSessionKey()
        const { database } = createSessionClient(sessionKey);
        const { deleteQuery } = dbQuery<Product>('product', database);
        await deleteQuery(product_id);

        revalidateTag("products")
        return parseStringify({status: 'ok'})
    } catch (error) {
        return handleAppError(error);
    }
}

export const getProducts = unstable_cache(createFilteredAction(async (queries: QueryParam = {}) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll } = dbQuery<Product>('product', database);
        const products = await queryAll(queries as string[]);
        return parseStringify(products)
    } catch (error) {
        return handleAppError(error);
    }
}), ['products'], { tags: ["products"] });

export const getProduct = unstable_cache(async (product_id: string) => {
    try {
        const { database } = createAdminClient();
        const { query } = dbQuery<Product>('product', database);
        const product = await query(product_id)

        return parseStringify(product)
    } catch (error) {
        console.log(error)
        return handleAppError(error);
    }
}, ['products'], { tags: ["products"] })