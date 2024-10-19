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


import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input as Inp, InputProps as InpProps } from '@/components/ui/input'
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Control, FieldPath, FieldValues, } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export type InputProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
    itemClassName?: string;
    labelClassName?: string;
    formItemClassName?: string;
    formMsgClassName?: string;
    children?: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
} & InpProps;


const Input = <T extends FieldValues>({
    placeholder = '',
    type = 'text',
    control,
    label,
    name,
    className,
    itemClassName,
    labelClassName,
    formMsgClassName,
    children,
    start,
    end,
    hidden,
    ...props
}: InputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn({"hidden": hidden }, itemClassName)}>
                    {label && <FormLabel className={cn(labelClassName)}>{label}</FormLabel>}
                    {children}
                    <FormControl>
                        <div className='relative'>
                            {start}
                            <Inp
                                {...props}
                                {...field}
                                className={cn({"pl-10": !!start}, className)}
                                placeholder={placeholder}
                                type={hidden ? 'hidden' : type}
                            />
                            {end}
                        </div>
                        
                    </FormControl>
                    <FormMessage className={cn(formMsgClassName)} />
                </FormItem>
            )}
        />
    )
}

export const InputArea = <T extends FieldValues>({
    placeholder = '',
    control,
    label,
    name,
    className,
    itemClassName,
    labelClassName,
    formMsgClassName,
    children,
    start
}: InputProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn(itemClassName)}>
                    {label && <FormLabel className={cn(labelClassName)}>{label}</FormLabel>}
                    {children}
                    <FormControl>
                        <div className='relative'>
                            {start}
                            <Textarea
                                {...field}
                                className={cn({"pl-10": !!start}, className)}
                                placeholder={placeholder}
                            />
                        </div>
                    </FormControl>
                    <FormMessage className={cn(formMsgClassName)} />
                </FormItem>
            )}
        />
    )
}

export const CheckBox = <T extends FieldValues>({
    control,
    label,
    name,
    className,
    itemClassName,
    labelClassName,
    formMsgClassName,
    description,
    boxed
}: Omit<InputProps<T>, 'type' | 'placeholder' | 'start'> & { label: string, description?: ReactNode, boxed?: boolean}) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex items-center gap-2", {"border border-slate-300 p-3 rounded-lg": boxed}, itemClassName)}>
                    <FormControl>
                        <Checkbox
                            {...field}
                            className={className}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className={cn('!mt-0')}>
                        {label && <FormLabel className={cn(labelClassName)}>{label}</FormLabel>}
                        {description && <FormDescription>{description}</FormDescription>}
                    </div>
                    <FormMessage className={cn(formMsgClassName)} />
                </FormItem>
            )}
        />
    )
}

export default Input