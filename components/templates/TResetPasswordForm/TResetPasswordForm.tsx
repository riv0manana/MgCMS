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


import ResetPasswordForm, { ResetPasswordFormProps } from '@/components/molecules/forms/ResetPasswordForm/ResetPasswordForm'
import { validateResetPassword } from '@/services/actions/admin.action'

export type TResetPasswordFormProps = Omit<ResetPasswordFormProps, 'submit'> & BaseQuery

const TResetPasswordForm = (props: TResetPasswordFormProps) => {
  return (
    <ResetPasswordForm {...props} submit={validateResetPassword} />
  )
}

export default TResetPasswordForm