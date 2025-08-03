import React, { useState } from 'react'
import { Processo, Documento } from '../../types'
import { documentosMock } from '../../data/mockData'
import DocumentPreview from '../documents/DocumentPreview'
import DocumentEditor from '../editor/DocumentEditor'
import MovimentationModal from './MovimentationModal' 

interface ProcessViewerProps {
  process: Processo
}

const ProcessViewer: React.FC<ProcessViewerProps> = ({ process }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'workspace'>('workspace')
  const [selectedDocument, setSelectedDocument] = useState<Documento | null>(null)
  const [showAddDocument, setShowAddDocument] = useState(false)
  const [showMinuta, setShowMinuta] = useState(true)
  const [showDocuments, setShowDocuments] = useState(true)
  const [showMovimentation, setShowMovimentation] = useState(false)
  
  // Usar documentos do processo ou documentos mock se não houver
  const documents = process.documentos.length > 0 ? process.documentos : documentosMock

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Recebido': return 'bg-blue-100 text-blue-800'
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800'
      case 'Aguardando Assinatura': return 'bg-orange-100 text-orange-800'
      case 'Finalizado': return 'bg-green-100 text-green-800'
      case 'Urgente': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleDocumentSelect = (documento: Documento) => {
    setSelectedDocument(documento)
  }

  const timelineEvents = [
    {
      date: process.dataRecebimento,
      title: 'Processo Recebido',
      description: `Recebido via ${process.origem}`,
      type: 'received'
    },
    {
      date: '2024-01-16T10:30:00',
      title: 'Processo Distribuído',
      description: `Distribuído para ${process.responsavel}`,
      type: 'assigned'
    },
    {
      date: '2024-01-17T14:20:00',
      title: 'Análise Iniciada',
      description: 'Início da análise jurídica',
      type: 'analysis'
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Processo {process.numero}</h1>
          <p className="text-gray-600">{process.assunto}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddDocument(true)}
            className="btn-secondary"
          >
            📎 Anexar Documento
          </button>
          <button className="btn-secondary">
            ✍️ Assinar Digitalmente
          </button>
          <button
            onClick={() => setShowMovimentation(true)}
            className="btn-primary"
          >
            🚀 Movimentar Processo
          </button>
        </div>
      </div>

      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'workspace', label: 'Área de Trabalho', icon: '💼' },
              { key: 'info', label: 'Informações do Processo', icon: 'ℹ️' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? 'border-pge-blue text-pge-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="pt-6">
          {activeTab === 'workspace' && (
            <div className="space-y-4">
              {/* Controles de Layout */}
              <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Layout:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowMinuta(!showMinuta)}
                      className={`px-3 py-1 text-xs rounded ${
                        showMinuta ? 'bg-pge-blue text-white' : 'bg-white text-gray-600 border'
                      }`}
                    >
                      {showMinuta ? '📝 Ocultar Minuta' : '📝 Mostrar Minuta'}
                    </button>
                    <button
                      onClick={() => setShowDocuments(!showDocuments)}
                      className={`px-3 py-1 text-xs rounded ${
                        showDocuments ? 'bg-pge-blue text-white' : 'bg-white text-gray-600 border'
                      }`}
                    >
                      {showDocuments ? '📄 Ocultar Documentos' : '📄 Mostrar Documentos'}
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Processo: {process.numero} • Status: 
                  <span className={`ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                    {process.status}
                  </span>
                </div>
              </div>

              {/* Layout Principal */}
              <div className={`grid gap-6 ${
                showMinuta && showDocuments ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
                
                {/* Editor de Minuta */}
                {showMinuta && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        💼 Minuta de Documento
                      </h3>
                      <div className="flex space-x-2">
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                          🤖 Assistente IA
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-800">
                          💾 Salvar
                        </button>
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg">
                      <DocumentEditor 
                        processNumber={process.numero}
                        processSubject={process.assunto}
                        isIntegrated={true}
                      />
                    </div>
                  </div>
                )}

                {/* Navegação e Preview de Documentos */}
                {showDocuments && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">
                        📂 Documentos do Processo ({documents.length})
                      </h3>
                      <button
                        onClick={() => setShowAddDocument(true)}
                        className="text-sm text-pge-blue hover:text-blue-700 font-medium"
                      >
                        + Anexar
                      </button>
                    </div>

                    {/* Lista de Documentos */}
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {documents.map(documento => (
                        <div 
                          key={documento.id} 
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedDocument?.id === documento.id 
                              ? 'border-pge-blue bg-blue-50' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                          onClick={() => handleDocumentSelect(documento)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                              <span className="text-xl">
                                {documento.tipo === 'PDF' ? '📄' : documento.tipo === 'DOCX' ? '📝' : '📋'}
                              </span>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                  {documento.nome}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {documento.tamanho} • {documento.autor}
                                </p>
                                <p className="text-xs text-gray-400">
                                  {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {documento.assinado && (
                                <span className="text-green-600 text-xs">✅</span>
                              )}
                              {documento.comentarios.length > 0 && (
                                <span className="text-blue-600 text-xs">
                                  💬{documento.comentarios.length}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {documents.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <span className="text-4xl mb-2 block">📄</span>
                          <p className="text-sm">Nenhum documento anexado</p>
                        </div>
                      )}
                    </div>

                    {/* Preview do Documento Selecionado */}
                    {selectedDocument && (
                      <div className="border-t border-gray-200 pt-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">
                          👁️ Preview: {selectedDocument.nome}
                        </h4>
                        <DocumentPreview document={selectedDocument} />
                      </div>
                    )}

                    {!selectedDocument && documents.length > 0 && (
                      <div className="border-t border-gray-200 pt-4 text-center text-gray-500">
                        <span className="text-2xl block mb-2">👆</span>
                        <p className="text-sm">Selecione um documento para visualizar</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Status Atual</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(process.status)}`}>
                      {process.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Interessado</label>
                  <p className="mt-1 text-sm text-gray-900">{process.interessado}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Origem</label>
                  <p className="mt-1 text-sm text-gray-900">{process.origem}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Destino</label>
                  <p className="mt-1 text-sm text-gray-900">{process.destino}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Responsável</label>
                  <p className="mt-1 text-sm text-gray-900">{process.responsavel || 'Não atribuído'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Prioridade</label>
                  <p className="mt-1 text-sm text-gray-900">{process.prioridade}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Prazo</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {process.prazo ? new Date(process.prazo).toLocaleDateString('pt-BR') : 'Sem prazo definido'}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Data de Recebimento</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(process.dataRecebimento).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>

              {process.observacoes && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Observações</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{process.observacoes}</p>
                </div>
              )}

              <div className="md:col-span-2">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Histórico do Processo</h4>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {timelineEvents.map((event, eventIdx) => (
                      <li key={eventIdx}>
                        <div className="relative pb-8">
                          {eventIdx !== timelineEvents.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"></span>
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div className="h-8 w-8 rounded-full bg-pge-blue flex items-center justify-center">
                              <span className="text-white text-xs">
                                {event.type === 'received' ? '📥' : event.type === 'assigned' ? '👤' : '🔍'}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-900 font-medium">{event.title}</p>
                                <p className="text-sm text-gray-500">{event.description}</p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {new Date(event.date).toLocaleString('pt-BR')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showAddDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Anexar Documento</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 mb-4">
                Selecione um arquivo para anexar ao processo {process.numero}
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-pge-blue transition-colors cursor-pointer">
                <span className="text-4xl mb-2 block">📎</span>
                <p className="text-sm text-gray-600">Clique para selecionar ou arraste arquivos aqui</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX até 10MB</p>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
              <button
                onClick={() => setShowAddDocument(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button className="btn-primary">
                Anexar Documento
              </button>
            </div>
          </div>
        </div>
      )}

      {showMovimentation && (
        <MovimentationModal
          processNumber={process.numero}
          onComplete={() => setShowMovimentation(false)}
          onCancel={() => setShowMovimentation(false)}
        />
      )}
    </div>
  )
}

export default ProcessViewer