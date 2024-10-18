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

import Dialog, { DialogProps } from "@/components/atoms/Dialog/Dialog"
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type ActionModalProps = DialogProps & {
    title?: string;
    onConfirm?: () => void;
}

const ActionModal = ({
    children,
    trigger,
    title,
    change,
    open,
    close,
    className,
    onConfirm
}: ActionModalProps) => {
    const t = useTranslations('components.molecules.ActionModal')
    return (
        <Dialog
            title={title}
            trigger={trigger}
            open={open}
            change={change}
            className={className}
        >
            <div className="flex p-5 gap-4 border-input justify-around">
                {!children && onConfirm
                    ? (
                        <Button variant="destructive" onClick={() => onConfirm?.()}>
                            {t('defaultLabel')}
                        </Button>
                    )
                    : children
                }
                <Button onClick={close} variant="outline">
                    {t('cancel')}
                </Button>
            </div>
        </Dialog >
    )
}

export default ActionModal