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

export type ScrollableSectionProps = {
    className?: string;
    title?: string;
    children: ReactNode;
    render?: Render<Omit<ScrollableSectionProps, 'render'>, ReactNode>
}

const ScrollableSection = ({
    className,
    title,
    children,
    render
}: ScrollableSectionProps) => {
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
            <div className="w-full whitespace-nowrap space-x-2 pb-3 overflow-x-auto snap-mandatory snap-x">
                {children}
            </div>
        </section>
    )
}

export default ScrollableSection