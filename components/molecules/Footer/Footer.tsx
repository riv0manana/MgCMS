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
import { Mail, MapPin, Phone } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export type FooterProps = {
    className?: string;
    children?: ReactNode;
    render?: Render<Omit<FooterProps, 'render'>, ReactNode>
}

const Footer = ({render, ...props}: FooterProps) => {
    const t = useTranslations('components.molecules.Footer');

    if (render) return render(props);

    return (
        <footer className={cn("bg-main-600 text-white py-8 px-4", props.className)}>
            <div className="flex flex-col gap-3 items-center justify-center">
                <span className="font-extrabold gest text-2xl">DEMO</span>
                <address className="not-italic mb-4">
                    <p className="flex items-center justify-center mb-2">
                        <MapPin color="white" className="mr-2 h-4 w-4 text-second-600" />
                        {t('address')}
                    </p>
                    <p className="flex items-center justify-center">
                        <Phone color="white" className="mr-2 h-4 w-4 text-second-600" />
                        {t('phone')}
                    </p>
                    <p className="flex items-center justify-center">
                        <Mail color="white" className="mr-2 h-4 w-4 text-second-600" />
                        {t('email')}
                    </p>
                </address>
                <p className="text-sm text-gray-100">
                    {t.rich('copy', {
                        link: (chunk) => (
                            <Link target="_blank" aria-label="Author's link" href={t('copy-link')}>{chunk}</Link>
                        )
                    })}
                </p>
            </div>
            {props.children}
        </footer>
    )
}

export default Footer