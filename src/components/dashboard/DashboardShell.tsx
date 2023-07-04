import { FC } from "react"

import { cn } from "../../lib/utils"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

interface DashboardHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

// https://github.com/shadcn/taxonomy/blob/main/components/shell.tsx
const DashboardShell: FC<DashboardShellProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("grid items-start gap-8", className)} {...props}>
      {children}
    </div>
  )
}

// https://github.com/shadcn/taxonomy/blob/main/components/header.tsx
const DashboardHeader: FC<DashboardHeaderProps> = ({
  heading,
  text,
  children,
}) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children}
    </div>
  )
}

export { DashboardShell, DashboardHeader }
