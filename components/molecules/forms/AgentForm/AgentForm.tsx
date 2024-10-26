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

import Input, { InputSelect } from "@/components/atoms/Input/Input";
import TransportOptions from "@/components/atoms/TransportOptions/TransportOptions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useActionToast from "@/hooks/ActionToast";
import { agentForm } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AgentFormProps = {
    submit: (data: AgentFormParams) => Promise<ActionResponse<Agent>>;
    agent?: Agent;
    callback?: () => void;
}

function AgentForm({ submit, agent, callback }: AgentFormProps) {
    const t = useTranslations('components.molecules.AgentForm')
    const z = useTranslations('Common.zod')

    const agentSchema = agentForm(z);

    const [loading, action] = useTransition()
    const toast = useActionToast()

    const form = useForm<z.infer<typeof agentSchema>>({
        resolver: zodResolver(agentSchema),
        defaultValues: agent ? {
            address: agent.address,
            gps_id: agent.gps_id || '',
            name: agent.name,
            phone: agent.phone,
            transport: agent.transport,
        } : { transport: 'MOTO' },
    })

    const onSubmit = (data: z.infer<typeof agentSchema>) => {
        action(async () => {
            const [error, res] = await submit({...data, $id: agent?.$id});
            toast<typeof res>(
                [error, res],
                {
                    title: agent ? t('toast.edit.success.title') : t('toast.add.success.title'),
                    errorTitle: agent ? t('toast.edit.error.title') : t('toast.add.error.title'),
                    errorDescription: t('toast.add.error.description')
                },
                callback
            )
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    control={form.control}
                    name="name"
                    placeholder={t('form.name.placeholder')}
                    label={t('form.name.label')}
                />
                <Input
                    control={form.control}
                    name="phone"
                    placeholder={t('form.phone.placeholder')}
                    label={t('form.phone.label')}
                    type="tel"
                />
                <Input
                    control={form.control}
                    name="address"
                    placeholder={t('form.address.placeholder')}
                    label={t('form.address.label')}
                />
                <InputSelect
                    control={form.control}
                    name="transport"
                    options={<TransportOptions />}
                    placeholder={t('form.transport.placeholder')}
                    label={t('form.transport.label')}
                />
                <Input
                    control={form.control}
                    name="gps_id"
                    placeholder={t('form.gps_id.placeholder')}
                    label={t('form.gps_id.label')}
                />
                <Button disabled={loading || !!Object.keys(form.formState.errors).length} type="submit" className="w-full">
                    { loading ? `${t('form.submit.label')}...` : t('form.submit.label') }
                </Button>
            </form>
        </Form>
    )
}

export default AgentForm;