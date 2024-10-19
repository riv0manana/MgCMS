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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, Lock } from "lucide-react"
import Link from 'next/link'
import {
    Form,
} from "@/components/ui/form"
import Input from '@/components/atoms/Input/Input'
import { userSignInForm } from '@/lib/forms'
import { useTranslations } from 'next-intl'
import useActionToast from '@/hooks/ActionToast'
import { useRouter } from 'next/navigation'

export type LoginFormProps = {
    submit: (data: SignInParams) => Promise<ActionResponse<UserSession>>;
}

export default function LoginForm({
    submit,
}: LoginFormProps) {
    const [isLoading, action] = useTransition();
    const toast = useActionToast();
    const router = useRouter();
    const t = useTranslations('components.molecules.LoginForm')
    const z = useTranslations('Common.zod')

    const loginSchema = userSignInForm(z);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof loginSchema>) => {
        action(async () => {
            const [error, res] = await submit(data);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.success.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                },
                () => router.push('/dashboard/orders')
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
                        <Input
                            control={form.control}
                            type='password'
                            name='password'
                            placeholder={t('form.password.placeholder')}
                            start={<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
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
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <Link
                    href="/dashboard/reset"
                    aria-label={t('link.forgot.label')}
                    className="text-sm text-main-600 hover:text-main-700 transition-colors"
                >
                    {t('link.forgot.label')}
                </Link>
            </CardFooter>
        </Card>
    )
}