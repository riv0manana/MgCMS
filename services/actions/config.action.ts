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

import { ActionError, handleAppError, isFormSafe, parseStringify } from "@/lib/utils";
import { revalidatePath, unstable_cache } from "next/cache";
import { collectionQuery, createAdminClient } from "@/services/appwrite";
import { userSignInForm } from "@/lib/forms";
import { cookies } from "next/headers";
import { collections } from "@/services/schemas/appwrite.schema";

const {
    WEBDOMAIN = '',
    STORENAME = '',
    PAY_NUMBER = '',
    PAY_NAME = '',
} = process.env;

export const getAppConfig = unstable_cache(async () => {
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
}, ['config'], { revalidate: 84600 });

export const checkUserSettings = async () => {
    try {
        const { team, user } = createAdminClient();
        const adminUser = await user.list();
        if (!adminUser.total) throw new ActionError('setting_check_failed', 404);
        
        const { teams } = await team.list()
        const hasAdmin = (teams || []).find((t) => t.$id === 'admins');
        if (!hasAdmin) throw new ActionError('setting_check_failed', 404);

        return parseStringify({ check: 'ok' })
    }
    catch (err) {
        return handleAppError(err);
    }
}

export const checkDBSettings = async () => {
    try {
        const { database } = createAdminClient();
        const { queryAll } = collectionQuery(database);
        const list = (await queryAll())?.collections
            .map(c => c.$id);
        if (
            !list.includes('order') ||
            !list.includes('product')
        ) throw new ActionError('setting_check_failed', 404);

        return parseStringify({ check: 'ok' })
    }
    catch (err) {
        return handleAppError(err);
    }
}

export const bootstrapAdmin = async (data: SignUpParams) => {
    try {
        const form = userSignInForm();
        if (!isFormSafe(data, form)) throw new ActionError('seeting_bootstrap_failed', 400);

        const { account, team, generateId } = createAdminClient();

        /* Create admin team */
        const adminTeam = await team.create('admins', 'Administrators');
        if (!adminTeam.$id) throw new ActionError('seeting_bootstrap_failed', 401);

        const { email, password, name } = data;

        /* create the account */
        const newAdmin = await account.create(generateId.unique(), email, password, name);
        if (!newAdmin.$id) throw new ActionError('seeting_bootstrap_failed', 401);

        /* add to admin team */
        await team.createMembership('admins', [], email, newAdmin.$id);

        const session = await account.createEmailPasswordSession(email, password);
        cookies().set("x-mgcms", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        revalidatePath('/dashboard');
        return parseStringify(session as unknown as UserSession);
    } catch (err) {
        console.log(err)
        return handleAppError(err);
    }
}

export const bootstrapDB = async () => {
    try {
        const { database} = createAdminClient();

        /* Create collections*/
        const { newCollection, setAttributes } = collectionQuery(database);

        /* create collection */
        const Collections = (collections
            .map(({key, name}) => newCollection(key, name))
        );
        const res_collections = await Promise.all(Collections);
        if (!res_collections.length) throw new ActionError('seeting_bootstrap_failed', 500);

        for (let i = 0; i < collections.length; i++) {
            const { key, schema} = collections[i];
            const res = await setAttributes(key, schema);
            if (!res?.length) throw new ActionError('seeting_bootstrap_failed', 500);
        }

        // setup done
        revalidatePath('/dashboard');
        return parseStringify({ check: 'ok' });
    }
    catch (err) {
        console.log('SETTING FAILED', err);
        return handleAppError(err);
    }
}