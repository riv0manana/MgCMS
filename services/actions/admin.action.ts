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

import { cookies } from "next/headers"
import { ActionError, handleAppError, isFormSafe, parseStringify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { createAdminClient, createSessionClient, dbQuery } from "@/services/appwrite"
import { redirect } from "next/navigation"
import { cache } from "react"
import { getSessionKey } from "@/services/cookie"
import { initResetForm, resetPasswordForm } from "@/lib/forms"

const domain = process.env.WEBDOMAIN || '';

export const signIn = async ({email, password}: SignInParams) => {
    try {
        const { account } = createAdminClient();
        const user = await account.createEmailPasswordSession(email, password);
        if (!user?.$id) throw new ActionError('user_loggin_error', 401);

        cookies().set("x-mgcms", user.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        revalidatePath('/dashboard');
        return parseStringify(user as unknown as UserSession);
    } catch (error) {
        return handleAppError(error);
    }
}

export const getLoggedInUser = cache(async () => {
    try {
        const sessionKey = getSessionKey()
        const { account } = createSessionClient(sessionKey);
        const user = await account.get();
        if (!user?.$id) throw new ActionError('user_info_error', 401);

        revalidatePath('/dashboard');
        return parseStringify(user);
    } catch (error) {
        revalidatePath('/dashboard');
        return handleAppError(error);
    }
})


export async function changeUserPassword({ oldPassword, password}: ChangePasswordParams) {
    try {
        const sessionKey = getSessionKey()
        const { account } = createSessionClient(sessionKey);
        const user_data = await account.updatePassword(password, oldPassword);

        return parseStringify(user_data);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function initPasswordReset(email: string) {
    try {
        const form = initResetForm();
        if (!isFormSafe({ email}, form)) throw new ActionError('user_init_reset_error', 400);

        const url = `https://${domain}/dashboard/reset/password`;
        const { account } = createAdminClient();
        const res = await account.createRecovery(email, url)

        if (!res.$id) throw new ActionError('user_init_reset_error', 401);
        return parseStringify({ status: 'ok' });
    } catch (error) {
        return handleAppError(error);
    }
}

export async function validateResetPassword(data: ValidateResetParams) {
    try {
        const form = resetPasswordForm();
        if (!isFormSafe(data, form)) throw new ActionError('user_check_reset_error', 400);
        const { id, password, secret } = data;

        const { account } = createAdminClient();
        const res = await account.updateRecovery(id, secret, password);

        if (!res.$id) throw new ActionError('user_check_reset_error', 401);
        return parseStringify({ status: 'ok' });
    } catch (error) {
        return handleAppError(error);
    }
}

export async function signUpAdminUser({ name, password, email}: SignUpParams) {
    try {
        const sessionKey = getSessionKey()
        const { team: userTeam } = createSessionClient(sessionKey);
        const admin = (await userTeam.list()).teams.find((t) => t.$id === 'admins');
        if (!admin?.$id) throw new ActionError('user_add_error', 401);


        const { account, team, database} = createAdminClient();
        const { generateId } = dbQuery('', database);

        const new_user = await account.create(generateId.unique(), email, password, name);
        if (!new_user?.$id) throw new ActionError('user_add_error', 400)

        team.createMembership('administrator', [], new_user.email, new_user.$id);

        revalidatePath('/dashboard');
        return parseStringify(new_user);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function accountLogout() {
    try {
        const sessionKey = getSessionKey()
        const { account } = createSessionClient(sessionKey);
        cookies().delete('x-mgcms')
        await account.deleteSessions()

        revalidatePath('/dashboard');
    } catch (error) {
        return handleAppError(error);
    }
    redirect('/');
}