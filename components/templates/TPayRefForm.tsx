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



import { checkPayRef } from "@/services/actions/order.action"
import PayRefForm, { PayRefFormProps } from "@/components/molecules/forms/PayRefForm"

export type TPayRefFormProps = Omit<PayRefFormProps, 'submit'>

const TPayRefForm = (props: TPayRefFormProps) => {
  return (
    <PayRefForm {...props} submit={checkPayRef} />
  )
}

export default TPayRefForm