'use client'

import { useState, useEffect, useRef } from 'react'
import LoadingDots from '@/components/LoadingDots'
import Avatar from '@/components/Avatar'
import { Button } from '@/components/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Sidebar } from '@/components/Sidebar'
import { SendHorizontal } from 'lucide-react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type Chat = {
  id: string
  name: string
  messages: Message[]
}

export default function ChatApp() {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChat, setActiveChat] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedChats = localStorage.getItem('chats')
    if (savedChats) {
      setChats(JSON.parse(savedChats))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats))
  }, [chats])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chats, activeChat])

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: 'Nuevo chat',
      messages: []
    }
    setChats([...chats, newChat])
    setActiveChat(newChat.id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading || !activeChat) return

    setIsLoading(true)
    const newMessage: Message = { role: 'user', content: input }
    
    setChats(prevChats => prevChats.map(chat => 
      chat.id === activeChat
        ? { ...chat, messages: [...chat.messages, newMessage] }
        : chat
    ))
    
    setInput('')

    // Simulate response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Esta es una respuesta de prueba del asistente legal.'
      }
      setChats(prevChats => prevChats.map(chat => 
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, assistantMessage] }
          : chat
      ))
      setIsLoading(false)
    }, 2000)
  }

  const activeMessages = chats.find(chat => chat.id === activeChat)?.messages || []

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-black">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChat}
        onDeleteChat={(id) => {
          setChats(chats.filter(chat => chat.id !== id))
          if (activeChat === id) {
            setActiveChat(chats.length > 1 ? chats[0].id : null)
          }
        }}
        onRenameChat={(id, newName) => {
          setChats(chats.map(chat => 
            chat.id === id ? { ...chat, name: newName } : chat
          ))
        }}
      />
      
      <div className="flex flex-col flex-1">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Asistente Legal AI</h1>
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-auto p-4 bg-white dark:bg-black">
          {activeChat ? (
            <>
              {activeMessages.map((message, i) => (
                <div
                  key={i}
                  className={`mb-4 flex items-start ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  } animate-fadeIn`}
                >
                  {message.role === 'assistant' && <Avatar role="assistant" />}
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] mx-2 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && <Avatar role="user" />}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start justify-start mb-4 animate-fadeIn">
                  <Avatar role="assistant" />
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2 mx-2 text-gray-900 dark:text-white shadow-sm">
                    <LoadingDots />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Selecciona un chat o crea uno nuevo para comenzar
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta legal aquí..."
              disabled={!activeChat}
              className="flex-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading || !activeChat}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {isLoading ? (
                <LoadingDots />
              ) : (
                <SendHorizontal className="h-5 w-5" />
              )}
              <span className="sr-only">Enviar</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

