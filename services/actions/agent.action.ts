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
import { createAdminClient, createSessionClient, dbQuery } from "@/services/appwrite.service"
import { getSessionKey } from "@/services/cookie.service"
import { agentForm } from "@/lib/forms"
import TrackingMG from "@/services/tracking-mg.service"
import { createFilteredAction } from "@/lib/filters"

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

export const getAgents = unstable_cache(createFilteredAction(async (queries: BaseQuery = {}) =>  {
    try {
        const { database } = createAdminClient();
        const { queryAll } = dbQuery<Agent>('agent', database);
        const agents = await queryAll(queries as string[])
        return parseStringify(agents)
    } catch (error) {
        return handleAppError(error);
    }
}), ['agents'], { tags: ["agents"] });

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

export const getAgentPosition = async (agent_id: string) => {
    try {
        if (!agent_id) throw new ActionError('agent_fetch_error', 400);
        const { database } = createAdminClient();

        const { query } = dbQuery<Agent>('agent', database);
        const agent = await query(agent_id);

        if (!agent?.$id) throw new ActionError('agent_fetch_error', 404);

        const res = await TrackingMG.GetPosition(agent.gps_id!);
        if ('status' in res && res.status === 'erreur') throw new ActionError('agent_fetch_error', 404);

        return parseStringify(res as PositionResponse);
    } catch (error) {
        return handleAppError(error);
    }
};