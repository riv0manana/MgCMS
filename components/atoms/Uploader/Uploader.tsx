'use client';

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


import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChangeEventHandler, ReactNode, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import useActionToast from "@/hooks/ActionToast";

export type UploaderProps = {
  type?: 'image' | 'video' | 'document';
  className?: string;
  children?: ReactNode;
  submit: (form: FormData) => Promise<ActionResponse<UploadData>>
  callback?: (url: string) => void;
}

const Uploader = ({
  type = 'image',
  className,
  submit,
  callback,
}: UploaderProps) => {
  const t = useTranslations('components.atoms.Uploader');

  const [loading, action] = useTransition();
  const [img, setImg] = useState<string>();
  const toast = useActionToast()


  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    action(async () => {
      const uri = URL.createObjectURL(file);
      setImg(uri);
      const [error, res] = await submit(formData);
      toast<typeof res>(
        [error, res],
        {
          title: t('toast.success.title'),
          errorTitle: t('toast.error.title'),
          errorDescription: t('toast.error.description')
        },
        () => callback?.(res?.url!)
      )
    });
  }

  return (
    <div className={cn('w-full space-y-3', className)}>
      <label htmlFor="cld-uploader">
        <Button disabled={loading} type='button' className='w-full flex gap-3 items-center pointer-events-none'>
          <Upload />
          {loading ? t('loading') : t('label')}
        </Button>
      </label>
      <input onChange={handleChange} id="cld-uploader" type="file" className="hidden" />
      {img && !loading && type === 'image' && <Image alt="uploaded image" src={img} className="w-10 h-auto" width={100} height={100} />}
    </div>
  )
}

export default Uploader