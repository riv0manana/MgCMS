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

type VALUES = ORDER_STATUS | 'All'
export type OrderStatusFilterProps = {
    current?: VALUES;
    onSelect?: (value: VALUES) => void;
    hideAll?: boolean;
}

const OrderStatusFilter = ({
    current,
    onSelect,
    hideAll,
}: OrderStatusFilterProps) => {
    const common = useTranslations('Common.order.status');
    const t = useTranslations('components.atoms.OrderStatusFilter')
    return (
        <Select value={current || ''} onValueChange={(e: VALUES) => onSelect?.(e)}>
            <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                {!hideAll && <SelectItem value="All">{t('all')}</SelectItem>}
                <SelectItem value="PENDING">{common('PENDING')}</SelectItem>
                <SelectItem value="PREPARING">{common('PREPARING')}</SelectItem>
                <SelectItem value="READY">{common('READY')}</SelectItem>
                <SelectItem value="CANCELED">{common('CANCELED')}</SelectItem>
                <SelectItem value="REFUND">{common('REFUND')}</SelectItem>
                <SelectItem value="DELIVERED">{common('DELIVERED')}</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default OrderStatusFilter