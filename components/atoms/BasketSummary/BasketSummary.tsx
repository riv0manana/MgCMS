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


import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatAmount } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export type BasketSummaryProps = {
    total: number;
    className?: string;
    children: ReactNode;
    render?: Render<Omit<BasketSummaryProps, 'render'>, ReactNode>
}

const BasketSummary = ({
    total,
    className,
    children,
    render,
}: BasketSummaryProps) => {
    const t = useTranslations('components.atoms.BasketSummary')

    if (render) return render({
        total,
        className,
        children,
    })

    return (
        <Card className={cn("mt-8", className)}>
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl font-bold">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center text-xl font-bold">
                    <span>{t('total')}</span>
                    <span>{formatAmount(total)}</span>
                </div>
            </CardContent>
            <CardFooter>
                {children}
            </CardFooter>
        </Card>
    )
}

export default BasketSummary