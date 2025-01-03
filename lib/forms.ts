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


import { z } from "zod";

// XSS protection regex
const xssRegex = /<.*?(script|on\w+|style|iframe|form|img|src|href|data|expression|alert).*?>|<\/.*?(script|iframe).*?>/gi;

/**
 * Check XSS patern
 */
const isXSSSafe = (input?: string): boolean => {
    return !input ? true : !xssRegex.test(input);
};

const safeString = (str: z.ZodString, t?: any) => str
    .refine(isXSSSafe, { message: t?.('xss') })

const safeOptionalString = (str: z.ZodOptional<z.ZodString>, t?: any) => str
    .refine(isXSSSafe, { message: t?.('xss') })

const zodString = (t?: any) => z.string({
    required_error: t?.('required')
})

const zodOptionalString = () => z.string().optional();

const zodPassword = (t?: any) => safeString(zodString(t)
    .regex(/^.{8,}$/, { message: t?.('password.minus', { min: 8 }) })
    .regex(/.*[a-z].*/, { message: t?.('password.minus') })
    .regex(/.*[A-Z].*/, { message: t?.('password.capital') })
    .regex(/.*\d.*/, { message: t?.('password.number') })
    .regex(/.*[@$!%*?&].*/, {
        message: t?.('password.special')
    }),
    t);

const zodPhone = (t?: any) => safeString(zodString(t)
    .regex(/^0\d{9}$/, { message: t?.('phone') }), t);

export const userSignInForm = (t?: any) => z.object({
    email: safeString(zodString(t)
        .email(t?.('email')), t),
    password: zodPassword(t),
})

export const userSignUpForm = (t?: any) => userSignInForm(t).extend({
    name: safeString(z.string(), t),
})

export const userChangePassForm = (t?: any) => z.object({
    old_password: zodPassword(t),
    new_password: zodPassword(t),
    new_password_check: zodPassword(t),
}).refine(
    (pass) => pass.new_password === pass.new_password_check,
    t('password.not-match')
);

export const initResetForm = (t?: any) => z.object({
    email: safeString(zodString(t)
        .email(t?.('email')), t),
})

export const resetPasswordForm = (t?: any) => z.object({
    password: zodPassword(t),
    userId: safeString(zodString(t)),
    secret: safeString(zodString(t)),
});


export const productForm = (t?: any) => z.object({
    name: safeString(zodString(t), t),
    sku: safeString(zodString(t), t),
    description: safeString(zodString(t), t),
    imgUrl: safeString(zodString(t), t)
        .refine(
            (input) => input.includes('https://'),
            { message: t?.('url') }
        ),
    price: z.coerce
        .number({ message: t?.('NaN') })
        .min(t?.('min', { min: 1 })),
    promoted: z.coerce.boolean().optional(),
    estimation: z.coerce.number().optional().transform(v => v === 0 ? undefined : v),
    preparation: z.coerce.number().optional().transform(v => v === 0 ? undefined : v),
})


export const orderForm = (t?: any) => z.object({
    clientNumber: zodPhone(t),
    clientName: safeString(zodString(t), t),
    clientAddress: safeString(zodString(t), t),
    details: safeOptionalString(zodOptionalString(), t),
})

export const payRefForm = (t?: any) => z.object({
    payRef: safeString(zodString(t), t),
})

export const agentForm = (t?: any) => z.object({
    name: safeString(zodString(t), t),
    address: safeString(zodString(t), t),
    phone: zodPhone(t),
    transport: safeString(zodString(t)).transform(v => v as TRANSPORT_TYPE),
    gps_id: safeOptionalString(zodOptionalString(), t),
})