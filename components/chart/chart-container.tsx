"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, any>
}

export function ChartContainer({ children, className, ...props }: ChartContainerProps) {
  return (
    <div className={cn("h-[350px] w-full", className)} {...props}>
      {children}
    </div>
  )
}
