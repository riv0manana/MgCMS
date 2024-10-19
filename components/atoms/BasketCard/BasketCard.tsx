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



import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatAmount } from "@/lib/utils";

export type BasketCardProps = {
    onIncrement?: (id: string) => void;
    onDecrement?: (id: string) => void;
    onRemove?: (item: OrderInfo) => void;
    item: OrderInfo;
}

const BasketCard = ({
    onDecrement,
    onIncrement,
    onRemove,
    item,
}: BasketCardProps) => {
    return (
        <Card key={`basket_${item.product.$id}_idx`} className="mb-4">
            <CardContent className="flex flex-col gap-2 p-4">
                <div className="flex gap-3">
                    <Image width={300} height={300} src={item.product.imgUrl} alt={item.product.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                    <div className="flex-grow">
                        <h3 className="text-lg font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">{formatAmount(item.product.price)}</p>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onDecrement?.(item.product.$id!)}
                        className="h-8 w-8 rounded-full"
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-lg">
                        {item.qte}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => onIncrement?.(item.product.$id!)}
                        className="h-8 w-8 rounded-full"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemove?.(item)}
                        className="ml-2 text-red-500 hover:text-red-700"
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default BasketCard