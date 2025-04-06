## Features
- Login
    - Adicionar sessão local no front-end para armazernar cookie/token de login do usuario
    - Verificar se o email do usuario está verificado antes de fazer login ou adicionar tratamento de erros
    - Tratamento de erros
    - Validar que apenas um dos dois campos (group_notification_id ou user_notification_id) seja preenchido por notificação.
    - Cadastrar o mesmo usuario que vai para a tabela na auth.users.id no dashboard_users

- Banco de Dados
    - Criar tabela (user_groups) para associação many-to-many (um usuario em varios grupos)

- Futuro
    - Templates, agendamento, relatórios, respostas, etc.