# Sistema E-Commerce

Sistema completo de e-commerce com cadastro de usuários, login, cadastro de produtos e pagamento via PIX fictício.

## 🚀 Tecnologias

### Backend
- **Node.js** com **Express**
- **SQLite** como banco de dados
- **JWT** para autenticação
- **bcryptjs** para criptografia de senhas
- **UUID** para geração de IDs únicos

### Frontend
- **React** com **TypeScript**
- **React Router** para navegação
- **Styled Components** para estilização
- **Axios** para requisições HTTP
- **React Toastify** para notificações

## 📋 Funcionalidades

### Autenticação
- ✅ Cadastro de usuário (nome, email, CPF)
- ✅ Validação de CPF
- ✅ Login com email e senha
- ✅ Proteção de rotas
- ✅ Tokens JWT com expiração

### Produtos
- ✅ Listagem de produtos
- ✅ Cadastro de produtos
- ✅ Edição de produtos
- ✅ Exclusão de produtos
- ✅ Controle de estoque
- ✅ Categorização

### Pagamentos
- ✅ Geração de PIX fictício
- ✅ Confirmação manual de pagamento
- ✅ Histórico de pagamentos
- ✅ Status de transações

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Backend

1. **Instalar dependências:**
```bash
cd backend
npm install
```

2. **Inicializar banco de dados:**
```bash
npm run init-db
```

3. **Executar servidor:**
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará rodando em `http://localhost:3001`

### Frontend

1. **Instalar dependências:**
```bash
cd frontend
npm install
```

2. **Executar aplicação:**
```bash
npm start
```

A aplicação estará rodando em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
ai-project/
├── backend/
│   ├── src/
│   │   ├── database/
│   │   │   ├── config.js     # Configuração do SQLite
│   │   │   └── init.js       # Script de inicialização
│   │   ├── routes/
│   │   │   ├── auth.js       # Rotas de autenticação
│   │   │   ├── products.js   # Rotas de produtos
│   │   │   └── payments.js   # Rotas de pagamentos
│   │   └── index.js          # Servidor principal
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── contexts/         # Context API
│   │   ├── services/         # Serviços de API
│   │   ├── styles/           # Styled Components
│   │   └── types/            # Tipos TypeScript
│   └── package.json
└── README.md
```

## 🔗 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token

### Produtos
- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto por ID
- `POST /api/products` - Criar produto (autenticado)
- `PUT /api/products/:id` - Atualizar produto (autenticado)
- `DELETE /api/products/:id` - Deletar produto (autenticado)

### Pagamentos
- `POST /api/payments/pix` - Criar pagamento PIX (autenticado)
- `POST /api/payments/pix/:transactionId/confirm` - Confirmar pagamento (autenticado)
- `GET /api/payments/my-payments` - Listar pagamentos do usuário (autenticado)
- `GET /api/payments/status/:transactionId` - Verificar status do pagamento (autenticado)

## 💳 Sistema de Pagamento PIX (Fictício)

O sistema simula um pagamento via PIX com as seguintes características:

1. **Geração de chave PIX**: Cria uma chave PIX fictícia baseada no padrão brasileiro
2. **QR Code**: Exibe a chave PIX que pode ser copiada
3. **Confirmação manual**: O usuário pode simular a confirmação do pagamento
4. **Controle de status**: Pagamentos têm status (pending, confirmed, failed)
5. **Expiração**: Pagamentos expiram em 30 minutos

## 🔐 Segurança

- Senhas criptografadas com bcrypt
- Tokens JWT com expiração de 24h
- Validação de CPF no frontend e backend
- Proteção de rotas sensíveis
- Sanitização de dados de entrada

## 📝 Exemplos de Uso

### Cadastro de Usuário
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "cpf": "123.456.789-00",
  "password": "123456"
}
```

### Cadastro de Produto
```json
{
  "name": "Smartphone XYZ",
  "description": "Smartphone com 128GB de armazenamento",
  "price": 899.99,
  "category": "Eletrônicos",
  "stock": 10,
  "image_url": "https://exemplo.com/imagem.jpg"
}
```

### Pagamento PIX
```json
{
  "productId": 1,
  "amount": 899.99
}
```

## 🎯 Melhorias Futuras

- [ ] Carrinho de compras
- [ ] Sistema de cupons de desconto
- [ ] Integração com gateway de pagamento real
- [ ] Sistema de avaliações de produtos
- [ ] Painel administrativo
- [ ] Notificações em tempo real
- [ ] Upload de imagens
- [ ] Sistema de favoritos
- [ ] Histórico de navegação

## 🐛 Resolução de Problemas

### Backend não inicia
- Verifique se todas as dependências estão instaladas
- Execute `npm run init-db` para criar o banco de dados
- Verifique se a porta 3001 não está em uso

### Frontend não conecta com backend
- Verifique se o backend está rodando na porta 3001
- Confirme se a URL da API está correta em `src/services/api.ts`
- Verifique o console do navegador para erros de CORS

### Erro de CORS
- O backend já está configurado para aceitar requisições do frontend
- Se necessário, ajuste as configurações de CORS em `backend/src/index.js`

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de demonstração.