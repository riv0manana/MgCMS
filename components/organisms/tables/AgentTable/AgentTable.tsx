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

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatTransport } from "@/lib/utils";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import TAgentDeleteBtn from "@/components/templates/TAgentDeleteBtn";
import TAgentEditButton from "@/components/templates/TEditAgentButton/TEditAgentButton";
import { useState } from "react";
import TAgentAddButton from "@/components/templates/TAddAgentButton/TAddAgentButton";

export type AgentTableProps = {
    agents?: Agent[];
}

const AgentTable = ({
    agents = [],
}: AgentTableProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.phone.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const t = useTranslations('components.organisms.AgentTable');
    const tr = useTranslations('Common.transport.type');

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
                    <TAgentAddButton />
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('table.name')}</TableHead>
                                <TableHead>{t('table.phone')}</TableHead>
                                <TableHead>{t('table.address')}</TableHead>
                                <TableHead>{t('table.transport')}</TableHead>
                                <TableHead>{t('table.gps_id')}</TableHead>
                                <TableHead>{t('table.action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredAgents.map((agent) => (
                                <TableRow key={agent.$id}>
                                    <TableCell className="font-medium">{agent.name}</TableCell>
                                    <TableCell>{agent.phone}</TableCell>
                                    <TableCell>{agent.address}</TableCell>
                                    <TableCell>{formatTransport(agent.transport, tr)}</TableCell>
                                    <TableHead>{agent.gps_id || '-'}</TableHead>
                                    <TableCell>
                                        <div className="flex space-x-2">
                                            <TAgentEditButton agent={agent} />
                                            <TAgentDeleteBtn agent={agent} />
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

export default AgentTable