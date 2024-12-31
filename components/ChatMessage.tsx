type ChatMessageProps = {
  message: {
    role: 'user' | 'assistant'
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs md:max-w-md p-3 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 border'
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}

