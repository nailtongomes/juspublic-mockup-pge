import React, { useState } from 'react'

interface AIAssistant {
  active: boolean
  suggestions: string[]
  isTyping: boolean
}

interface DocumentEditorProps {
  processNumber?: string
  processSubject?: string
  isIntegrated?: boolean
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ 
  processNumber, 
  processSubject, 
  isIntegrated = false 
}) => {
  const [documentType, setDocumentType] = useState<string>('')
  const [subject, setSubject] = useState<string>(processSubject || '')
  const [content, setContent] = useState<string>('')
  const [classification] = useState<string>('')
  const [accessLevel] = useState<string>('Público')
  const [aiAssistant, setAiAssistant] = useState<AIAssistant>({
    active: false,
    suggestions: [],
    isTyping: false
  })
  const [showComments, setShowComments] = useState(true)
  const [comments] = useState<Array<{id: string, text: string, position: number}>>([])

  const documentTypes = [
    'Parecer Jurídico',
    'Ofício',
    'Memorando',
    'Despacho',
    'Nota Técnica',
    'Relatório',
    'Portaria',
    'Instrução Normativa'
  ]

  const templates = {
    'Parecer Jurídico': `PARECER JURÍDICO Nº [NÚMERO]/[ANO] - PGE

I - DO RELATÓRIO
[Relatar os fatos e a questão jurídica apresentada]

II - DA ANÁLISE JURÍDICA
[Análise fundamentada da questão]

III - DA CONCLUSÃO
[Conclusão e recomendações]

É o parecer.

[CIDADE], [DATA].

[NOME DO PROCURADOR]
Procurador do Estado`,

    'Ofício': `OFÍCIO Nº [NÚMERO]/[ANO] - PGE

[CIDADE], [DATA].

Ao Senhor
[NOME DO DESTINATÁRIO]
[CARGO]
[ENDEREÇO]

Assunto: [ASSUNTO]

Senhor [CARGO],

[CORPO DO OFÍCIO]

Respeitosamente,

[NOME DO PROCURADOR]
Procurador do Estado`,

    'Memorando': `MEMORANDO Nº [NÚMERO]/[ANO] - PGE

De: [REMETENTE]
Para: [DESTINATÁRIO]
Assunto: [ASSUNTO]

[CORPO DO MEMORANDO]

[NOME DO PROCURADOR]
Procurador do Estado`
  }

  const handleTypeChange = (type: string) => {
    setDocumentType(type)
    if (templates[type as keyof typeof templates]) {
      setContent(templates[type as keyof typeof templates])
    }
  }

  const handleAIAssist = async () => {
    setAiAssistant(prev => ({ ...prev, active: true, isTyping: true }))
    
    setTimeout(() => {
      const suggestions = [
        "Com base no conteúdo, sugiro incluir fundamentação legal adicional no artigo 37 da CF/88.",
        "O parágrafo 2º poderia ser mais específico quanto aos prazos estabelecidos na Lei 8.666/93.",
        "Recomendo citar o precedente do STJ no REsp 1.234.567/SP para fortalecer a argumentação.",
        "A conclusão poderia ser mais objetiva e incluir recomendações práticas para o gestor."
      ]
      
      setAiAssistant({
        active: true,
        isTyping: false,
        suggestions: suggestions.slice(0, Math.floor(Math.random() * 4) + 1)
      })
    }, 2000)
  }

  const handleSave = () => {
    console.log('Salvando documento:', {
      type: documentType,
      subject,
      content,
      classification,
      accessLevel
    })
  }

  const handleCreateAndSign = () => {
    console.log('Criando e assinando documento')
  }

  return (
    <div className="space-y-4">
      {!isIntegrated && (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Editor de Documentos</h1>
            <p className="text-gray-600">Crie documentos com apoio de inteligência artificial</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowComments(!showComments)}
              className="btn-secondary"
            >
              💬 Comentários ({comments.length})
            </button>
            <button
              onClick={handleAIAssist}
              className="btn-secondary"
            >
              🤖 Assistente IA
            </button>
            <button
              onClick={handleSave}
              className="btn-secondary"
            >
              💾 Salvar
            </button>
            <button
              onClick={handleCreateAndSign}
              className="btn-primary"
            >
              ✍️ Criar e Assinar
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Configurações do Documento */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Configurações</h3>
          
          <div className={`grid gap-3 ${isIntegrated ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Tipo de Documento
              </label>
              <select
                value={documentType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pge-blue focus:border-transparent"
              >
                <option value="">Selecione o tipo</option>
                {documentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {processNumber && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Processo
                </label>
                <input
                  type="text"
                  value={processNumber}
                  disabled
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-gray-50 text-gray-600"
                />
              </div>
            )}

            <div className={!processNumber && !isIntegrated ? 'col-span-2' : ''}>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Assunto
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Descreva o assunto do documento"
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pge-blue focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Editor de Conteúdo */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Conteúdo do Documento</h3>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-xs">
                <strong>B</strong>
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-xs">
                <em>I</em>
              </button>
              <button className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded text-xs">
                📋
              </button>
            </div>
          </div>

          <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 text-center">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs">🏛️</span>
              </div>
              <div>
                <h4 className="font-bold text-xs">PROCURADORIA GERAL DO ESTADO</h4>
                <p className="text-xs text-gray-600">Estado de [Nome do Estado]</p>
              </div>
            </div>
          </div>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo do documento..."
            rows={isIntegrated ? 12 : 16}
            className="w-full px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pge-blue font-mono text-xs leading-relaxed"
          />

          <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <span>{content.length} caracteres • {content.split(/\s+/).filter(word => word.length > 0).length} palavras</span>
            <div className="flex items-center space-x-3">
              <span>Salvo automaticamente há 2 min</span>
              <button className="text-pge-blue hover:text-blue-700">
                📝 AutoTextos
              </button>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        {isIntegrated && (
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleAIAssist}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
            >
              🤖 IA
            </button>
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              💾 Salvar
            </button>
            <button
              onClick={handleCreateAndSign}
              className="px-3 py-1 text-xs bg-pge-blue text-white rounded hover:bg-blue-700 transition-colors"
            >
              ✍️ Assinar
            </button>
          </div>
        )}

        {/* Assistente IA - apenas quando ativo */}
        {aiAssistant.active && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🤖</span>
              <h4 className="text-sm font-semibold text-gray-900">Assistente IA</h4>
            </div>
            
            {aiAssistant.isTyping ? (
              <div className="space-y-2">
                <div className="animate-pulse flex space-x-2">
                  <div className="rounded-full bg-blue-400 h-1 w-1"></div>
                  <div className="rounded-full bg-blue-400 h-1 w-1"></div>
                  <div className="rounded-full bg-blue-400 h-1 w-1"></div>
                </div>
                <p className="text-xs text-blue-700">Analisando documento...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs font-medium text-blue-800">💡 Sugestões:</p>
                {aiAssistant.suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-white border border-blue-200 rounded p-2">
                    <p className="text-xs text-blue-800">{suggestion}</p>
                    <div className="mt-1 flex space-x-2">
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Aplicar
                      </button>
                      <button className="text-xs text-gray-500 hover:text-gray-700">
                        Ignorar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DocumentEditor