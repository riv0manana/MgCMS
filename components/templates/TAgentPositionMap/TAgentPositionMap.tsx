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

import AgentPositionMap, { AgentPositionMapProps } from "@/components/molecules/AgentPositionMap/AgentPositionMap"
import { getAgentPosition } from "@/services/actions/agent.action";

export type TAgentPositionMapProps = Omit<AgentPositionMapProps, 'getData'>;

const TAgentPositionMap = (props: TAgentPositionMapProps) => {
    
    return (
        <AgentPositionMap {...props} getData={getAgentPosition} />
    )
}

export default TAgentPositionMap