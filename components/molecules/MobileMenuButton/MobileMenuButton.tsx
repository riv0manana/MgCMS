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

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import useDialog from "@/components/atoms/Dialog/useDialog"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useCallback, useEffect } from "react"

export type MobileMenuButtonProps = {
    links: MenuLink[];
}

const MobileMenuButton = ({
    links
}: MobileMenuButtonProps) => {
    const { open, close, change } = useDialog();
    const pathname = usePathname();

    const closeDialog = useCallback(close, [close, pathname]);

    useEffect(closeDialog, [closeDialog]);

    return (
        <Sheet open={open} onOpenChange={change}>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4">
                    {links.map((item) => (
                        <Link
                            key={`mob_menu_${item.href}`}
                            href={item.href}
                            className={`text-lg font-medium transition-colors hover:text-foreground/80 ${pathname === item.href ? 'text-foreground' : 'text-foreground/60'
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenuButton