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



import { DialogContent, DialogHeader, DialogTitle, DialogTrigger, Dialog as UiDialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type DialogProps = {
    title: string;
    children: ReactNode;
    open?: boolean,
    change?: (value: boolean) => void;
    trigger?: ReactNode;
    className?: string;
}

const Dialog = ({
    title,
    children,
    open,
    change,
    trigger,
    className
}: DialogProps) => {
    return (
        <UiDialog modal={false} open={open} onOpenChange={change}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>)
            }
            <DialogContent title={title} aria-describedby={title} onInteractOutside={e => e.preventDefault()} className={cn("sm:max-w-[425px] sm:max-h-[95svh] overflow-y-auto bg-white", className)}>
                <DialogHeader>
                    {title && <DialogTitle>title</DialogTitle>}
                </DialogHeader>
                {children}
            </DialogContent>
        </UiDialog>
    )
}

export default Dialog