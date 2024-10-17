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

import BootstrapConfigButton from "@/components/molecules/BootstrapConfigButton"
import { bootstrapDB } from "@/services/actions/config.action"


const TBootstrapConfigButton = () => {
  return (
    <BootstrapConfigButton submit={bootstrapDB} />
  )
}

export default TBootstrapConfigButton