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

import Lmap from "@/components/atoms/Lmap/Lmap";
import { LatLngExpression } from "leaflet";
import { useCallback, useEffect, useState, useTransition } from "react";

export type AgentPositionMapProps = {
    agent?: Agent;
    className?: string;
    getData: (id: string) => Promise<ActionResponse<PositionResponse>>;
};

const AgentPositionMap = ({
    agent,
    className,
    getData,
}: AgentPositionMapProps) => {
    const [, action] = useTransition();
    const [position, setPosition] = useState<LatLngExpression>();

    const getPosition = useCallback(() => {
        action(async () => {
            const [, data] = await getData(agent?.$id!);
            if (data) {
                setPosition([data.latitude, data.longitude]);
            }
        })
    }, [agent?.$id, getData])

    useEffect(() => {
        getPosition();
        const int = setInterval(() => {
            if (agent?.$id) getPosition();
        }, 10000);
        return () => {
            clearInterval(int);
        }
    }, [agent?.$id, getPosition]);

    if (!agent?.gps_id) return null;

    return (
        <Lmap defaultCenter={position} className={className}>
            <Lmap.Handler center={position} />
        </Lmap>
    )
}

export default AgentPositionMap