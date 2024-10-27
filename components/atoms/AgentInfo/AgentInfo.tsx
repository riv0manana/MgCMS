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

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export type AgentInfoProps = {
    agent?: Agent;
    className?: string;
    children?: ReactNode;
}

const AgentInfo = ({
    agent,
    className,
    children
}: AgentInfoProps) => {
    const t = useTranslations('components.atoms.AgentInfo')
    if (!agent) return null;
    
    return (
        <div className={cn('w-full max-w-[300px] space-y-4', className)}>
            <h3 className="text-lg text-center font-bold">{t('title')}</h3>
            <div className="flex justify-between gap-3">
                <span className="text-sm">Noms</span>
                <span className="text-sm font-semibold">{agent.name}</span>
            </div>
            <div className="flex justify-between gap-3">
                <span className="text-sm">N°</span>
                <span className="text-sm font-semibold">{agent.phone}</span>
            </div>
            {children}
        </div>
    )
}

export default AgentInfo