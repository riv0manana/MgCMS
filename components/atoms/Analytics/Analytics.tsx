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


'use client'
import { Analytics } from '@vercel/analytics/react';

const VercelAnalytics = () => {
  return (
    <Analytics beforeSend={(event) => {
        if (event.url.includes('/dashboard')) {
          return null;
        }
        return event;
      }} />
  )
}

export default VercelAnalytics