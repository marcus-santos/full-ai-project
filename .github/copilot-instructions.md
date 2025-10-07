<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Sistema E-Commerce - Instruções de Desenvolvimento

Este é um sistema completo de e-commerce com as seguintes características:

## ✅ Funcionalidades Implementadas

### Backend (Node.js + Express + SQLite)
- **Autenticação JWT completa** com registro e login
- **Validação de CPF** no cadastro de usuários
- **CRUD completo de produtos** com controle de estoque
- **Sistema de pagamento PIX fictício** com geração de chaves e confirmação
- **Histórico de pagamentos** por usuário
- **Base de dados SQLite** com tabelas para usuários, produtos e pagamentos

### Frontend (React + TypeScript)
- **Interface responsiva** com Styled Components
- **Páginas de login e cadastro** com validação
- **Listagem e cadastro de produtos** 
- **Sistema de pagamento PIX** com interface intuitiva
- **Histórico de pagamentos** do usuário
- **Proteção de rotas** e gerenciamento de estado
- **Notificações toast** para feedback do usuário

## 🚀 Como Executar

### Primeira execução:
1. **Backend**: `cd backend && npm install && npm run init-db`
2. **Frontend**: `cd frontend && npm install`

### Execução diária:
1. **Backend**: `cd backend && npm start` (porta 3001)
2. **Frontend**: `cd frontend && npm start` (porta 3000)

### Usando VS Code Tasks:
- Use `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Full Application"

## 📊 Dados de Exemplo

O sistema já possui produtos de exemplo carregados:
- Smartphone Samsung Galaxy S23
- Notebook Dell Inspiron 15  
- Camiseta Básica Azul
- Livro: JavaScript - O Guia Definitivo
- Tênis Nike Air Max
- Cafeteira Elétrica Philips

## 🔐 Fluxo de Uso

1. **Acesse**: http://localhost:3000
2. **Cadastre-se** com nome, email, CPF e senha
3. **Navegue pelos produtos** na página inicial
4. **Compre produtos** usando PIX fictício
5. **Acompanhe pagamentos** na seção "Meus Pagamentos"
6. **Adicione novos produtos** (usuários logados)

## 🛠️ Arquitetura

```
Backend:
├── src/
│   ├── database/ - Configuração SQLite
│   ├── routes/ - APIs REST (auth, products, payments)
│   └── index.js - Servidor Express

Frontend:
├── src/
│   ├── components/ - Componentes React
│   ├── contexts/ - Context API (Auth)
│   ├── services/ - APIs HTTP
│   ├── styles/ - Styled Components
│   └── types/ - Tipos TypeScript
```

## 🎯 APIs Principais

- `POST /api/auth/register` - Cadastro
- `POST /api/auth/login` - Login  
- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto (autenticado)
- `POST /api/payments/pix` - Gerar PIX (autenticado)
- `POST /api/payments/pix/:id/confirm` - Confirmar pagamento

## 💳 Sistema PIX (Fictício)

- **Geração automática** de chave PIX padrão brasileiro
- **Simulação de pagamento** com confirmação manual
- **Controle de status** (pending/confirmed/failed)
- **Histórico completo** de transações

## 🔧 Melhorias Sugeridas

Para desenvolvimento futuro:
- Carrinho de compras
- Sistema de cupons
- Gateway de pagamento real
- Upload de imagens
- Sistema de avaliações
- Painel administrativo
- Notificações em tempo real

---

**Status**: ✅ **Sistema Completo e Funcional**
**Última atualização**: Outubro 2025