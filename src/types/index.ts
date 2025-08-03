export interface Processo {
  id: string
  numero: string
  tipo: 'Mandado' | 'Ofício' | 'Parecer' | 'Memorando' | 'Despacho' | 'Consulta'
  assunto: string
  interessado: string
  origem: string
  destino: string
  status: 'Recebido' | 'Em Análise' | 'Aguardando Assinatura' | 'Finalizado' | 'Urgente'
  prioridade: 'Baixa' | 'Normal' | 'Alta' | 'Crítica'
  prazo?: string
  dataRecebimento: string
  responsavel?: string
  documentos: Documento[]
  observacoes?: string
  sigilo: boolean
}

export interface Documento {
  id: string
  nome: string
  tipo: 'PDF' | 'DOCX' | 'DOC' | 'RTF'
  tamanho: string
  dataUpload: string
  autor: string
  assinado: boolean
  conteudo?: string
  versao: number
  comentarios: Comentario[]
}

export interface Comentario {
  id: string
  autor: string
  texto: string
  data: string
  resolvido: boolean
}

export interface Procurador {
  id: string
  nome: string
  matricula: string
  lotacao: string
  especialidade: string[]
  avatar?: string
  ativo: boolean
}

export interface Notificacao {
  id: string
  tipo: 'prazo' | 'assinatura' | 'delegacao' | 'novo_processo'
  titulo: string
  descricao: string
  data: string
  lida: boolean
  processoId?: string
}