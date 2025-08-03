import React, { useState } from 'react'
import { procuradores, processosMock } from '../../data/mockData'

interface DelegationPanelProps {
  processId: string
  onComplete: () => void
  onCancel: () => void
}

const DelegationPanel: React.FC<DelegationPanelProps> = ({ processId, onComplete, onCancel }) => {
  const [selectedProcurador, setSelectedProcurador] = useState<string>('')
  const [observacoes, setObservacoes] = useState<string>('')
  const [prioridade, setPrioridade] = useState<string>('Normal')

  const processo = processosMock.find(p => p.id === processId)
  const availableProcuradores = procuradores.filter(p => p.ativo && p.id !== '1') // Excluindo o usuário atual

  const handleDelegate = () => {
    if (!selectedProcurador) return
    
    // Aqui seria feita a delegação no backend
    console.log('Delegando processo:', {
      processId,
      para: selectedProcurador,
      observacoes,
      prioridade
    })
    
    onComplete()
  }

  if (!processo) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Delegar Processo</h3>
          <p className="text-sm text-gray-600">Processo: {processo.numero}</p>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Detalhes do Processo</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm"><strong>Assunto:</strong> {processo.assunto}</p>
              <p className="text-sm"><strong>Interessado:</strong> {processo.interessado}</p>
              <p className="text-sm"><strong>Origem:</strong> {processo.origem}</p>
              {processo.prazo && (
                <p className="text-sm"><strong>Prazo:</strong> {new Date(processo.prazo).toLocaleDateString('pt-BR')}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delegar para:
            </label>
            <select
              value={selectedProcurador}
              onChange={(e) => setSelectedProcurador(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            >
              <option value="">Selecione um procurador</option>
              {availableProcuradores.map(procurador => (
                <option key={procurador.id} value={procurador.id}>
                  {procurador.nome} - {procurador.lotacao}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade:
            </label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            >
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações:
            </label>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
              placeholder="Instruções específicas ou observações sobre o processo..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800 font-medium">Informação</p>
                <p className="text-sm text-blue-700">A delegação será registrada automaticamente no SEI e o procurador receberá uma notificação.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
          <button
            onClick={onCancel}
            className="btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={handleDelegate}
            disabled={!selectedProcurador}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Delegação
          </button>
        </div>
      </div>
    </div>
  )
}

export default DelegationPanel