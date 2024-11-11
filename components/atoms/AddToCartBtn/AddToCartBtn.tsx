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



import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { useBasketStore } from "@/hooks/basket";

export type AddToCartBtnProps = {
    product: Product;
    variant?: Variant;
    onAdd?: (product?: Product) => void;
    className?: string;
    icon: ReactNode
    label?: string;
    render?: Render<Omit<AddToCartBtnProps, 'render'>, ReactNode>;
}

const AddToCartBtn = (props: AddToCartBtnProps) => {
    const { render, ...data } = props;
    const {
        product,
        className,
        variant,
        icon,
        label,
        onAdd,
    } = data;

    const { addToBasket } = useBasketStore();

    const handleAdd = () => {
        addToBasket(product, variant);
        onAdd?.(product)
    }

    if (render) {
        return render({ ...data, onAdd: handleAdd });
    }

    return (
        <Button onClick={handleAdd} className={cn("w-full", className)}>
            {label} {icon}
        </Button>
    )
}

export default AddToCartBtn