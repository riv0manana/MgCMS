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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, Mail, Lock, User2, EyeOff, EyeIcon } from "lucide-react"
import Link from 'next/link'
import {
    Form,
} from "@/components/ui/form"
import Input from '@/components/atoms/Input/Input'
import { userSignUpForm } from '@/lib/forms'
import { useTranslations } from 'next-intl'
import useActionToast from '@/hooks/ActionToast'

export type SignUpFormProps = {
    submit: (data: SignUpParams) => Promise<ActionResponse<UserSession>>;
}

export default function SignUpForm({
    submit,
}: SignUpFormProps) {
    const [show, setShow] = useState(false);
    const [isLoading, action] = useTransition();
    const toast = useActionToast()
    const t = useTranslations('components.molecules.SignUpForm')
    const z = useTranslations('Common.zod')

    const signUpSchema = userSignUpForm(z);

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = (data: z.infer<typeof signUpSchema>) => {
        action(async () => {
            const [error, res] = await submit(data);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.error.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                }
            )
        })
    }

    const tooglePassword = () => setShow(prev => !prev);
    const Eye = show ? EyeOff : EyeIcon;

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
                            type='text'
                            name='name'
                            placeholder={t('form.name.placeholder')}
                            start={<User2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                        />
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
                            end={<Eye onClick={tooglePassword} role='button' aria-label='toggle password' className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" />}
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
                    href="/forgot-password"
                    className="text-sm text-main-600 hover:text-main-700 transition-colors"
                >
                    {t('link.forgot.label')}
                </Link>
            </CardFooter>
        </Card>
    )
}