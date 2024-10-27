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


'use client'

import { LatLngExpression } from 'leaflet';
import { ReactNode, useEffect } from 'react';

import 'leaflet/dist/leaflet.css';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useMap } from 'react-leaflet';

export type LmapProps = {
    className?: string;
    children?: ReactNode;
    defaultCenter?: LatLngExpression;
}

const MapContainer = dynamic(() => import('react-leaflet').then(({ MapContainer }) => MapContainer), {
    ssr: false,
})

const TileLayer = dynamic(() => import('react-leaflet').then(({ TileLayer }) => TileLayer), {
    ssr: false,
})

type LMapHandlerProps = {
    center?: LatLngExpression,
    zoom?: number;
}

const LMapHandler = ({
    center
}: LMapHandlerProps) => {
    const map = useMap();

    useEffect(() => {
        if (center) map.setView(center);
    }, [center, map])

    return <></>
}

function Lmap({
    defaultCenter = [-18.8756357,47.5166645],
    className,
    children,
}: LmapProps) {
    const mapLatLng = (data: string | LatLngExpression) => {
        if (typeof data === 'string') return JSON.parse(data);
        return data;
    }
    return (
        <MapContainer className={cn('w-full min-h-[300px]', className)} center={mapLatLng(defaultCenter)} zoom={17}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> 
            {children}
        </MapContainer>
    )
}

Lmap.Handler = LMapHandler;

export default Lmap