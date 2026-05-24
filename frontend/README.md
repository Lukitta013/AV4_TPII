# 🌊 Atlantis Frontend

Interface gráfica SPA (Single Page Application) do sistema **Atlantis** — gestão de clubes, hotéis e resorts.

---

## 🛠️ Tecnologias Usadas

| Tecnologia | Versão | Função |
|---|---|---|
| **React** | 18 | Framework UI |
| **Vite** | 5 | Bundler / dev server rápido |
| **React Router DOM** | 6 | Navegação SPA (sem recarregar a página) |
| **Lucide React** | 0.383 | Ícones modernos SVG |
| CSS Puro | — | Estilização com variáveis CSS (sem Tailwind) |

> Sem conexão com o backend — dados mockados baseados na estrutura TypeScript.

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js** versão 18 ou superior → https://nodejs.org
- **npm** (já vem com o Node)

Verifique se está instalado:
```bash
node --version   # deve mostrar v18 ou superior
npm --version
```

---

### Passo 1 — Entre na pasta do frontend

```bash
cd frontend
```

---

### Passo 2 — Instale as dependências

```bash
npm install
```

Isso vai criar a pasta `node_modules/` com todas as bibliotecas. Aguarde até terminar (geralmente 30–60 segundos).

---

### Passo 3 — Rode em modo desenvolvimento

```bash
npm run dev
```

O terminal vai mostrar algo como:
```
  VITE v5.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Abra **http://localhost:5173** no navegador.

---

### Passo 4 — Faça login

Use as credenciais demo:

```
E-mail: admin@atlantis.com
Senha:  123456
```

---

## 📁 Estrutura de Arquivos

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Tela de login com animação oceânica
│   │   ├── Layout.jsx         # Sidebar + Header + conteúdo
│   │   ├── Sidebar.jsx        # Navegação lateral
│   │   ├── Header.jsx         # Cabeçalho com nome da página
│   │   ├── Dashboard.jsx      # Visão geral com estatísticas
│   │   ├── ui/
│   │   │   └── ToastContainer # Notificações (sucesso/erro)
│   │   ├── clientes/
│   │   │   └── ClientesPage   # CRUD completo de clientes
│   │   ├── acomodacoes/
│   │   │   └── AcomodacoesPage # Listagem de tipos de quarto
│   │   └── hospedagens/
│   │       └── HospedagensPage # Check-in / Check-out
│   ├── context/
│   │   └── AppContext.jsx     # Estado global (clientes, hospedagens...)
│   ├── data/
│   │   └── mockData.js        # Dados mockados inspirados no backend
│   ├── App.jsx                # Rotas e autenticação
│   ├── main.jsx               # Entry point
│   └── index.css              # Tema visual completo (variáveis CSS)
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## ✨ Funcionalidades

### 🔐 Login
- Tela de login com animação de ondas do oceano e partículas flutuantes
- Validação de credenciais

### 📊 Dashboard
- Estatísticas: total de clientes, dependentes, acomodações, hospedagens ativas
- Lista de hóspedes ativos com status em tempo real
- Resumo das acomodações com preços
- Tabela dos titulares recentes

### 👥 Clientes
- Listagem com busca e filtros (todos / titulares / dependentes)
- **Cadastrar** titular ou dependente (com modal de formulário)
- **Editar** nome e nome social
- **Excluir** (com confirmação; exclui dependentes junto ao titular)
- **Expandir** linha para ver endereço, documentos e telefones
- **Promover dependente a titular** (botão UserCheck)

### 🏨 Acomodações
- Cards visuais para todos os 6 tipos definidos no backend
- Exibe: emoji, nome, preço/noite, badges (A/C, garagem, suítes), camas, descrição

### 🛎️ Hospedagens
- **Check-in**: seleciona titular (não hospedado) + acomodação
- **Check-out**: confirmação antes de remover
- Cards com: hóspede, acomodação, data de entrada, diárias e total estimado

---

## 📦 Build para produção

```bash
npm run build
```

Os arquivos ficam em `dist/` — pronto para servir em qualquer hospedagem estática (Vercel, Netlify, etc.).

---

## 🎨 Design

- **Tema:** Luxury Ocean — azul marinho profundo + dourado
- **Fontes:** Cormorant Garamond (display) + Jost (body) — via Google Fonts
- **Responsivo:** funciona em mobile, tablet e desktop
- **Animações:** ondas animadas no login, transições suaves nos modais e cards
