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



import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import useActionToast from "@/hooks/ActionToast";

export type BootstrapConfigButtonProps = {
    submit: () => Promise<ActionResponse<any>>;
}

const BootstrapConfigButton = ({
    submit
}: BootstrapConfigButtonProps) => {
    const [loading, action] = useTransition();
    const toast = useActionToast()
    const t = useTranslations('components.molecules.BootstrapConfigButton');

    const runSetup = () => {
        action(async () => {
            const [error, check] = await submit();
            toast<typeof check>(
                [error, check],
                {
                    title: t('toast.success.title'),
                    description: t('toast.success.description'),
                    errorTitle: t('toast.error.title'),
                    errorDescription: t('toast.error.description')
                }
            )
        }) 
    }

    return (
        <Button
            aria-label="config button"
            onClick={runSetup}
            className="w-full"
            disabled={loading}
        >
            {loading ? `${t('inProgress')}...` : t('label')}
        </Button>
    )
}

export default BootstrapConfigButton