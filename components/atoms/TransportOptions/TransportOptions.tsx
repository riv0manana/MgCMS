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

import { useTranslations } from "next-intl";
import { SelectItem } from "@/components/ui/select";
import { ReactNode } from "react";

type TransportType = { label: string, value: TRANSPORT_TYPE };
type RenderProps = {
    options: TransportType[];
}

export type TransportOptionsProps = {
    render?: Render<Omit<TransportOptionsProps, 'render'> & RenderProps, ReactNode>
}

const TransportOptions = ({
    render,
    ...props
}: TransportOptionsProps) => {
    const t = useTranslations('Common.transport.type');
    const options: TransportType[] = [
        { label: t('MOTO'), value: 'MOTO' },
        { label: t('BICYCLE'), value: 'BICYCLE' },
        { label: t('CAR'), value: 'CAR' },
        { label: t('HEAVY'), value: 'HEAVY' },
    ]

    if (render) return render({...props, options });

    return (
        <>
            {options.map(({ label, value }, idx) => (
                <SelectItem key={`inp_select_${value}_${idx}`} value={value}>{label}</SelectItem>
            ))}
        </>
    )
}

export default TransportOptions