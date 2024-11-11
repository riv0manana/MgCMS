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




import { cn, formatAmount, parsiThing } from "@/lib/utils";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

type RenderProps = {
    done?: boolean;
    estimation?: number
    items?: OrderInfo[];
}

export type ShortOrderDetailsProps = {
    className?: string;
    order: Order;
    title?: string;
    hideBtn?: boolean;
    render?: Render<Omit<ShortOrderDetailsProps, 'render'> & RenderProps, ReactNode>
}

const ShortOrderDetails = ({
    className,
    order,
    title,
    hideBtn,
    render,
}: ShortOrderDetailsProps) => {
    const t = useTranslations('components.atoms.ShortOrderDetails')
    const items = parsiThing(order.orderInfo);
    const { status } = order;
    const estimation = items
        .map((p) => (p.product.estimation || 30) + (p.product.preparation || 0))
        .reduce((a, b) => a + b, 0);

    const done = status === 'CANCELED' || status === 'REFUND' || status === 'DELIVERED';

    if (render) return render({
        className,
        order,
        title,
        hideBtn,
        items,
        done,
        estimation
    })

    return (
        <div className={cn("bg-main-100 rounded-lg p-4 mb-4", className)}>
            <h2 className="text-lg font-semibold mb-2">{title || t('title')}</h2>
            <p className="mb-2">{t('subtitle', { id: order.$id })}</p>
            <ul className="list-inside mb-2 list-none">
                {items.map(({ qte, product: { $id, price, name } }, idx) => (
                    <li key={`${$id}_i_${idx}`}>
                        {idx + 1} - {qte} x {name} - {formatAmount(price * qte)}
                    </li>
                ))}
            </ul>
            <p className="font-semibold mb-4">Total: {formatAmount(order.amount)}</p>
            {!done && <div className="flex justify-center space-x-4">
                <div className="flex items-center">
                    <Clock className="h-5 w-5 text-main-500 mr-2" />
                    <span>{t('resume.estimation', { value: estimation })}</span>
                </div>
            </div>}
            <div className={cn("flex justify-center space-x-4 pt-4", { "hidden": hideBtn })}>
                <Link href={`/tracking/${order.$id}`} aria-label="Tracking Link">
                    <Button>
                        {t('links.track')}
                    </Button>
                </Link>
                <Link href="/" aria-label="Go to Home">
                    <Button variant="outline">
                        {t('links.home')}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ShortOrderDetails