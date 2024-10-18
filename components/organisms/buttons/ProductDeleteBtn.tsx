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

import useDialog from "@/components/atoms/Dialog/useDialog"
import ActionModal from "@/components/molecules/ActionModal"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Trash2 } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTransition } from "react"

export type ProductDeleteBtnProps = {
    submit: (id: string) => Promise<ActionResponse<any>>;
    product: Product;
}

const ProductDeleteBtn = ({
    product,
    submit
}: ProductDeleteBtnProps) => {
    const t = useTranslations('components.organisms.ProductDeleteBtn')
    const [loading, action] = useTransition();
    const { toast } = useToast();

    const dialog = useDialog();

    const runDelete = () => {
        action(async () => {
            const [error, res] = await submit(product.$id!);
            if (error) {
                toast({
                    title: t('toast.error.title'),
                    description: t('toast.error.description'),
                    variant: 'destructive'
                });
            }
            if (res) {
                toast({
                    title: t('toast.success.title'),
                })
                close();
            }
        })
    }
    return (
        <ActionModal
            title={t('dialog.title', { name: product.name })}
            trigger={(
                <Button variant="outline" size="sm" >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
            {...dialog}
        >
            <Button variant="destructive" onClick={runDelete}>
                {loading ? `${t('dialog.confirm')}...` : t('dialog.confirm')}
            </Button>
        </ActionModal>
    )
}

export default ProductDeleteBtn