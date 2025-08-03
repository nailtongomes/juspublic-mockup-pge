import React, { useState } from 'react'
import { procuradores } from '../../data/mockData'

interface TeamChatProps {
  onClose: () => void
}

interface ChatMessage {
  id: string
  author: string
  message: string
  timestamp: string
  type: 'message' | 'system'
}

const TeamChat: React.FC<TeamChatProps> = ({ onClose }) => {
  const [newMessage, setNewMessage] = useState<string>('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      author: 'Sistema',
      message: 'Chat da equipe iniciado',
      timestamp: new Date().toISOString(),
      type: 'system'
    },
    {
      id: '2', 
      author: 'Dra. Maria Fernanda Costa',
      message: 'Bom dia pessoal! Alguém pode me ajudar com a análise do processo de licitação da SEOSP?',
      timestamp: '2024-01-22T09:15:00',
      type: 'message'
    },
    {
      id: '3',
      author: 'Dr. João Pedro Oliveira', 
      message: 'Bom dia Maria! Posso ajudar sim. Qual é a dúvida específica?',
      timestamp: '2024-01-22T09:17:00',
      type: 'message'
    },
    {
      id: '4',
      author: 'Dra. Ana Beatriz Rocha',
      message: 'Pessoal, o parecer sobre a lei estadual 15.234/2023 está quase pronto. Alguém pode dar uma revisada?',
      timestamp: '2024-01-22T10:30:00', 
      type: 'message'
    }
  ])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      author: 'Dr. Carlos Silva Santos', // Usuário atual
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'message'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simular resposta automática
    setTimeout(() => {
      const responses = [
        "Ótima pergunta! Vou verificar aqui.",
        "Posso ajudar com isso. Me manda mais detalhes?",
        "Já passei por caso similar. Te mando o precedente.",
        "Perfeito! Vou dar uma olhada agora.",
        "Concordo. Podemos marcar uma reunião para discutir?"
      ]
      
      const randomProcurador = procuradores[Math.floor(Math.random() * procuradores.length)]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        author: randomProcurador.nome,
        message: randomResponse,
        timestamp: new Date().toISOString(),
        type: 'message'
      }
      
      setMessages(prev => [...prev, response])
    }, 2000)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const getAuthorInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2)
  }

  const getAuthorColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
      'bg-yellow-500', 'bg-indigo-500', 'bg-pink-500', 'bg-teal-500'
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 h-[80vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">💬</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Chat da Equipe</h3>
              <p className="text-sm text-gray-600">
                {procuradores.filter(p => p.ativo).length} procuradores online
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Equipe Online */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Online:</span>
            <div className="flex space-x-2">
              {procuradores.filter(p => p.ativo).map(procurador => (
                <div key={procurador.id} className="flex items-center space-x-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAuthorColor(procurador.nome)}`}>
                    {getAuthorInitials(procurador.nome)}
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.author === 'Dr. Carlos Silva Santos' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md ${message.type === 'system' ? 'w-full' : ''}`}>
                {message.type === 'system' ? (
                  <div className="text-center">
                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {message.message}
                    </span>
                  </div>
                ) : (
                  <div className={`rounded-lg px-4 py-2 ${
                    message.author === 'Dr. Carlos Silva Santos' 
                      ? 'bg-pge-blue text-white' 
                      : 'bg-gray-200 text-gray-800'
                  }`}>
                    {message.author !== 'Dr. Carlos Silva Santos' && (
                      <div className="flex items-center space-x-2 mb-1">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-medium ${getAuthorColor(message.author)}`}>
                          {getAuthorInitials(message.author)}
                        </div>
                        <span className="text-xs font-medium">{message.author}</span>
                      </div>
                    )}
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.author === 'Dr. Carlos Silva Santos' 
                        ? 'text-blue-200' 
                        : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input de Mensagem */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-pge-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
            <span>Pressione Enter para enviar</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Todos online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeamChat