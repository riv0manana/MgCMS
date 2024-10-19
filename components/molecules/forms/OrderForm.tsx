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




import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import Input, { InputArea } from '@/components/atoms/Input'
import { orderForm } from '@/lib/forms'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import useActionToast from '@/hooks/ActionToast'

export type OrderFormProps = {
    submit: (data: OrderParams) => Promise<ActionResponse<Order>>;
    items: OrderInfo[];
    total: number;
    callback?: (id?: string) => void;
}

export default function OrderForm({
    submit,
    items,
    total,
    callback,
}: OrderFormProps) {
    const [isLoading, action] = useTransition();
    const router = useRouter()
    const toast = useActionToast()
    const t = useTranslations('components.molecules.OrderForm');
    const z = useTranslations('Common.zod')

    const orderSchema = orderForm(z);

    const form = useForm<z.infer<typeof orderSchema>>({
        resolver: zodResolver(orderSchema),
    })

    const onSubmit = (data: z.infer<typeof orderSchema>) => {
        action(async () => {
            const [error, res] = await submit({
                ...data,
                items,
                amount: total,
            });
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.error.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                },
                () => {
                    callback?.(res?.$id);
                    router.push(`/orders/${res?.$id}`);
                }
            )
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <Input
                    label={t('form.clientName.label')}
                    control={form.control}
                    type='text'
                    name='clientName'
                    placeholder={t('form.clientName.placeholder')}
                />
                <Input
                    label={t('form.clientNumber.label')}
                    control={form.control}
                    type='text'
                    name='clientNumber'
                    placeholder={t('form.clientNumber.placeholder')}
                />
                <Input
                    label={t('form.clientAddress.label')}
                    control={form.control}
                    type='text'
                    name='clientAddress'
                    placeholder={t('form.clientAddress.placeholder')}
                />
                <InputArea
                    label={t('form.details.label')}
                    control={form.control}
                    name="details"
                    placeholder={t('form.details.placeholder')}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? `${t('form.submit.label')}...` : t('form.submit.label')}
                </Button>
            </form>
        </Form>
    )
}