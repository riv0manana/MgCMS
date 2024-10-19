'use client';

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

import CardContainer from "@/components/atoms/CardContainer/CardContainer"
import OrderStatusFilter from "@/components/atoms/OrderStatusFilter/OrderStatusFilter"
import OrderStatusBadge from "@/components/molecules/OrderStatusBadge/OrderStatusBadge";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useActionToast from "@/hooks/ActionToast";
import { formatAmount, getReadableDate } from "@/lib/utils"
import { Loader2, Search } from "lucide-react"
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react"

export type OrderTableProps = {
    items?: Order[];
    updateStatus: (order_id: string, status: ORDER_STATUS) => Promise<ActionResponse<Order>>
}

const OrderTable = ({
    items = [],
    updateStatus,
}: OrderTableProps) => {
    const t = useTranslations('components.organisms.OrderTable');
    const [loading, action] = useTransition();
    const [filterStatus, setFilterStatus] = useState<ORDER_STATUS | 'All'>("All")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const toast = useActionToast()

    const updateOrderStatus = (orderId: string, newStatus: ORDER_STATUS) => {
        action(async () => {
            const [error, res] = await updateStatus(orderId, newStatus);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.error.title'),
                    errorTitle: t('toast.error.title'),
                }
            )
        })
    }

    return (
        <CardContainer
            title={t('title')}
            subtitle={loading ? <Loader2 /> : undefined}
        >
            <CardContainer.Content>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex items-center w-full md:w-auto">
                        <Input
                            placeholder={t('search.placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mr-2"
                        />
                        <Button variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-2 w-full md:w-auto">
                        <OrderStatusFilter current={filterStatus} onSelect={setFilterStatus} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.phone')}</TableHead>
                                <TableHead>{t('table.payRef')}</TableHead>
                                <TableHead>{t('table.clientName')}</TableHead>
                                <TableHead>{t('table.details')}</TableHead>
                                <TableHead>{t('table.total')}</TableHead>
                                <TableHead>{t('table.status')}</TableHead>
                                <TableHead>{t('table.date')}</TableHead>
                                <TableHead>{t('table.action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((order) => (
                                <TableRow key={order.$id!}>
                                    <TableCell>{order.clientNumber}</TableCell>
                                    <TableCell>{order.payRef || 'N/A'}</TableCell>
                                    <TableCell>{order.clientName}</TableCell>
                                    <TableCell>{order.details || 'N/A'}</TableCell>
                                    <TableCell>{formatAmount(order.amount)}</TableCell>
                                    <TableCell>
                                        <OrderStatusBadge order={order} />
                                    </TableCell>
                                    <TableCell>{getReadableDate(order.datetime!)}</TableCell>
                                    <TableCell>
                                        <OrderStatusFilter hideAll current={order.status} onSelect={(val) => updateOrderStatus(order.$id!, val as any)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContainer.Content>
        </CardContainer>
    )
}

export default OrderTable