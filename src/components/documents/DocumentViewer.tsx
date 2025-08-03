import React, { useState } from 'react'
import { documentosMock } from '../../data/mockData'

interface DocumentViewerProps {
  documentId: string
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ documentId }) => {
  const [showComments, setShowComments] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const documento = documentosMock.find(d => d.id === documentId)

  if (!documento) {
    return (
      <div className="card text-center py-12">
        <span className="text-4xl mb-4 block">❌</span>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Documento não encontrado</h2>
        <p className="text-gray-600">O documento solicitado não existe ou foi removido.</p>
      </div>
    )
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    // Aqui seria adicionado o comentário no backend
    console.log('Novo comentário:', newComment)
    setNewComment('')
  }

  const handleSignDocument = () => {
    // Aqui seria iniciado o processo de assinatura digital
    console.log('Iniciando assinatura digital do documento:', documentId)
  }

  const handleExportPDF = () => {
    // Aqui seria feita a exportação para PDF
    console.log('Exportando documento para PDF:', documentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{documento.nome}</h1>
          <p className="text-gray-600">
            Versão {documento.versao} • {documento.tamanho} • 
            Autor: {documento.autor} • 
            {new Date(documento.dataUpload).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`btn-secondary ${darkMode ? 'bg-gray-800 text-white' : ''}`}
          >
            {darkMode ? '☀️' : '🌙'} {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="btn-secondary"
          >
            💬 Comentários ({documento.comentarios.length})
          </button>
          <button
            onClick={handleExportPDF}
            className="btn-secondary"
          >
            📄 Exportar PDF
          </button>
          {!documento.assinado && (
            <button
              onClick={handleSignDocument}
              className="btn-primary"
            >
              ✍️ Assinar Digitalmente
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-3 card ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
          {documento.assinado && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div className="flex-1">
                  <p className="text-green-800 font-medium">Documento Assinado Digitalmente</p>
                  <p className="text-green-600 text-sm">
                    Assinado por {documento.autor} em {new Date(documento.dataUpload).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="w-16 h-16 bg-white border border-green-300 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-600">QR Code</span>
                  </div>
                  <a href="#" className="text-xs text-green-600 hover:underline">Verificar Assinatura</a>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-center justify-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <span className="text-6xl mb-4 block">
                  {documento.tipo === 'PDF' ? '📄' : documento.tipo === 'DOCX' ? '📝' : '📋'}
                </span>
                <p className="text-gray-600 mb-2">Visualizador de {documento.tipo}</p>
                <p className="text-sm text-gray-500">
                  Em um ambiente real, aqui seria renderizado o conteúdo do documento
                </p>
              </div>
            </div>

            {documento.conteudo && (
              <div className={`p-6 rounded-lg border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <img src="/api/placeholder/80/80" alt="Brasão" className="w-16 h-16" />
                    <div>
                      <h2 className="text-lg font-bold">PROCURADORIA GERAL DO ESTADO</h2>
                      <p className="text-sm text-gray-600">Estado de [Nome do Estado]</p>
                    </div>
                  </div>
                </div>
                
                <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {documento.conteudo}
                  </div>
                </div>

                {documento.assinado && (
                  <div className="mt-8 pt-4 border-t border-gray-300">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Documento assinado digitalmente por:</p>
                      <p className="font-medium">{documento.autor}</p>
                      <p className="text-sm text-gray-500">
                        Certificado Digital ICP-Brasil • Série: A1 • 
                        Hash: SHA-256 • Algoritmo: RSA-2048
                      </p>
                      <div className="mt-3 flex items-center justify-center space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-gray-600">QR Code</span>
                        </div>
                        <div className="text-left text-sm text-gray-600">
                          <p>Para verificar a autenticidade:</p>
                          <a href="#" className="text-blue-600 hover:underline">
                            https://verificador.pge.gov.br/doc/{documento.id}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {showComments && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comentários ({documento.comentarios.length})
              </h3>

              {documento.comentarios.length > 0 ? (
                <div className="space-y-4">
                  {documento.comentarios.map(comentario => (
                    <div key={comentario.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{comentario.autor}</p>
                          <p className="text-sm text-gray-600 mt-1">{comentario.texto}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(comentario.data).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        {!comentario.resolvido && (
                          <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                            Resolver
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Nenhum comentário ainda</p>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicione um comentário..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pge-blue focus:border-transparent"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="mt-2 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adicionar Comentário
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Versões</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Versão {documento.versao} (atual)</p>
                    <p className="text-xs text-gray-500">
                      {new Date(documento.dataUpload).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <span className="text-blue-600 text-sm">Atual</span>
                </div>
                
                {documento.versao > 1 && (
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-700">Versão {documento.versao - 1}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString('pt-BR')}
                      </p>
                    </div>
                    <button className="text-pge-blue text-sm hover:text-blue-700">
                      Ver
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentViewer