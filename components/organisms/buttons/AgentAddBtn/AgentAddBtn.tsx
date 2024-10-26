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

import Dialog from "@/components/atoms/Dialog/Dialog"
import useDialog from "@/components/atoms/Dialog/useDialog"
import AgentForm, { AgentFormProps } from "@/components/molecules/forms/AgentForm/AgentForm"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"

export type AgentAddBtnProps = Omit<AgentFormProps, 'agent' | 'callback'>

const AgentAddBtn = (props: AgentAddBtnProps) => {
    const t = useTranslations('components.organisms.AgentAddBtn')
    const { close, change, open } = useDialog();
    return (
        <Dialog
            title={t('dialog.title')}
            trigger={(
                <Button>
                    <Plus className="mr-2 h-4 w-4" /> {t('label')}
                </Button>
            )}
            open={open}
            change={change}
        >
            <AgentForm {...props} callback={close} />
        </Dialog>
    )
}

export default AgentAddBtn