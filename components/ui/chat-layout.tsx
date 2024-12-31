'use client'

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatLayoutProps {
  children: React.ReactNode
  className?: string
}

export function ChatLayout({ children, className }: ChatLayoutProps) {
  return (
    <Card className={cn("h-[100dvh] rounded-none flex flex-col", className)}>
      {children}
    </Card>
  )
}

ChatLayout.Header = function ChatLayoutHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b px-4 py-3">
      {children}
    </div>
  )
}

ChatLayout.Content = function ChatLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </ScrollArea>
  )
}

ChatLayout.Input = function ChatLayoutInput({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t p-4">
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </div>
  )
}

