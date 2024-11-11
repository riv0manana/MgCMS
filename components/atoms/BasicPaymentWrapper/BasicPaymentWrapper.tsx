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



import { cn, formatAmount } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export type BasicPaymentWrapperProps = {
    children: ReactNode;
    order: Order;
    className?: string;
    name: string;
    phone: string;
    phrase?: string;
    render?: Render<Omit<BasicPaymentWrapperProps, 'render'>, ReactNode>
}

const BasicPaymentWrapper = ({
    children,
    order,
    className,
    name,
    phone,
    phrase,
    render
}: BasicPaymentWrapperProps) => {
    const t = useTranslations('components.atoms.BasicPaymentWrapper')
    const defaultPhrase = phrase || t('phrase', { amount: formatAmount(order.amount) });

    if (render) {
        return render({
            children,
            order,
            className,
            name,
            phone,
            phrase: defaultPhrase,
        })
    }

    return (
        <div className={cn("space-y-4", className)}>
            <p className="font-semibold text-black text-center">{defaultPhrase}</p>
            <div className="flex justify-between">
                <span className="text-second-600">{t('num')}</span>
                <span className="font-bold text-main-600">{phone}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-second-600">{t('name')}</span>
                <span className="font-bold text-main-600">{name}</span>
            </div>
            {children}
        </div>
    )
}

export default BasicPaymentWrapper