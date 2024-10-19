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

import TProductAddButton from "@/components/templates/TProductAddButton/TProductAddButton";
import TProductDeleteBtn from "@/components/templates/TProductDeleteBtn/TProductDeleteBtn";
import TProductEditButton from "@/components/templates/TProductEditButton/TProductEditButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export type ProductTableProps = {
    products?: Product[];
}

const ProductTable = ({
    products = [],
}: ProductTableProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const t = useTranslations('components.organisms.ProductTable');


    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl font-bold">{t('title')}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <Input
                            placeholder={t('search.placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mr-2"
                        />
                        <Button variant="outline" size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                    <TProductAddButton />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.img')}</TableHead>
                                <TableHead>{t('table.name')}</TableHead>
                                <TableHead>{t('table.description')}</TableHead>
                                <TableHead>{t('table.price')}</TableHead>
                                <TableHead>{t('table.action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.$id}>
                                    <TableCell>
                                        <Image
                                            width={100} height={100}
                                            src={product.imgUrl} alt={product.name}
                                            className="w-12 h-12 object-cover rounded"
                                            loading="lazy"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <TProductEditButton product={product} />
                                            <TProductDeleteBtn product={product} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductTable