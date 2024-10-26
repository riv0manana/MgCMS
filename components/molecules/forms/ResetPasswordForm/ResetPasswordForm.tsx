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


import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, EyeIcon, EyeOff, Mail } from "lucide-react"
import Link from 'next/link'
import {
    Form,
} from "@/components/ui/form"
import Input from '@/components/atoms/Input/Input'
import { resetPasswordForm } from '@/lib/forms'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import useActionToast from '@/hooks/ActionToast'

export type ResetPasswordFormProps = {
    userId?: string;
    secret?: string;
    submit: (email: ValidateResetParams) => Promise<ActionResponse<any>>;
}

export default function ResetPasswordForm({
    submit,
    userId = '',
    secret = '',
}: ResetPasswordFormProps) {
    const [show, setShow] = useState(false);
    const [isLoading, action] = useTransition();
    const toast = useActionToast();
    const t = useTranslations('components.molecules.ResetPasswordForm')
    const z = useTranslations('Common.zod');
    const router = useRouter();

    const resetSchema = resetPasswordForm(z);

    const form = useForm<z.infer<typeof resetSchema>>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            userId,
            secret,
        }
    })

    const onSubmit = (data: z.infer<typeof resetSchema>) => {
        action(async () => {
            const [err, res] = await submit(data);
            toast<typeof res>(
                [err, res],
                {
                    title: t('toast.success.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                },
                () => router.push('/dashboard')
            )
        })
    }

    const tooglePassword = () => setShow(prev => !prev);
    const Eye = show ? EyeOff : EyeIcon;

    return (
        <Card className="w-full max-w-md">
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <Link aria-label='Home' href="/" className="text-main-500 hover:text-main-600 transition-colors">
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
                            type={show ? 'text' : 'password'}
                            name='password'
                            placeholder={t('form.password.placeholder')}
                            start={<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                            end={<Eye onClick={tooglePassword} role='button' aria-label='toggle password' className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />}
                        />
                        <Input
                            control={form.control}
                            name='userId'
                            hidden
                        />
                        <Input
                            control={form.control}
                            name='secret'
                            hidden
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