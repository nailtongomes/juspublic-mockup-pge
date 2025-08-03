import React from 'react'
import { processosMock } from '../../data/mockData'

const StatsCards: React.FC = () => {
  const stats = {
    total: processosMock.length,
    recebidos: processosMock.filter(p => p.status === 'Recebido').length,
    emAnalise: processosMock.filter(p => p.status === 'Em Análise').length,
    aguardandoAssinatura: processosMock.filter(p => p.status === 'Aguardando Assinatura').length,
    finalizados: processosMock.filter(p => p.status === 'Finalizado').length,
    urgentes: processosMock.filter(p => p.status === 'Urgente').length
  }

  const cards = [
    {
      title: 'Total de Processos',
      value: stats.total,
      icon: '📋',
      color: 'text-gray-900',
      bgColor: 'bg-gray-50'
    },
    {
      title: 'Recebidos',
      value: stats.recebidos,
      icon: '📥',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Em Análise',
      value: stats.emAnalise,
      icon: '🔍',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Aguardando Assinatura',
      value: stats.aguardandoAssinatura,
      icon: '✍️',
      color: 'text-orange-700',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'Urgentes',
      value: stats.urgentes,
      icon: '🚨',
      color: 'text-red-700',
      bgColor: 'bg-red-50'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`${card.bgColor} rounded-lg p-6 border border-gray-200`}>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsCards