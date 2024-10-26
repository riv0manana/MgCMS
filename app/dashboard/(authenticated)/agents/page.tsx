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


import TAgentTable from "@/components/templates/TAgentTable/TAgentTable";
import { getLoggedInUser } from "@/services/actions/admin.action";
import { redirect } from "next/navigation";

export default async function AdminAgents() {
  const [error] = await getLoggedInUser();
  if (error) redirect('/dashboard');

  return <TAgentTable />;
}
