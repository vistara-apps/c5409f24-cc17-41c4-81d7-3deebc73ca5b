'use client'

import { ReactNode } from 'react'

interface AppShellProps {
  children: ReactNode
  variant?: 'default' | 'glass'
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const baseClasses = "min-h-screen w-full max-w-xl mx-auto px-4 py-6"
  const variantClasses = variant === 'glass' 
    ? "glass-effect" 
    : ""

  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      {children}
    </div>
  )
}
