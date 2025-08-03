import React, { useState } from 'react'
import { Documento } from '../../types'

interface DocumentPreviewProps {
  document: Documento
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [showComments, setShowComments] = useState(true)

  return (
    <div className="space-y-4">
      {/* Controles */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              showComments ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            💬 {document.comentarios.length}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">v{document.versao}</span>
          {document.assinado && (
            <span className="text-xs text-green-600">✅ Assinado</span>
          )}
        </div>
      </div>

      {/* Preview do Documento */}
      <div className={`border rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        {document.assinado && (
          <div className="bg-green-50 border-b border-green-200 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✅</span>
                <span className="text-green-800 text-sm font-medium">Documento Assinado</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white border border-green-300 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">QR</span>
                </div>
                <a href="#" className="text-xs text-green-700 hover:underline">
                  Verificar
                </a>
              </div>
            </div>
          </div>
        )}

        <div className={`p-4 max-h-96 overflow-y-auto ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {document.conteudo ? (
            <div className="space-y-4">
              {/* Cabeçalho Institucional */}
              <div className="text-center border-b border-gray-200 pb-4 mb-4">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">🏛️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">PROCURADORIA GERAL DO ESTADO</h3>
                    <p className="text-xs text-gray-500">Estado do [Nome]</p>
                  </div>
                </div>
              </div>

              {/* Conteúdo */}
              <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {document.conteudo}
                </div>
              </div>

              {/* Rodapé com assinatura */}
              {document.assinado && (
                <div className="border-t border-gray-200 pt-4 mt-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">Documento assinado digitalmente por:</p>
                    <p className="text-sm font-medium">{document.autor}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(document.dataUpload).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <span className="text-4xl mb-2 block">
                {document.tipo === 'PDF' ? '📄' : document.tipo === 'DOCX' ? '📝' : '📋'}
              </span>
              <p className="text-sm text-gray-600 mb-1">{document.nome}</p>
              <p className="text-xs text-gray-500">{document.tamanho}</p>
              <button className="mt-3 text-sm text-pge-blue hover:text-blue-700 font-medium">
                📥 Baixar Arquivo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comentários */}
      {showComments && document.comentarios.length > 0 && (
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-gray-900">Comentários:</h5>
          {document.comentarios.map(comentario => (
            <div key={comentario.id} className="bg-yellow-50 border-l-4 border-yellow-400 pl-3 py-2 rounded-r">
              <p className="text-sm text-gray-800">{comentario.texto}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-600">{comentario.autor}</span>
                <span className="text-xs text-gray-500">
                  {new Date(comentario.data).toLocaleString('pt-BR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Informações do Arquivo */}
      <div className="bg-gray-50 rounded-lg p-3">
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-gray-500">Tipo:</span>
            <span className="ml-1 font-medium">{document.tipo}</span>
          </div>
          <div>
            <span className="text-gray-500">Tamanho:</span>
            <span className="ml-1 font-medium">{document.tamanho}</span>
          </div>
          <div>
            <span className="text-gray-500">Autor:</span>
            <span className="ml-1 font-medium">{document.autor}</span>
          </div>
          <div>
            <span className="text-gray-500">Data:</span>
            <span className="ml-1 font-medium">
              {new Date(document.dataUpload).toLocaleDateString('pt-BR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DocumentPreview