# 🌍 GeoSync Dashboard

Um painel administrativo interativo para gerenciamento de Continentes, Países e Cidades, com integração de clima em tempo real e bandeiras nacionais, utilizando uma arquitetura limpa e moderna em React + TypeScript e um backend em Node.js + Express + Prisma.

## 🚀 Tecnologias Utilizadas
### Frontend
- ⚛️ React (com TypeScript)
- 🎨 TailwindCSS para estilização
- 🧩 Axios para comunicação com o backend
- 🧠 Custom Hooks (useFetchData, useClima)

### Backend (Contexto)
A aplicação consome um backend que utiliza **Node.js** com **Express** e **Prisma ORM (PostgreSQL)**. A comunicação é feita com o endereço base `http://localhost:3000`.

## 🧭 Funcionalidades
O dashboard oferece as seguintes páginas e funcionalidades:

### 🏠 Dashboard
- Exibe estatísticas totais de Continentes, Países e Cidades.
- Permite selecionar uma cidade em destaque para exibir seu clima atual em tempo real.

### 🌐 Continentes
- Criar, editar, listar e deletar continentes.
- Visualização detalhada com países associados.
- Possui funcionalidade de busca/filtro por nome.

### 🏳️ Países
- Cadastro e listagem de países.
- Filtros por nome, continente e faixas de população (mínima/máxima).
- Exibe detalhes como bandeira, sigla, idioma, moeda e população.
- Visualização detalhada de todas as cidades associadas a um país.

### 🏙️ Cidades
- Cadastro e listagem de cidades vinculadas a países existentes.
- Filtros por nome e país.
- Consulta de clima atual em tempo real, utilizando as coordenadas da cidade.

### 🖼️ Galeria de Bandeiras
- Exibe todas as bandeiras dos países cadastrados em formato de galeria.
  
## ⚙️ Como Rodar o Projeto
**ATENÇÃO:** O projeto **backend** deve estar configurado e rodando em http://localhost:3000 antes de iniciar o frontend.

### 1. Instalação de Dependências

Navegue até a pasta do frontend e instale as dependências:

```bash
cd GeoSync_Frontend
npm install
```

### 2. Execução do Servidor de Desenvolvimento

Inicie o aplicativo React:

```bash
npm run dev
```

### Acesso ao Projeto

A aplicação estará acessível no seu navegador em:

**http://localhost:5173**