# NotiFlow
 - Gerar notificações personalizadas para serem disparadas conforme necessário (WhatsApp, Slack, Gmail).

# Clean Architerure

- routes/ → Define apenas as rotas e chama os serviços.
- services/ → Contém a lógica de negócios.
- repositories/ → Lida diretamente com o banco de dados.
- models/ → Define os esquemas de dados.
- utils/ → Armazena funções auxiliares, como envio de webhooks.

# Tecnologia
- Back-end: FastAPI para gerenciar usuários e fluxos.
- Front-end: React para o painel de controle.
- Banco de Dados: Supabase para armazenar mensagens/logs/dados.
- n8n: Para criar e gerenciar os fluxos de automação.