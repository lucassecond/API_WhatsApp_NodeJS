# Documentação da API WhatsApp - Projeto Modelo

## Visão Geral
Este é um projeto modelo de integração com a API do WhatsApp Business Cloud. Ele fornece uma base funcional para enviar e receber mensagens através do WhatsApp usando Node.js.

## Guia de Configuração Inicial

### Pré-requisitos
- Conta Business no WhatsApp
- Node.js versão 14 ou superior instalado
- NPM (Node Package Manager)
- Conta de desenvolvedor no Meta for Developers (https://developers.facebook.com)

### Passo a Passo para Configuração

1. **Criar uma Conta Meta for Developers**
   - Acesse https://developers.facebook.com
   - Crie uma nova conta ou faça login
   - Crie um novo aplicativo selecionando "Business" como tipo

2. **Configurar o WhatsApp Business API**
   - No painel do seu aplicativo, adicione o produto "WhatsApp"
   - Siga o processo de verificação do negócio
   - Obtenha os seguintes dados (guarde-os com segurança):
     - Phone Number ID
     - WhatsApp Business Account ID
     - Access Token
     - Webhook Verify Token (você irá criar este)

3. **Configuração do Projeto**
   ```bash
   # Clonar o repositório
   git clone [URL_DO_REPOSITORIO]
   cd whatsapp-api-integration

   # Instalar dependências
   npm install
   ```

4. **Configuração do Ambiente**
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis com suas credenciais:
   ```env
   PORT=3000
   WHATSAPP_TOKEN=seu_token_aqui
   VERIFY_TOKEN=seu_token_de_verificacao
   WHATSAPP_API_URL=https://graph.facebook.com/v17.0
   PHONE_NUMBER_ID=seu_phone_number_id
   NODE_ENV=development
   ```

## Estrutura do Projeto
```
whatsapp-api-integration/
├── .env.example
├── package.json
├── src/
│   ├── server.js          # Servidor principal
│   ├── routes/
│   │   └── webhook.js     # Rotas do webhook
│   ├── controllers/
│   │   └── whatsappController.js
│   └── config/
│       └── whatsapp.js    # Configurações do WhatsApp
```

## Testando Localmente

1. **Instalar e Configurar ngrok**
   ```bash
   # Windows (usando chocolatey)
   choco install ngrok

   # Mac (usando homebrew)
   brew install ngrok

   # Linux
   snap install ngrok
   ```

2. **Iniciar o Servidor**
   ```bash
   # Desenvolvimento
   npm run dev

   # Produção
   npm start
   ```

3. **Expor Servidor Local**
   ```bash
   ngrok http 3000
   ```

4. **Configurar Webhook**
   - Use a URL do ngrok no painel do Meta for Developers
   - Configure o mesmo Verify Token definido no .env

## Funcionalidades Implementadas

1. **Recebimento de Mensagens**
   - Webhook configurado para receber mensagens
   - Processamento automático de mensagens recebidas
   - Suporte para mensagens de texto

2. **Envio de Mensagens**
   - Envio de mensagens de texto
   - Resposta automática para mensagens recebidas

## Segurança

1. **Proteção de Credenciais**
   - Todas as credenciais são armazenadas em variáveis de ambiente
   - Implementação de rate limiting
   - Headers de segurança com helmet

2. **Validações**
   - Validação do webhook
   - Validação de entrada de dados
   - Tratamento de erros

## Checklist de Produção

- [ ] Configurar variáveis de ambiente
- [ ] Implementar rate limiting
- [ ] Configurar CORS apropriadamente
- [ ] Adicionar monitoramento de saúde
- [ ] Configurar logs de produção
- [ ] Implementar HTTPS
- [ ] Configurar PM2 ou similar

## Prompt para Integração com Outras Aplicações

Use este prompt para solicitar ajuda de uma IA para integrar o WhatsApp Business API em sua aplicação:

```markdown
Preciso integrar a API do WhatsApp Business em minha aplicação existente. Aqui estão os detalhes:

Tecnologias Atuais:
- Backend: [especifique: Node.js/Python/PHP/etc]
- Frontend: [especifique: React/Vue/Angular/etc]
- Banco de Dados: [especifique: MongoDB/PostgreSQL/MySQL/etc]

Credenciais do WhatsApp Business (já obtidas):
- Phone Number ID: [seu_phone_number_id]
- WhatsApp Business Account ID: [seu_business_account_id]
- Access Token: [seu_token]

Funcionalidades Necessárias:
1. Envio de Mensagens:
   - Enviar mensagens de texto
   - Suporte para templates
   - Tratamento de erros e retry

2. Recebimento de Mensagens:
   - Webhook para receber mensagens
   - Processamento em tempo real
   - Armazenamento no banco de dados

3. Interface do Usuário:
   - Lista de contatos
   - Chat em tempo real
   - Indicadores de status de mensagem
   - Notificações de novas mensagens

4. Integrações Adicionais:
   - Sistema de autenticação existente
   - Logs e monitoramento
   - Métricas de uso

Por favor, forneça:
1. Mudanças necessárias na estrutura atual
2. Código para integração no backend
3. Componentes para o frontend
4. Exemplos de tratamento de eventos
5. Melhores práticas de segurança
6. Estratégia de deploy

Observações Importantes:
- A aplicação precisa manter a estrutura atual
- Necessário suporte a múltiplos usuários
- Performance é crucial
- Precisa seguir boas práticas de segurança

## Licença
MIT License - Sinta-se livre para usar este projeto como base para sua implementação. 