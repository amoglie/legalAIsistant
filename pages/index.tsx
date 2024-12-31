import { useState } from 'react'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage: Message = { role: 'user', content: message }
    setMessages(prev => [...prev, newMessage])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: 'Esta es una respuesta simulada del asistente legal.'
      }
      setMessages(prev => [...prev, assistantMessage])
    }, 1000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#4F46E5', 
        color: 'white', 
        padding: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
          Asistente Legal AI
        </h1>
      </header>

      {/* Chat Area */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto', 
        padding: '1rem',
        backgroundColor: 'white'
      }}>
        {messages.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: '#666',
            marginTop: '2rem' 
          }}>
            ¿En qué puedo ayudarte hoy?
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '1rem'
              }}
            >
              <div
                style={{
                  backgroundColor: msg.role === 'user' ? '#4F46E5' : '#F3F4F6',
                  color: msg.role === 'user' ? 'white' : 'black',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  maxWidth: '80%'
                }}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Input Area */}
      <footer style={{
        borderTop: '1px solid #E5E7EB',
        padding: '1rem',
        backgroundColor: 'white'
      }}>
        <form 
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            gap: '0.5rem',
            maxWidth: '768px',
            margin: '0 auto'
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu consulta legal aquí..."
            style={{
              flex: 1,
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid #D1D5DB',
              fontSize: '0.875rem'
            }}
          />
          <button
            type="submit"
            disabled={!message.trim()}
            style={{
              backgroundColor: '#4F46E5',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              border: 'none',
              fontSize: '0.875rem',
              cursor: 'pointer',
              opacity: !message.trim() ? '0.5' : '1'
            }}
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  )
}

