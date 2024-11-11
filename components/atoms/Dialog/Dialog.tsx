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



import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Dialog as UiDialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Root } from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

export type DialogProps = {
    title: string;
    children: ReactNode;
    open?: boolean,
    show?: () => void;
    close?: () => void;
    change?: (value: boolean) => void;
    trigger?: ReactNode;
    className?: string;
    render?: Render<Omit<DialogProps, 'render'>, ReactNode>;
}

const Dialog = ({
    title,
    children,
    open,
    change,
    trigger,
    className,
    render,
}: DialogProps) => {
    if (render) return render({
        title,
        children,
        open,
        change,
        trigger,
        className,
    })
    return (
        <UiDialog modal={false} open={open} onOpenChange={change}>
            {trigger && (
                <DialogTrigger asChild>
                    {trigger}
                </DialogTrigger>)
            }
            <DialogContent title={title} onInteractOutside={e => e.preventDefault()} className={cn("sm:max-w-[425px] sm:max-h-[95svh] overflow-y-auto bg-white", className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        <Root>{title}</Root>
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </UiDialog>
    )
}

export default Dialog