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
import { useEffect, useState } from "react"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import useDialog from "@/components/atoms/Dialog/useDialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export type BasketButtonProps = ButtonProps;

const BasketButton = ({
    className,
    children,
    ...props
}: BasketButtonProps) => {
    const [length, setLength] = useState(0);
    const { open, change, close } = useDialog();

    const { items } = useBasketStore()

    useEffect(() => {
        setLength((prev) => {
            if (items.value.length === 0 && prev > 0) {
                close();
                return 0;
            } else {
                return items.value.length;
            }
        })
    }, [items.value.length, close])

    const t = useTranslations('components.molecules.BasketButton')

    return (
        <Sheet open={open} onOpenChange={change}>
            <SheetTrigger asChild>
                <Button {...props} variant="ghost" className={cn("flex", { "gap-2": !!length }, className)}>
                    <ShoppingCart className="h-8 w-8 text-main-600" />
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
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default BasketButton