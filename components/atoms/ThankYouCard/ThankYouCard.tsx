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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type ThankYouCardProps = {
    className?: string;
    title: string;
    subtitle?: string;
    children?: ReactNode;
    icon?: ReactNode;
    render?: Render<Omit<ThankYouCardProps, 'render'>, ReactNode>
}

const ThankYouCard = ({
    icon = <CheckCircle className="h-10 w-10 text-main-600" />,
    className,
    title,
    subtitle,
    children,
    render
}: ThankYouCardProps) => {
    if (render) return render({
        icon,
        className,
        title,
        subtitle,
        children,
    })

    return (
        <Card className={cn("text-center mx-auto md:max-w-2xl", className)}>
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-main-100">
                    {icon}
                </div>
                <CardTitle className="text-2xl font-bold text-main-600">{title}</CardTitle>
                {subtitle && <p className="mb-4">{subtitle}</p>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default ThankYouCard