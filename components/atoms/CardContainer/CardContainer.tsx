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



import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type CardContainerProps = {
  className?: string;
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode;
  render?: Render<Omit<CardContainerProps, 'render'>, ReactNode>
}

const CardContainer = ({
  className,
  title,
  subtitle,
  children,
  render
}: CardContainerProps) => {

  if (render) return render({
    className,
    title,
    subtitle,
    children,
  });

  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {title}
        </CardTitle>
        {subtitle && <CardDescription>
          {subtitle}
        </CardDescription>}
      </CardHeader>
      <div className="p-5">
        {children}
      </div>
    </Card>
  )
}

CardContainer.Content = CardContent;

export default CardContainer