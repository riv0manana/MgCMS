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

export type AgentSelectFilterProps = {
    agents?: Agent[];
    current?: Agent;
    disabled?: boolean;
    onSelect?: (value: string) => void;
}

const AgentSelectFilter = ({
    agents = [],
    current,
    disabled,
    onSelect,
}: AgentSelectFilterProps) => {
    const t = useTranslations('components.atoms.AgentSelectFilter')

    const handleChange = (id: string) => {
        onSelect?.(id);
    }

    return (
        <Select disabled={disabled} value={current?.$id} onValueChange={handleChange}>
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