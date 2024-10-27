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



import AgentSelectFilter, { AgentSelectFilterProps } from "@/components/atoms/AgentSelectFilter/AgentSelectFilter"
import useActionToast from "@/hooks/ActionToast";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

export type OrderAssignAgentProps = Omit<AgentSelectFilterProps, 'onSelect' | 'current'> & {
    order: Order;
    submit: (order_id: string, agent_id: string) => Promise<ActionResponse<Order>>;
}

const OrderAssignAgent = ({
    order,
    disabled,
    submit,
    ...props
}: OrderAssignAgentProps) => {
    const t = useTranslations('components.molecules.OrderAssignAgent');
    const [loading, action] = useTransition();
    const toast = useActionToast();

    const runAssign = (id: string) => {
        action(async () => {
            const [error, res] = await submit(order.$id!, id);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.success.title'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                }
            )
        })
    }

    return (
        <AgentSelectFilter
            {...props}
            current={order.agent}
            disabled={loading || disabled}
            onSelect={(e) => runAssign(e)}
        />
    )
}

export default OrderAssignAgent