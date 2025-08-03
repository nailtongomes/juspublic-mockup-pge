import React, { useState } from 'react'
import { procuradores } from '../../data/mockData'

interface MovimentationModalProps {
  processNumber: string
  onComplete: () => void
  onCancel: () => void
}

const MovimentationModal: React.FC<MovimentationModalProps> = ({ 
  processNumber, 
  onComplete, 
  onCancel 
}) => {
  const [destinationType, setDestinationType] = useState<'interno' | 'externo'>('interno')
  const [selectedDestination, setSelectedDestination] = useState<string>('')
  const [observations, setObservations] = useState<string>('')
  const [priority, setPriority] = useState<string>('Normal')
  const [requireSignature, setRequireSignature] = useState<boolean>(false)

  const internalDestinations = [
    'PGE - Consultoria Jurídica',
    'PGE - Contencioso Cível', 
    'PGE - Contencioso Tributário',
    'PGE - Assessoria Criminal',
    'PGE - Coordenação Administrativa',
    'PGE - Núcleo de Licitações'
  ]

  const externalDestinations = [
    'Secretaria de Estado da Fazenda',
    'Secretaria de Estado de Obras Públicas',
    'Secretaria de Estado da Educação',
    'Secretaria de Estado da Saúde',
    'Tribunal de Contas do Estado',
    'Ministério Público Estadual',
    'Defensoria Pública do Estado'
  ]

  const availableDestinations = destinationType === 'interno' ? internalDestinations : externalDestinations

  const handleMovimentation = () => {
    if (!selectedDestination) return
    
    console.log('Movimentando processo:', {
      processNumber,
      tipo: destinationType,
      destino: selectedDestination,
      observacoes: observations,
      prioridade: priority,
      requerAssinatura: requireSignature
    })
    
    onComplete()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Movimentar Processo</h3>
          <p className="text-sm text-gray-600">Processo: {processNumber}</p>
        </div>

        <div className="px-6 py-4 space-y-6">
          {/* Tipo de Movimentação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Movimentação
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => setDestinationType('interno')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  destinationType === 'interno' 
                    ? 'border-pge-blue bg-blue-50 text-pge-blue' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <span className="block text-2xl mb-1">🏢</span>
                  <span className="font-medium">Interno</span>
                  <p className="text-xs text-gray-600 mt-1">Dentro da PGE</p>
                </div>
              </button>
              <button
                onClick={() => setDestinationType('externo')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
                  destinationType === 'externo' 
                    ? 'border-pge-blue bg-blue-50 text-pge-blue' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <span className="block text-2xl mb-1">🌐</span>
                  <span className="font-medium">Externo</span>
                  <p className="text-xs text-gray-600 mt-1">Outros órgãos</p>
                </div>
              </button>
            </div>
          </div>

          {/* Destino */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destino {destinationType === 'interno' ? '(Setor)' : '(Órgão)'}
            </label>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            >
              <option value="">Selecione o destino</option>
              {availableDestinations.map(destination => (
                <option key={destination} value={destination}>{destination}</option>
              ))}
            </select>
          </div>

          {/* Procurador Responsável (apenas interno) */}
          {destinationType === 'interno' && selectedDestination && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Procurador Responsável (opcional)
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent">
                <option value="">Distribuição automática</option>
                {procuradores.filter(p => p.ativo).map(procurador => (
                  <option key={procurador.id} value={procurador.id}>
                    {procurador.nome} - {procurador.lotacao}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Prioridade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            >
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
              <option value="Crítica">Crítica</option>
            </select>
          </div>

          {/* Opções Adicionais */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Opções Adicionais
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={requireSignature}
                  onChange={(e) => setRequireSignature(e.target.checked)}
                  className="rounded border-gray-300 text-pge-blue focus:ring-pge-blue"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Requer assinatura do destinatário
                </span>
              </label>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observações
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
              placeholder="Instruções específicas ou observações sobre a movimentação..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
            />
          </div>

          {/* Informações da Movimentação */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800 font-medium">Informação</p>
                <p className="text-sm text-blue-700">
                  A movimentação será registrada automaticamente no SEI e o destinatário receberá uma notificação.
                  {destinationType === 'externo' && ' Para movimentações externas, será gerado um ofício automaticamente.'}
                </p>
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
            onClick={handleMovimentation}
            disabled={!selectedDestination}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚀 Confirmar Movimentação
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovimentationModal