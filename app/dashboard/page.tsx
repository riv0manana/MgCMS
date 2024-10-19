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

import TLoginForm from '@/components/templates/TLoginForm/TLoginForm';
import { getLoggedInUser } from '@/services/actions/admin.action'
import { checkUserSettings } from '@/services/actions/config.action';
import { redirect } from 'next/navigation';

const LoginPage = async () => {
    const [hasError] = await checkUserSettings();
    if (hasError?.message) redirect('/dashboard/setup');

    const [, data] = await getLoggedInUser();
    if (data?.$id) redirect('/dashboard/orders');

    return (
        <main className="min-h-screen bg-gradient-to-b from-second-50 to-main-50 flex items-center justify-center p-4">
            <TLoginForm />
        </main>
    )
}

export default LoginPage