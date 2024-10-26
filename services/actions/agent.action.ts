'use server'

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

import {  ActionError, handleAppError, isFormSafe, parseStringify } from "@/lib/utils"
import { revalidateTag, unstable_cache } from "next/cache"
import { createAdminClient, createSessionClient, dbQuery } from "@/services/appwrite"
import { getSessionKey } from "@/services/cookie"
import { agentForm } from "@/lib/forms"

export async function addAgent(agent: AgentFormParams) {
    try {
        const form = agentForm()
        if (!isFormSafe(agent, form)) throw new ActionError('agent_add_error', 400);

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { addQuery, generateId } = dbQuery<Agent>('agent', database);

        const newAgent = await addQuery(agent, generateId.unique());

        revalidateTag("agents");
        return parseStringify(newAgent);
    } catch (error) {
        console.log(error)
        return handleAppError(error);
    }
}

export async function editAgent({$id, ...data}: AgentFormParams) {
    try {
        const form = agentForm()
        if (!$id || !isFormSafe(data, form)) throw new ActionError('agent_edit_error', 400);

        const sessionKey = getSessionKey();
        const { database } = createSessionClient(sessionKey);
        const { updateQuery } = dbQuery<Agent>('agent', database);
        const agent = await updateQuery($id!, data);

        revalidateTag("agents");
        return parseStringify(agent);
    } catch (error) {
        return handleAppError(error);
    }
}

export async function deleteAgent (agent_id: string) {
    try {
        const sessionKey = getSessionKey()
        const { database } = createSessionClient(sessionKey);
        const { deleteQuery } = dbQuery<Agent>('agent', database);
        await deleteQuery(agent_id);

        revalidateTag("agents")
        return parseStringify({status: 'ok'})
    } catch (error) {
        return handleAppError(error);
    }
}

export const searchAgents = unstable_cache(async ({
    limit = 100,
    offset = 0,
    search = '',
}: BaseQuery) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll, queryBuilder: q } = dbQuery<Agent>('agent', database);
        const agents = await queryAll([
            q.limit(limit),
            q.offset(offset),
            q.search('agentx', search)
        ])

        return parseStringify(agents)
    } catch (error) {
        return handleAppError(error);
    }
}, ['agents'], { tags: ["agents"] });


export const getAgents = unstable_cache(async ({
    limit = 100,
    offset = 0,
    query = [],
}: BaseQuery = {}) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll, queryBuilder: q } = dbQuery<Agent>('agent', database);
        const agents = await queryAll([
            q.limit(limit),
            q.offset(offset),
            ...query
        ])
        return parseStringify(agents)
    } catch (error) {
        return handleAppError(error);
    }
}, ['agents'], { tags: ["agents"] });

export const getAgent = unstable_cache(async (agent_id: string) => {
    try {
        const { database } = createAdminClient();
        const { query } = dbQuery<Agent>('agent', database);
        const agent = await query(agent_id)

        return parseStringify(agent)
    } catch (error) {
        return handleAppError(error);
    }
}, ['agents'], { tags: ["agents"] })