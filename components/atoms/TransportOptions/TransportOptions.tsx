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

const TransportOptions = () => {
    const t = useTranslations('Common.transport.type');
    const options: { label: string, value: TRANSPORT_TYPE }[] = [
        { label: t('MOTO'), value: 'MOTO' },
        { label: t('BICYCLE'), value: 'BICYCLE' },
        { label: t('CAR'), value: 'CAR' },
        { label: t('HEAVY'), value: 'HEAVY' },
    ]
    return (
        <>
            {options.map(({ label, value }, idx) => (
                <SelectItem key={`inp_select_${value}_${idx}`} value={value}>{label}</SelectItem>
            ))}
        </>
    )
}

export default TransportOptions