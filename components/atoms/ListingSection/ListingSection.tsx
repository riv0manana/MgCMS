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




import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type ListingSectionProps = {
    className?: string;
    title?: string;
    children: ReactNode;
    render?: Render<Omit<ListingSectionProps, 'render'>, ReactNode>
}

const ListingSection = ({
    className,
    title,
    children,
    render
}: ListingSectionProps) => {
    if (render) return render({
        className,
        title,
        children,
    })
    return (
        <section className={cn("mb-12 space-y-8", className)}>
            {title && (
                <h2 className="text-2xl font-semibold text-main-600 mb-6">{title}</h2>
            )}
            {children}
        </section>
    )
}

export default ListingSection