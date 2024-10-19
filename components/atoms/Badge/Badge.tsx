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


import { cn, UiVariant, variants } from '@/lib/utils'

export type BadgeProps = {
    value: string;
    variant: keyof typeof UiVariant;
}
const Badge = ({
    value,
    variant = 'default'
}: BadgeProps) => {
    
    return (
        <div className={cn(`w-fit flex justify-center items-center px-3 rounded-[20px]`, variants(variant))}>
            <p className={`text-[12px] ${variant === 'disabled' ? 'text-gray-700': 'text-white'} font-semibold`}>{value}</p>
        </div>
    )
}

export default Badge