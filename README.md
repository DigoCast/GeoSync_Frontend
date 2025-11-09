# 🌍 GeoSync Dashboard

Um painel administrativo interativo para gerenciamento de Continentes, Países e Cidades, com integração de clima em tempo real e bandeiras nacionais, utilizando uma arquitetura limpa e moderna em React + TypeScript e um backend em Node.js + Express + Prisma.

## 🚀 Tecnologias Utilizadas
### Frontend
- ⚛️ React (com TypeScript)
- 🎨 TailwindCSS para estilização
- 🧩 Axios para comunicação com o backend
- 🧠 Custom Hooks (useFetchData, useClima)

### Backend
- 🧱 Node.js com Express
- 🗃️ Prisma ORM (PostgreSQL)
- 🌦️ Integração com WeatherAPI para dados climáticos
- 🗺️ Integração com RestCountries API (Dados geográficos)
- 🧩 Arquitetura modular (Controller, Service, Routes)

## 🧭 Funcionalidades
### 🌐 Continentes
- Criar, editar, listar e deletar continentes
- Visualização detalhada com países associados

### 🏳️ Países
- Cadastro automático via RestCountries API
- Exibição da bandeira, idioma, moeda e população
- Associação com continentes existentes

### 🏙️ Cidades
- Cadastro vinculado a países existentes
- Exibição de dados geográficos (latitude, longitude)
- Consulta de clima atual em tempo real com WeatherAPI

## ⚙️ Como Rodar o Projeto

### Backend
```bash
  cd backend
  npm install
  npx prisma migrate dev
  npm run dev
```

### Frontend
```bash
  cd frontend
  npm install
  npm run dev
```

Acessar o projeto em:  [http://localhost:5173](http://localhost:5173)