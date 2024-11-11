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




import { ShoppingCart } from "lucide-react"
import { Button, ButtonProps } from "@/components/ui/button"
import { useBasketStore } from "@/hooks/basket"
import { ReactNode, useEffect, useState } from "react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import useDialog from "@/components/atoms/Dialog/useDialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

type RenderProps = ReturnType<typeof useDialog> & Pick<ReturnType<typeof useBasketStore>, 'items'>;

export type BasketButtonProps = ButtonProps & {
    render?: Render<Omit<BasketButtonProps, 'render'> & RenderProps, ReactNode>
};

const BasketButton = ({
    render,
    ...props
}: BasketButtonProps) => {
    const [length, setLength] = useState(0);
    const dialog = useDialog();

    const { items } = useBasketStore();

    const {
        open, close, change,
    } = dialog;

    useEffect(() => {
        setLength((prev) => {
            if (items.value.length === 0 && prev > 0) {
                dialog.close();
                return 0;
            } else {
                return items.value.length;
            }
        })
    }, [items.value.length, close])

    const t = useTranslations('components.molecules.BasketButton')

    if (render) return render({
        ...props,
        ...dialog,
        items
    })

    return (
        <Sheet open={open} onOpenChange={change}>
            <SheetTrigger asChild>
                <Button {...props} variant="ghost" className={cn("flex h-10", { "gap-2": !!length }, props.className)}>
                    <ShoppingCart className="h-6 w-6 text-main-600" />
                    <span className="font-bold text-main-600">{!!length ? `(${length})` : ''}</span>
                    <span className="sr-only">
                        {t('sr-btn')} {!!length ? `(${length})` : ''}
                    </span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pt-12 pb-6 w-full sm:max-w-full md:max-w-[550px]">
                <SheetHeader>
                    <SheetTitle>
                        <VisuallyHidden.Root>
                            {t('sr-title')}
                        </VisuallyHidden.Root>
                    </SheetTitle>
                    <SheetDescription>
                        <VisuallyHidden.Root>
                            {t('sr-description')}
                        </VisuallyHidden.Root>
                    </SheetDescription>
                </SheetHeader>
                <div className="w-full h-full overflow-y-auto">
                    {props.children}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BasketButton