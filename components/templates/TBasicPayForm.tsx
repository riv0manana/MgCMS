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



import BasicPayForm, { BasicPayFormProps } from "@/components/molecules/forms/BasicPayForm"
import { basicOrderPayment } from "@/services/actions/order.action"

export type TBasicPayFormProps = Omit<BasicPayFormProps, 'submit'>

const TBasicPayForm = (props: TBasicPayFormProps) => {
  return (
    <BasicPayForm {...props} submit={basicOrderPayment} />
  )
}

export default TBasicPayForm