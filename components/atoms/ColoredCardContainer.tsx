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




import { ReactNode } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ColoredCardContainerProps = {
    className?: string;
    title: string;
    children?: ReactNode;
    footer?: ReactNode;
}

const ColoredCardContainer = ({
    className,
    title,
    children,
    footer,
}: ColoredCardContainerProps) => {
    return (
        <Card className={cn("bg-white shadow-lg rounded-lg overflow-hidden md:max-w-2xl mx-auto", className)}>
            <CardHeader className="bg-main-500 text-white p-6">
                <CardTitle className="text-2xl font-bold text-center">
                    {title}
                </CardTitle>
            </CardHeader>
            {children}
            {footer && <CardFooter className="bg-gray-50 p-4">
                {footer}
            </CardFooter>}
        </Card>
    )
}

const Content = (...args: Parameters<typeof CardContent>) => {
    const [{ className, ...props}] = args;
    return <CardContent {...props} className={cn("p-6", className)} />
}

ColoredCardContainer.Content = Content;

export default ColoredCardContainer