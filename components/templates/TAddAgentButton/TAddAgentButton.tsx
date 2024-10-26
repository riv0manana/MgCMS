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


import AgentAddBtn from "@/components/organisms/buttons/AgentAddBtn/AgentAddBtn";
import { addAgent } from "@/services/actions/agent.action";

const TAgentAddButton = () => {
    return (
        <AgentAddBtn submit={addAgent} />
    )
}

export default TAgentAddButton