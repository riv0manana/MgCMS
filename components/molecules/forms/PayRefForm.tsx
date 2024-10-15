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
import Input from '@/components/atoms/Input'
import { payRefForm } from '@/lib/forms'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { cp } from 'fs'
import { useTranslations } from 'next-intl'

export type PayRefFormProps = {
    submit: (payRef: string) => Promise<ActionResponse<{ $id: string }>>;
}

export default function PayRefForm({
    submit,
}: PayRefFormProps) {
    const [loading, action] = useTransition();
    const { toast } = useToast()
    const t = useTranslations('components.molecules.PayRefForm')
    const z = useTranslations('Common.zod')

    const router = useRouter();

    const payRefSchema = payRefForm(z);

    const form = useForm<z.infer<typeof payRefSchema>>({
        resolver: zodResolver(payRefSchema),
    })

    const onSubmit = (data: z.infer<typeof payRefSchema>) => {
        action(async () => {
            const [error, res] = await submit(data.payRef);
            if (error) {
                toast({
                    title: t('toast.error.title'),
                    description: t('toast.error.description'),
                    variant: 'destructive'
                });
            }
            if (res?.$id) {
                toast({
                    title: t('toast.success.title'),
                    description: t('toast.success.description'),
                })
                router.push(`/tracking/${res.$id}`)
            }
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                <Input
                    label={t('form.payRef.label')}
                    control={form.control}
                    type='text'
                    name='payRef'
                    placeholder={t('form.payRef.placeholder')}
                />
                <Button
                    type="submit"
                    className="w-full bg-main-500 hover:bg-main-600 text-white"
                    disabled={loading}
                >
                    {loading ? `${t('form.submit.label')}...` : t('form.submit.label')}
                </Button>
            </form>
        </Form>
    )
}