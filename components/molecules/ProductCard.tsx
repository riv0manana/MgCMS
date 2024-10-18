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



import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatAmount } from "@/lib/utils";
import { ReactNode } from "react";
import Image from "next/image";
import AddToCartBtn from "@/components/atoms/AddToCartBtn";

export type ProductCardProps = {
    product: Product;
    children: ReactNode;
    className?: string;
    disableHover?: boolean;
    isLCP?: boolean;
}


const ProductCard = ({
    product,
    className,
    children,
    disableHover,
    isLCP
}: ProductCardProps) => {
    const {
        $id,
        name,
        description,
        price,
        imgUrl
    } = product;

    
    let img = imgUrl.includes('cloudinary') && imgUrl.includes('/upload')
        ?  imgUrl.replace('/upload', '/upload/c_fill,g_auto,h_169,w_300')
        : imgUrl

    return (
        <Card key={$id} className={cn(
            "overflow-hidden inline-block transition-transform duration-300 w-full sm:max-w-[312px]",
            { "hover:scale-105": !disableHover },
            { "snap-center w-[calc(100%_-_40px)]": disableHover }
            , className
        )}>
            <div className="relative">
                <Image
                    src={imgUrl} alt={name}
                    className="w-full h-48 object-cover"
                    width={312}
                    height={200}
                    priority={isLCP}
                    loading={!isLCP ? "lazy" : undefined}
                />
                <div className="absolute top-0 right-0 bg-main-700 text-white px-2 py-1 rounded-bl-lg">
                    {formatAmount(price)}
                </div>
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">{name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <CardDescription className="text-sm font-semibold truncate text-second-600">{description}</CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
                {children}
            </CardFooter>
        </Card>
    )
}

ProductCard.AddToBasketBtn = AddToCartBtn

export default ProductCard