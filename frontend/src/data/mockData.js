// ============================================================
// ATLANTIS — Mock Data
// Espelha a estrutura do backend TypeScript (sem conexão real)
// ============================================================

export const ACOMODACOES = [
  {
    id: 'ac-001',
    nomeAcomodacao: 'Solteiro Simples',
    camaSolteiro: 1,
    camaCasal: 0,
    suite: 0,
    climatizacao: true,
    garagem: 0,
    descricao: 'Quarto individual compacto e aconchegante, ideal para viajantes solo.',
    preicoNoite: 180,
    imagem: '🛏️',
  },
  {
    id: 'ac-002',
    nomeAcomodacao: 'Solteiro Mais',
    camaSolteiro: 0,
    camaCasal: 1,
    suite: 1,
    climatizacao: true,
    garagem: 1,
    descricao: 'Suíte premium para hóspede individual, com cama de casal e garagem.',
    preicoNoite: 290,
    imagem: '🌟',
  },
  {
    id: 'ac-003',
    nomeAcomodacao: 'Casal Simples',
    camaSolteiro: 0,
    camaCasal: 1,
    suite: 1,
    climatizacao: true,
    garagem: 1,
    descricao: 'Quarto de casal com suíte, climatização e garagem. Elegante e confortável.',
    preicoNoite: 350,
    imagem: '💑',
  },
  {
    id: 'ac-004',
    nomeAcomodacao: 'Família Simples',
    camaSolteiro: 2,
    camaCasal: 1,
    suite: 1,
    climatizacao: true,
    garagem: 1,
    descricao: 'Perfeita para famílias pequenas, com 2 camas de solteiro e 1 de casal.',
    preicoNoite: 520,
    imagem: '👨‍👩‍👧',
  },
  {
    id: 'ac-005',
    nomeAcomodacao: 'Família Mais',
    camaSolteiro: 5,
    camaCasal: 1,
    suite: 2,
    climatizacao: true,
    garagem: 2,
    descricao: 'Amplo espaço para famílias maiores, com 5 camas solteiro e 2 suítes.',
    preicoNoite: 890,
    imagem: '👨‍👩‍👧‍👦',
  },
  {
    id: 'ac-006',
    nomeAcomodacao: 'Família Super',
    camaSolteiro: 6,
    camaCasal: 2,
    suite: 3,
    climatizacao: true,
    garagem: 2,
    descricao: 'Nossa maior acomodação. 6 camas solteiro, 2 casal e 3 suítes de luxo.',
    preicoNoite: 1400,
    imagem: '🏰',
  },
]

export const TIPO_DOCUMENTO = {
  CPF: 'Cadastro de Pessoa Física',
  RG: 'Registro Geral',
  Passaporte: 'Passaporte',
}

let _nextId = 100

export const gerarId = () => `cli-${++_nextId}`

const makeCliente = (id, nome, nomeSocial, nascimento, rua, bairro, cidade, estado, pais, cep, docs, telefones, titularId = null) => ({
  id,
  nome,
  nomeSocial,
  dataNascimento: nascimento,
  dataCadastro: '2024-11-10',
  endereco: { rua, bairro, cidade, estado, pais, codigoPostal: cep },
  documentos: docs,
  telefones,
  titularId,
  dependentes: [],
})

export const CLIENTES_INICIAIS = [
  makeCliente(
    'cli-001', 'Marina Cavalcanti', 'Marina', '1985-03-14',
    'Rua das Orquídeas, 42', 'Jardim Europa', 'São Paulo', 'SP', 'Brasil', '01452-090',
    [{ tipo: 'CPF', numero: '123.456.789-00', dataExpedicao: '2005-06-01' },
     { tipo: 'RG',  numero: '12.345.678-9',  dataExpedicao: '2003-08-15' }],
    [{ ddd: '11', numero: '99812-3456' }]
  ),
  makeCliente(
    'cli-002', 'Rafael Drummond', 'Rafa', '1990-07-22',
    'Av. Beira-Mar, 500', 'Meireles', 'Fortaleza', 'CE', 'Brasil', '60165-121',
    [{ tipo: 'CPF', numero: '987.654.321-00', dataExpedicao: '2010-01-20' }],
    [{ ddd: '85', numero: '98761-0000' }]
  ),
  makeCliente(
    'cli-003', 'Juliana Ferreira', 'Juli', '1978-11-05',
    'Rua da Consolação, 300', 'Consolação', 'São Paulo', 'SP', 'Brasil', '01302-000',
    [{ tipo: 'CPF', numero: '111.222.333-44', dataExpedicao: '1998-03-10' },
     { tipo: 'Passaporte', numero: 'BR1234567', dataExpedicao: '2018-09-20' }],
    [{ ddd: '11', numero: '91234-5678' }]
  ),
  makeCliente(
    'cli-004', 'Lucas Oliveira', 'Lucão', '1992-04-18',
    'Rua Pinheiro Machado, 78', 'Centro', 'Curitiba', 'PR', 'Brasil', '80010-100',
    [{ tipo: 'CPF', numero: '444.555.666-77', dataExpedicao: '2012-07-30' }],
    [{ ddd: '41', numero: '99888-7766' }],
    'cli-001'  // dependente de Marina
  ),
  makeCliente(
    'cli-005', 'Beatriz Cavalcanti', 'Bia', '2005-09-02',
    'Rua das Orquídeas, 42', 'Jardim Europa', 'São Paulo', 'SP', 'Brasil', '01452-090',
    [{ tipo: 'RG', numero: '55.666.777-8', dataExpedicao: '2020-01-05' }],
    [{ ddd: '11', numero: '99000-1111' }],
    'cli-001'  // dependente de Marina
  ),
  makeCliente(
    'cli-006', 'Thiago Brandão', 'Thiago', '1988-12-30',
    'Rua XV de Novembro, 200', 'Centro', 'Porto Alegre', 'RS', 'Brasil', '90020-080',
    [{ tipo: 'CPF', numero: '777.888.999-00', dataExpedicao: '2008-11-11' }],
    [{ ddd: '51', numero: '99444-3322' }]
  ),
]

// Montar relacionamentos de dependentes
CLIENTES_INICIAIS.forEach(c => {
  if (c.titularId) {
    const titular = CLIENTES_INICIAIS.find(t => t.id === c.titularId)
    if (titular) titular.dependentes.push(c.id)
  }
})

export const HOSPEDAGENS_INICIAIS = [
  {
    id: 'hosp-001',
    clienteId: 'cli-002',
    acomodacaoId: 'ac-003',
    dataEntrada: new Date().toISOString(),
  },
  {
    id: 'hosp-002',
    clienteId: 'cli-006',
    acomodacaoId: 'ac-005',
    dataEntrada: new Date(Date.now() - 86400000).toISOString(),
  },
]

export const USUARIO_DEMO = {
  email: 'admin@atlantis.com',
  senha: '123456',
  nome: 'Administrador',
  cargo: 'Gestor Geral',
}
