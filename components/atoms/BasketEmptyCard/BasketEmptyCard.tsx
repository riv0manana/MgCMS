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
import { cn } from "@/lib/utils";

export type BasketEmptyCardProps = {
    phrase?: string;
    className?: string;
}

const BasketEmptyCard = ({
    phrase,
    className,
}: BasketEmptyCardProps) => {
    return (
        <Card className={cn("text-center py-8", className)}>
            <CardContent>
                <p className="text-lg text-gray-600">{phrase}</p>
            </CardContent>
        </Card>
    )
}

export default BasketEmptyCard