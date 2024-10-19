'use client';

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




import { useBasketStore } from "@/hooks/basket";
import { useEffect, useState } from "react";
import BasketCard from "@/components/atoms/BasketCard/BasketCard";
import BasketSummary from "@/components/atoms/BasketSummary/BasketSummary";
import BasketEmptyCard from "@/components/atoms/BasketEmptyCard/BasketEmptyCard";
import { cn } from "@/lib/utils";
import TOrderForm from "@/components/templates/TOrderForm/TOrderForm";
import { useTranslations } from "next-intl";

export type OrderBasketProps = {
    className?: string;
}

const OrderBasket = ({
    className,
}: OrderBasketProps) => {
    const t = useTranslations('components.molecules.OrderBasket')

    const [basketItems, setBasketItems] = useState<OrderInfo[]>([]);
    const {
        items,
        removeFromBasket,
        increment,
        decrement,
        total,
        resetBasket
    } = useBasketStore();

    useEffect(() => {
        setBasketItems(items.value);
    }, [items.value])

    return (
        <div className={cn("py-8", className)}>
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-bold text-main-600 mb-8 text-center">{t('title')}</h3>
                {basketItems.length === 0
                    ? <BasketEmptyCard phrase={t('empty.phrase')} />
                    : (
                        <>
                            {basketItems.map((item, idx) => (
                                <BasketCard
                                    item={item} key={`basket_${item.product.$id}_${idx}`}
                                    onDecrement={decrement}
                                    onIncrement={increment}
                                    onRemove={removeFromBasket}
                                />
                            ))}
                            <BasketSummary total={total.value}>
                                <TOrderForm callback={resetBasket} items={basketItems} total={total.value} />
                            </BasketSummary>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default OrderBasket