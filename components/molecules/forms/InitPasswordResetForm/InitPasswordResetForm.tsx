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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail } from "lucide-react"
import Link from 'next/link'
import {
    Form,
} from "@/components/ui/form"
import Input from '@/components/atoms/Input/Input'
import { initResetForm } from '@/lib/forms'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import useActionToast from '@/hooks/ActionToast'

export type InitPasswordResetFormProps = {
    submit: (email: string) => Promise<ActionResponse<any>>;
}

export default function InitPasswordResetForm({
    submit,
}: InitPasswordResetFormProps) {
    const [isLoading, action] = useTransition();
    const toast = useActionToast()
    const t = useTranslations('components.molecules.InitPasswordResetForm')
    const z = useTranslations('Common.zod');
    const router = useRouter();

    const resetSchema = initResetForm(z);

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
    })

    const onSubmit = ({ email }: z.infer<typeof resetSchema>) => {
        action(async () => {
            const [error, res] = await submit(email);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.success.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                },
                () => router.push('/dashboard/reset/send-link')
            )
        })
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-main-500 hover:text-main-600 transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <CardTitle className="text-2xl font-bold text-center flex-grow">{t('title')}</CardTitle>
                </div>
                <CardDescription className="text-center">
                    {t('description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            control={form.control}
                            type='email'
                            name='email'
                            placeholder={t('form.email.placeholder')}
                            start={<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading || !!Object.keys(form.formState.errors).length ? `${t('form.submit.label')}...` : t('form.submit.label')}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}