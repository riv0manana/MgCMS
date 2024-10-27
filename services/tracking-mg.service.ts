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


const TrackingMGKey = process.env.TRACKING_MG_KEY || '';

const headers = {
    'Content-Yype': 'application/json',
    'API-KEY': TrackingMGKey,
};

type NearestParams = {
    latitude: number;
    longitude: number;
    imeiExcludes?: string[];
}

type ErrorResponse = {
    status: 'erreur'
}

const request = async <T>(path: string, options?: RequestInit) => {
    return fetch(`https://api.tracking.mg/ws/Device${path}`, {
        headers,
        ...options
    });
}

export default class TrackingMG {
    private static CanIUse = () => {
        return !!TrackingMGKey;
    }

    static GetPosition = async (gps_id: string) => {
            if (!TrackingMG.CanIUse()) throw new Error('Not authorized');

            return request(`/PositionByImei/${gps_id}`, { method: 'GET' })
                .then(res => res.json())
                .then(res => res as PositionResponse | ErrorResponse)
    }

    static GetNearestAgent = async (data: NearestParams) => {
            if (!TrackingMG.CanIUse()) throw new Error('Not authorized');

            return request(`/Nearest`, {
                method: 'POST',
                body: JSON.stringify(data)
            })
    }
}