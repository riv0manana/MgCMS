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

import { deepCompareObject, readLS, writeLS } from '@/lib/utils';
import { computed, effect, signal} from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';

const basket = signal<OrderInfo[]>(readLS<OrderInfo[]>('basket') || []);

const total = computed(() => {
    return basket.value.map(p => p.product.price * p.qte).reduce((a, b) => a + b, 0);
})

const orderedList = computed(() => {
    return basket.value.sort((a, b) => a.product.price - b.product.price)
})

effect(()=> {
    writeLS<OrderInfo[]>('basket', orderedList.value);
});

export const useBasketStore = () => {
    useSignals();
    const increment = ($id: string) => {
        const product = basket.value.find(p => p.product.$id === $id);
        if (!product) return;

        product.qte++;
        basket.value = [...basket.value.filter(p => p.product.$id !== $id), product]
    }

    const decrement = ($id: string) => {
        const product = basket.value.find(p => p.product.$id === $id);
        if (!product || product.qte === 1) return;

        product.qte--;
        basket.value = [...basket.value.filter(p => p.product.$id !== $id), product]
    }

    const addToBasket = (product: Product, variant?: Variant) => {
        const tmp = basket.value.find(
            p => p.product.$id === product.$id && deepCompareObject(variant, p.variant)
        );
        if (tmp) {
            increment(product.$id!);
            return;
        }
        basket.value = [
            ...basket.value,
            {
                product,
                qte: 1,
            }
        ]
    }

    const removeFromBasket = (item: OrderInfo) => {
        basket.value = basket.value.filter(
            p => !deepCompareObject(p, item)
        )
    }

    const resetBasket = () => basket.value = [];

    return {
        addToBasket,
        removeFromBasket,
        increment,
        decrement,
        total,
        items: orderedList,
        resetBasket,
    }
}