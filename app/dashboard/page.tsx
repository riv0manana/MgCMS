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

import TLoginForm from '@/components/templates/TLoginForm';
import TOrderTable from '@/components/templates/TOrderTable';
import { getLoggedInUser } from '@/services/actions/admin.action'
import { checkUserSettings } from '@/services/actions/config.action';
import { redirect } from 'next/navigation';
import React from 'react'

const AdminPage = async () => {
    const [hasError] = await checkUserSettings();
    if (hasError?.message) redirect('/dashboard/setup');
    
    const [error, data] = await getLoggedInUser();

    return data && !error
        ? <TOrderTable />
        : <TLoginForm />
}

export default AdminPage