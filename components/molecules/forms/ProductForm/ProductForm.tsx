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




import Input, { CheckBox, InputArea } from "@/components/atoms/Input/Input";
import TUploaderBtn from "@/components/templates/TUploaderBtn/TUploaderBtn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useActionToast from "@/hooks/ActionToast";
import { productForm } from "@/lib/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ProductFormProps = {
    submit: (product: Product) => Promise<ActionResponse<Product>>;
    product?: Product;
    callback?: () => void;
}

function ProductForm({ submit, product, callback }: ProductFormProps) {
    const t = useTranslations('components.molecules.ProductForm')
    const z = useTranslations('Common.zod')

    const productSchema = productForm(z);

    const [loading, action] = useTransition()
    const toast = useActionToast()

    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: product ? {
            price: product.price,
            name: product.name,
            sku: product.sku,
            imgUrl: product.imgUrl,
            description: product.description,
            promoted: product.promoted,
        } : undefined,
    })

    const onUploaded = (url: string) => {
        form.setValue("imgUrl", url)
    };

    const onSubmit = (data: z.infer<typeof productSchema>) => {
        action(async () => {
            const [error, res] = await submit({...data, price: Number(data.price), $id: product?.$id!});
            toast<typeof res>(
                [error, res],
                {
                    title: product ? t('toast.edit.success.title') : t('toast.add.success.title'),
                    errorTitle: product ? t('toast.edit.error.title') : t('toast.add.error.title'),
                    errorDescription: t('toast.add.error.description')
                },
                callback
            )
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <Input
                    control={form.control}
                    name="name"
                    placeholder={t('form.name.placeholder')}
                    label={t('form.name.label')}
                />
                <Input
                    control={form.control}
                    name="sku"
                    placeholder={t('form.sku.placeholder')}
                    label={t('form.sku.label')}
                />
                <Input
                    control={form.control}
                    name="price"
                    placeholder={t('form.price.placeholder')}
                    label={t('form.price.label')}
                    type="number"
                />
                <InputArea
                    control={form.control}
                    name="description"
                    placeholder={t('form.description.placeholder')}
                    label={t('form.description.label')}
                />
                <Input control={form.control} name="imgUrl" className="hidden" />
                <TUploaderBtn cb={onUploaded} />
                <CheckBox
                    control={form.control}
                    name="promoted"
                    label={t('form.promoted.label')}
                    description={t('form.promoted.description')}
                    boxed
                />
                <Button disabled={loading || !!Object.keys(form.formState.errors).length} type="submit" className="w-full">
                    { loading || !!Object.keys(form.formState.errors).length ? `${t('form.submit.label')}...` : t('form.submit.label') }
                </Button>
            </form>
        </Form>
    )
}

export default ProductForm;