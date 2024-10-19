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


import Link from 'next/link'
import { ReactNode } from 'react'

export default function Header({ children }: { children?: ReactNode }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container gap-2 flex h-16 items-center justify-between">
                <Link aria-label='Go to home page' href="/" className="flex items-center space-x-2">
                    <span className="font-extrabold gest text-2xl text-main-700">DEMO</span>
                </Link>
                <div className="flex items-center justify-end gap-2">
                    {children}
                </div>
            </div>
        </header>
    )
}