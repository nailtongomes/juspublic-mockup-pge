import React from 'react'
import { processosMock } from '../data/mockData'

interface SidebarProps {
  activeView: string
  onViewChange: (view: 'dashboard' | 'process') => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const pendingProcesses = processosMock.filter(p => p.status === 'Recebido').length
  const inAnalysis = processosMock.filter(p => p.status === 'Em Análise').length
  const awaitingSignature = processosMock.filter(p => p.status === 'Aguardando Assinatura').length

  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2V7z" />
        </svg>
      )
    }
  ]

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as any)}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeView === item.id
                ? 'bg-pge-blue text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="ml-3">{item.name}</span>
          </button>
        ))}

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Processos
          </h3>
          <div className="mt-3 space-y-1">
            <div className="px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Recebidos</span>
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                  {pendingProcesses}
                </span>
              </div>
            </div>
            <div className="px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Em Análise</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
                  {inAnalysis}
                </span>
              </div>
            </div>
            <div className="px-3 py-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Aguardando Assinatura</span>
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                  {awaitingSignature}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Acesso Rápido
          </h3>
          <div className="mt-3 space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              🔍 Pesquisar Processos
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              📊 Relatórios
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              ⚙️ Configurações
            </button>
          </div>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-gray-200">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-green-800 text-xs font-medium">Sincronizado com SEI</span>
          </div>
          <p className="text-green-600 text-xs mt-1">Última sync: há 2 min</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar