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

import { ActionError, handleAppError, parseStringify } from "@/lib/utils"

export const uploadToCloudinary = async (form: FormData) => {
    const cldName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
    const cldPreset = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET || ''

    form.append('upload_preset', cldPreset)

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cldName}/image/upload`, {
            method: 'POST',
            body: form
        });

        if (!res) throw new ActionError('upload_error', 400)

        const json: UploadData = await res.json();
        if (!json) throw new ActionError('upload_error', 404)

        return parseStringify({ ...json, url: json.secure_url });

    } catch (error) {
        return handleAppError(error);
    }
}