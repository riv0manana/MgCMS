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


import { useToast } from "@/hooks/use-toast";

type ToastMsg = {
    title: string;
    description?: string;
    errorTitle: string;
    errorDescription?: string;
}

const useActionToast = () => {
    const { toast } = useToast();

    const runToast = <T>(
        [error, response]: ActionResponse<T>,
        msg: ToastMsg,
        onSuccessCb?: () => void
    ) => {
        if (error) {
            toast({
                title: msg.errorTitle,
                description: msg.errorDescription,
                variant: 'destructive'
            });
        }
        if (response) {
            toast({
                title: msg.title,
                description: msg.description
            })
            onSuccessCb?.();
        }
    }

    return runToast;
}

export default useActionToast