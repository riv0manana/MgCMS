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

import { handleAppError, parseStringify } from "@/lib/utils";
import { unstable_cache } from "next/cache";

const {
    WEBDOMAIN = '',
    STORENAME = '',
    PAY_NUMBER = '',
    PAY_NAME = '',
} = process.env;

export const getAppConfig = unstable_cache(async () => {
    'use server'
    try {
        return parseStringify({
            webDomain: WEBDOMAIN,
            paymentNumber: PAY_NUMBER,
            paymentName: PAY_NAME,
            storeName: STORENAME,
        })
    } catch (error) {
        return handleAppError(error);
    };
});