import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Scale } from 'lucide-react'

type ChatMessageProps = {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={cn("flex gap-3 mb-4", isUser && "justify-end")}>
      {!isUser && (
        <Avatar>
          <AvatarFallback>
            <Scale className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <Card className={cn(
        "max-w-[85%] shadow-sm",
        isUser ? "bg-primary text-primary-foreground" : "bg-muted"
      )}>
        <CardContent className="p-3 text-sm">
          {message.content}
        </CardContent>
      </Card>
      {isUser && (
        <Avatar>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

