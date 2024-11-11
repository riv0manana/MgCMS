'use client'

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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export type AgentSelectFilterProps = {
    agents?: Agent[];
    current?: Agent;
    disabled?: boolean;
    onSelect?: (value: string) => void;
    render?: Render<Omit<AgentSelectFilterProps, 'render'>, ReactNode>;
}

const AgentSelectFilter = ({
    agents = [],
    current,
    disabled,
    onSelect,
    render,
}: AgentSelectFilterProps) => {
    const t = useTranslations('components.atoms.AgentSelectFilter')

    if (render) {
        return render({
            agents,
            current,
            disabled,
            onSelect,
        })
    }

    return (
        <Select disabled={disabled} value={current?.$id} onValueChange={onSelect}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t('placeholder')} />
            </SelectTrigger>
            <SelectContent>
                {agents.map((agent) => (
                    <SelectItem key={agent.$id} value={agent.$id!}>{agent.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default AgentSelectFilter