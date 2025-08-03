import React, { useState } from 'react'
import { Processo } from '../../types'

interface ProcessListProps {
  processes: Processo[]
  onProcessSelect: (process: Processo) => void
  onDelegate: (processId: string) => void
}

const ProcessList: React.FC<ProcessListProps> = ({ processes, onProcessSelect, onDelegate }) => {
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState<string>('')

  const filteredProcesses = processes.filter(processo => {
    const matchesFilter = filter === 'all' || processo.status === filter
    const matchesSearch = search === '' || 
      processo.numero.toLowerCase().includes(search.toLowerCase()) ||
      processo.assunto.toLowerCase().includes(search.toLowerCase()) ||
      processo.interessado.toLowerCase().includes(search.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status: string) => {
    const classes = {
      'Recebido': 'status-badge status-recebido',
      'Em Análise': 'status-badge status-analise',
      'Aguardando Assinatura': 'status-badge status-assinatura',
      'Finalizado': 'status-badge status-finalizado',
      'Urgente': 'status-badge status-urgente'
    }
    return classes[status as keyof typeof classes] || 'status-badge'
  }

  const getPriorityIcon = (prioridade: string) => {
    switch (prioridade) {
      case 'Crítica': return '🔴'
      case 'Alta': return '🟡'
      case 'Normal': return '🟢'
      case 'Baixa': return '⚪'
      default: return '⚪'
    }
  }

  const isOverdue = (prazo?: string) => {
    if (!prazo) return false
    return new Date(prazo) < new Date()
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Processos Distribuídos</h2>
        <div className="flex space-x-3">
          <input
            type="text"
            placeholder="Buscar processos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
          >
            <option value="all">Todos</option>
            <option value="Recebido">Recebidos</option>
            <option value="Em Análise">Em Análise</option>
            <option value="Aguardando Assinatura">Aguardando Assinatura</option>
            <option value="Urgente">Urgentes</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Processo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assunto
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prazo
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProcesses.map((processo) => (
              <tr key={processo.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{getPriorityIcon(processo.prioridade)}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{processo.numero}</div>
                      <div className="text-sm text-gray-500">{processo.tipo}</div>
                    </div>
                    {processo.sigilo && (
                      <span className="text-red-500" title="Processo Sigiloso">🔒</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">{processo.assunto}</div>
                  <div className="text-sm text-gray-500">{processo.interessado}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(processo.status)}>
                    {processo.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  {processo.prazo ? (
                    <div className={`${isOverdue(processo.prazo) ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                      {new Date(processo.prazo).toLocaleDateString('pt-BR')}
                      {isOverdue(processo.prazo) && <span className="ml-1">⚠️</span>}
                    </div>
                  ) : (
                    <span className="text-gray-400">Sem prazo</span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onProcessSelect(processo)}
                      className="text-pge-blue hover:text-blue-700 font-medium"
                    >
                      Abrir
                    </button>
                    <button
                      onClick={() => onDelegate(processo.id)}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      Delegar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProcesses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum processo encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  )
}

export default ProcessList