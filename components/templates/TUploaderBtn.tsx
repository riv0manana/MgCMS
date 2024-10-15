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


import Uploader from '@/components/atoms/Uploader'
import { uploadToCloudinary } from '@/services/actions/cloudinary.action';

export type TUploaderBtnProps = {
    cb?: (url: string) => void;
}

const TUploaderBtn = ({
    cb,
}: TUploaderBtnProps) => {

    return (
        <Uploader callback={cb} submit={uploadToCloudinary} type='image' />
    )
}

export default TUploaderBtn