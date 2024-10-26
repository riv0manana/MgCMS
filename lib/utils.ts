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


/* MAKE SURE YOU DO NOT IMPORT ANY SERVER RELATED LIBS OR FUNCTIONS HERE */

import { clsx, type ClassValue } from "clsx"
import { DateTime } from "luxon";
import { twMerge } from "tailwind-merge"
import { z } from "zod";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export enum UiVariant {
  'default' = 'bg-slate-600',
  'warning' = 'bg-yellow-500',
  'destructive' = 'bg-red-500',
  'success' = 'bg-green-600',
  'important' = 'bg-blue-500',
  'disabled' = 'bg-gray-400',
}

export const variants = (value: keyof typeof UiVariant) => UiVariant[value];

export const isFormSafe = <T extends z.AnyZodObject>(data: any, form: T) => {
  try {
    const safeForm = form.safeParse(data);
    return safeForm.success;
  } catch {
    return false;
  }
}

export function formatAmount(amount: number, currency = 'Ar'): string {
  return `${amount.toLocaleString('fr-Fr', {
    minimumFractionDigits: 2,
  })} ${currency}`
}

export function formatTransport(type: TRANSPORT_TYPE, t?: any) {
  return t?.(type) || '-';
}

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, ""); 
};

export function getDateTimeStamp(value?: string) {
  if (!value) return;
  const date = DateTime.fromFormat(value, 'yyyy-M-d');
  return date.toMillis()
}

export function getDateFromTimeStamp(value: number) {
  const date = DateTime.fromMillis(value);
  return date.toFormat('d/M/yyyy');
}

export function getReadableDate(value: number) {
  const date = DateTime.fromMillis(value);
  return date.toLocaleString(DateTime.DATE_FULL)
}

export const parsiThing = <T>(data: string | T) => {
  if (typeof data === 'string') return JSON.parse(data) as T;
  return data;
}

export const stringiThing = <T>(data: string | T) => {
  if (typeof data === 'string') return data;
  return JSON.stringify(data);
}

export const isParamMissing = (params: any[]) => params.some((d) => !d);

export const parseModelId = <T>(data: T & { $id?: string }) => data?.$id;

export class ActionError extends Error {
  constructor(message: ActionStatusMsg, code: StatusCode) {
      super(message);
      this.name = 'ActionError';
      this.cause = {
        code,
      }
  }
}

export const parseStringify = <T>(value: T): ActionResponse<T> => [, JSON.parse(JSON.stringify(value))];

export const parseError = (message: ActionStatusMsg, code: StatusCode): ActionResponse<undefined> => {
  const error = {
    message,
    statusCode: code,
    status: code,
  }
  return [error];
}

export const handleAppError = (err: any) => {
  if (err instanceof ActionError) {
    return parseError(err.message as ActionStatusMsg, (err.cause as any)?.code! as StatusCode)
  } else if (err?.response?.message) {
    return parseError(err.response.message as ActionStatusMsg, err.code as StatusCode || 500)
  } else if (err?.message === 'No session') {
    return parseError('user_info_error', 401);
  } else {
    return parseError(err?.message || 'unknow_server_error', err?.code || 500);
  }
}

export const readLS = <T>(key: string) => {
  if (typeof window !== 'undefined') {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return null;
    }
  }
  return null;
}

export const writeLS = <T>(key: string, data: T) => {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch { }
  }
}

export const deepCompareObject = <T>(first?: T, second?: T) => {
  try {
    return JSON.stringify(first) === JSON.stringify(second);
  } catch {
    return false;
  }
}