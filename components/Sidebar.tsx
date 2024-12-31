import { useState } from 'react'
import { Button } from './Button'
import { PlusCircle, Trash2, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react'

type Chat = {
  id: string
  name: string
}

type SidebarProps = {
  chats: Chat[]
  activeChat: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
  onRenameChat: (id: string, newName: string) => void
}

export function Sidebar({
  chats,
  activeChat,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onRenameChat
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [editingChatId, setEditingChatId] = useState<string | null>(null)

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  const handleRenameChat = (id: string, newName: string) => {
    if (newName.trim()) {
      onRenameChat(id, newName)
    }
    setEditingChatId(null)
  }

  return (
    <div 
      className={`border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Chats</h2>}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto">
        {!isCollapsed && (
          <div className="p-2">
            <Button 
              className="w-full mb-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              onClick={onNewChat}
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Chat
            </Button>
            <div className="space-y-1">
              {chats.map((chat) => (
                <div 
                  key={chat.id} 
                  className="group flex items-center gap-2 rounded-md"
                >
                  {editingChatId === chat.id ? (
                    <input
                      type="text"
                      defaultValue={chat.name}
                      onBlur={(e) => handleRenameChat(chat.id, e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleRenameChat(chat.id, e.currentTarget.value)
                        }
                      }}
                      className="flex-1 bg-transparent border-b border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 px-2 py-1 text-sm text-gray-900 dark:text-white"
                      autoFocus
                    />
                  ) : (
                    <Button
                      variant="ghost"
                      className={`flex-1 justify-start text-left ${
                        activeChat === chat.id 
                          ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={() => onSelectChat(chat.id)}
                      onDoubleClick={() => setEditingChatId(chat.id)}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span className="truncate">{chat.name}</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (window.confirm('¿Estás seguro de que quieres eliminar este chat?')) {
                        onDeleteChat(chat.id)
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

