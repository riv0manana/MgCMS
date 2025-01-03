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

import useDialog from "@/components/atoms/Dialog/useDialog"
import ActionModal from "@/components/molecules/ActionModal/ActionModal"
import { Button } from "@/components/ui/button"
import useActionToast from "@/hooks/ActionToast"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTransition } from "react"

export type AgentDeleteBtnProps = {
    submit: (id: string) => Promise<ActionResponse<any>>;
    agent: Agent;
}

const AgentDeleteBtn = ({
    agent,
    submit
}: AgentDeleteBtnProps) => {
    const t = useTranslations('components.organisms.AgentDeleteBtn')
    const [loading, action] = useTransition();
    const toast = useActionToast()

    const dialog = useDialog();

    const runDelete = () => {
        action(async () => {
            const [error, res] = await submit(agent.$id!);
            toast<typeof res>(
                [error, res],
                {
                    title: t('toast.success.title'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                },
                close
            )
        })
    }
    return (
        <ActionModal
            title={t('dialog.title', { name: agent.name })}
            trigger={(
                <Button variant="outline" size="sm" >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
            {...dialog}
        >
            <Button variant="destructive" onClick={runDelete}>
                {loading ? `${t('dialog.confirm')}...` : t('dialog.confirm')}
            </Button>
        </ActionModal>
    )
}

export default AgentDeleteBtn