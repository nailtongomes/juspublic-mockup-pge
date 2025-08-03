import { Processo, Documento, Procurador, Notificacao } from '../types'

export const procuradores: Procurador[] = [
  {
    id: '1',
    nome: 'Dr. Carlos Silva Santos',
    matricula: '12345-6',
    lotacao: 'Consultoria Jurídica',
    especialidade: ['Direito Administrativo', 'Licitações'],
    ativo: true
  },
  {
    id: '2',
    nome: 'Dra. Maria Fernanda Costa',
    matricula: '12346-7',
    lotacao: 'Contencioso Cível',
    especialidade: ['Direito Civil', 'Responsabilidade Civil'],
    ativo: true
  },
  {
    id: '3',
    nome: 'Dr. João Pedro Oliveira',
    matricula: '12347-8',
    lotacao: 'Contencioso Tributário',
    especialidade: ['Direito Tributário', 'Execução Fiscal'],
    ativo: true
  },
  {
    id: '4',
    nome: 'Dra. Ana Beatriz Rocha',
    matricula: '12348-9',
    lotacao: 'Assessoria Criminal',
    especialidade: ['Direito Penal', 'Processo Penal'],
    ativo: true
  }
]

export const documentosMock: Documento[] = [
  {
    id: 'doc1',
    nome: 'Mandado de Segurança - Petição Inicial.pdf',
    tipo: 'PDF',
    tamanho: '2.4 MB',
    dataUpload: '2024-01-15T09:30:00',
    autor: 'Tribunal de Justiça - 2ª Vara',
    assinado: true,
    versao: 1,
    comentarios: [],
    conteudo: `MANDADO DE SEGURANÇA COLETIVO

IMPETRANTE: SINDICATO DOS SERVIDORES PÚBLICOS DO ESTADO
IMPETRADO: SECRETÁRIO DE ESTADO DA FAZENDA

I - DOS FATOS

O impetrante vem, respeitosamente, à presença de Vossa Excelência impetrar o presente MANDADO DE SEGURANÇA COLETIVO...`
  },
  {
    id: 'doc2',
    nome: 'Parecer Técnico - Análise Jurídica.docx',
    tipo: 'DOCX',
    tamanho: '1.8 MB',
    dataUpload: '2024-01-10T14:20:00',
    autor: 'Dr. Carlos Silva Santos',
    assinado: false,
    versao: 3,
    comentarios: [
      {
        id: 'com1',
        autor: 'Dra. Maria Fernanda Costa',
        texto: 'Sugiro incluir jurisprudência mais recente do STJ sobre o tema.',
        data: '2024-01-12T10:15:00',
        resolvido: false
      }
    ]
  }
]

export const processosMock: Processo[] = [
  {
    id: 'proc001',
    numero: '2024.0001.000123-4',
    tipo: 'Mandado',
    assunto: 'Mandado de Segurança - Reajuste Salarial',
    interessado: 'Sindicato dos Servidores Públicos',
    origem: 'Tribunal de Justiça - 2ª Vara',
    destino: 'PGE - Consultoria Jurídica',
    status: 'Recebido',
    prioridade: 'Alta',
    prazo: '2024-02-15',
    dataRecebimento: '2024-01-15T09:30:00',
    responsavel: 'Dr. Carlos Silva Santos',
    documentos: [documentosMock[0]],
    sigilo: false,
    observacoes: 'Processo com prazo crítico para resposta'
  },
  {
    id: 'proc002',
    numero: '2024.0001.000124-5',
    tipo: 'Parecer',
    assunto: 'Análise de Legalidade - Contrato de Prestação de Serviços',
    interessado: 'Secretaria de Obras Públicas',
    origem: 'SEI - Processo Administrativo',
    destino: 'PGE - Consultoria Jurídica',
    status: 'Em Análise',
    prioridade: 'Normal',
    prazo: '2024-02-20',
    dataRecebimento: '2024-01-10T14:20:00',
    responsavel: 'Dr. Carlos Silva Santos',
    documentos: [documentosMock[1]],
    sigilo: false
  },
  {
    id: 'proc003',
    numero: '2024.0001.000125-6',
    tipo: 'Ofício',
    assunto: 'Execução Fiscal - Empresa XYZ Ltda',
    interessado: 'Fazenda Estadual',
    origem: 'Procuradoria Fiscal',
    destino: 'PGE - Contencioso Tributário',
    status: 'Aguardando Assinatura',
    prioridade: 'Alta',
    prazo: '2024-02-10',
    dataRecebimento: '2024-01-08T16:45:00',
    responsavel: 'Dr. João Pedro Oliveira',
    documentos: [],
    sigilo: false
  },
  {
    id: 'proc004',
    numero: '2024.0001.000126-7',
    tipo: 'Consulta',
    assunto: 'Interpretação de Lei Estadual nº 15.234/2023',
    interessado: 'Secretaria de Educação',
    origem: 'Gabinete do Secretário',
    destino: 'PGE - Consultoria Jurídica',
    status: 'Urgente',
    prioridade: 'Crítica',
    prazo: '2024-01-25',
    dataRecebimento: '2024-01-20T11:00:00',
    documentos: [],
    sigilo: true,
    observacoes: 'Processo sigiloso - decisão urgente para implementação de política pública'
  }
]

export const notificacoesMock: Notificacao[] = [
  {
    id: 'not1',
    tipo: 'prazo',
    titulo: 'Prazo Crítico',
    descricao: 'Processo 2024.0001.000123-4 vence em 3 dias',
    data: '2024-01-22T08:00:00',
    lida: false,
    processoId: 'proc001'
  },
  {
    id: 'not2',
    tipo: 'assinatura',
    titulo: 'Pendente de Assinatura',
    descricao: 'Ofício aguardando sua assinatura digital',
    data: '2024-01-21T15:30:00',
    lida: false,
    processoId: 'proc003'
  },
  {
    id: 'not3',
    tipo: 'novo_processo',
    titulo: 'Novo Processo',
    descricao: 'Processo 2024.0001.000126-7 foi distribuído para você',
    data: '2024-01-20T11:05:00',
    lida: true,
    processoId: 'proc004'
  }
]