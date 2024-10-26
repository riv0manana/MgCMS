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

import { Button } from "@/components/ui/button"
import { Loader2, LogOut } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTransition } from "react"

export type LogoutButtonProps = {
    onLogout: () => Promise<ActionResponse<any>>;
}

const LogoutButton = ({
    onLogout
}: LogoutButtonProps) => {
    const [loading, action] = useTransition();
    const logout = () => action(() => { onLogout() });
    const t = useTranslations('components.atoms.LogoutButton')

    const Icon = loading ? Loader2 : LogOut;

    return (
        <Button onClick={logout} aria-label={t('logout')} variant="ghost">
            <Icon className="size-5 md:size-8 text-main-600" />
        </Button>
    )
}

export default LogoutButton