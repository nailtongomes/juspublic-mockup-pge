import React, { useState } from 'react'
import { processosMock, procuradores } from '../../data/mockData'
import { Processo } from '../../types'
import ProcessList from './ProcessList'
import StatsCards from './StatsCards'
import DelegationPanel from './DelegationPanel'
import TeamChat from './TeamChat'

interface DashboardProps {
  onProcessSelect: (process: Processo) => void
}

const Dashboard: React.FC<DashboardProps> = ({ onProcessSelect }) => {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null)
  const [showDelegation, setShowDelegation] = useState(false)
  const [showTeamChat, setShowTeamChat] = useState(false)

  const handleDelegate = (processId: string) => {
    setSelectedProcess(processId)
    setShowDelegation(true)
  }

  const handleDelegationComplete = () => {
    setShowDelegation(false)
    setSelectedProcess(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral dos seus processos e atividades</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary">
            📊 Relatórios
          </button>
          <button className="btn-primary">
            📋 Processos
          </button>
        </div>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProcessList 
            processes={processosMock}
            onProcessSelect={onProcessSelect}
            onDelegate={handleDelegate}
          />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Prazos Críticos</h3>
            <div className="space-y-3">
              {processosMock
                .filter(p => p.prazo && new Date(p.prazo) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
                .map(processo => (
                  <div key={processo.id} className="border-l-4 border-red-400 pl-3">
                    <p className="text-sm font-medium text-gray-900">{processo.numero}</p>
                    <p className="text-xs text-gray-600">{processo.assunto}</p>
                    <p className="text-xs text-red-600 font-medium">
                      Vence: {new Date(processo.prazo!).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Equipe PGE</h3>
              <button
                onClick={() => setShowTeamChat(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-pge-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span className="text-sm">💬</span>
                <span className="text-sm font-medium">Chat</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {procuradores.filter(p => p.ativo).slice(0, 3).map(procurador => (
                <div key={procurador.id} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-pge-blue to-pge-green rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {procurador.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{procurador.nome}</p>
                    <p className="text-xs text-gray-600">{procurador.lotacao}</p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full" title="Online"></div>
                </div>
              ))}
              
              <button
                onClick={() => setShowTeamChat(true)}
                className="w-full mt-3 p-2 text-sm text-pge-blue hover:bg-blue-50 rounded-lg transition-colors border border-pge-blue"
              >
                💬 Abrir Chat da Equipe ({procuradores.filter(p => p.ativo).length} online)
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDelegation && selectedProcess && (
        <DelegationPanel
          processId={selectedProcess}
          onComplete={handleDelegationComplete}
          onCancel={() => setShowDelegation(false)}
        />
      )}

      {showTeamChat && (
        <TeamChat onClose={() => setShowTeamChat(false)} />
      )}
    </div>
  )
}

export default Dashboard