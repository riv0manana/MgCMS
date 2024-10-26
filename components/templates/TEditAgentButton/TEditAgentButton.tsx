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

import AgentEditBtn, { AgentEditBtnProps } from "@/components/organisms/buttons/AgentEditBtn/AgentEditBtn";
import { editAgent } from "@/services/actions/agent.action";

export type TAgentEditButtonProps = Omit<AgentEditBtnProps, 'submit'>

const TAgentEditButton = (props: TAgentEditButtonProps) => {
    return (
        <AgentEditBtn {...props} submit={editAgent} />
    )
}

export default TAgentEditButton