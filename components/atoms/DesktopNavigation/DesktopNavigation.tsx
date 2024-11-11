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
import Link from "next/link";
import { ReactNode } from "react";

export type DesktopNavigationProps = {
    items: MenuLink[];
    className?: string;
    render?: Render<Omit<DesktopNavigationProps, 'render'>, ReactNode>;
}

const DesktopNavigation = ({
    items,
    className,
    render,
}: DesktopNavigationProps) => {
    if (render) return render({
        items,
        className,
    })
    
    return (
        <nav className={cn("flex items-center space-x-6 text-sm font-medium", className)}>
            {items.map((item) => (
                <Link
                    key={`desk_nav_${item.href}`}
                    href={item.href}
                    className={`transition-colors hover:text-foreground/80`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}

export default DesktopNavigation