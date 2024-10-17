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
import { useToast } from "@/hooks/use-toast";

export type BootstrapConfigButtonProps = {
    submit: () => Promise<ActionResponse<any>>;
}

const BootstrapConfigButton = ({
    submit
}: BootstrapConfigButtonProps) => {
    const [loading, action] = useTransition();
    const { toast } = useToast();
    const t = useTranslations('components.molecules.BootstrapConfigButton');

    const runSetup = () => {
        action(async () => {
            const [error, check] = await submit();
            if (error) {
                toast({
                    title: t('toast.error.title'),
                    description: t('toast.error.description'),
                    variant: 'destructive'
                });
            }
            if (check) {
                toast({
                    title: t('toast.success.title'),
                    description: t('toast.success.description')
                })
            }
        }) 
    }

    return (
        <Button
            aria-label="config button"
            onClick={runSetup}
            className="w-full bg-main-500 hover:bg-main-600 text-white"
            disabled={loading}
        >
            {loading ? `${t('inProgress')}...` : t('label')}
        </Button>
    )
}

export default BootstrapConfigButton