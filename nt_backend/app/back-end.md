## Notificação:
- Id da notificação (id)
- Titulo da notificação
- Conteúdo/mensagem da notificação
- Criador da notificação (id)
- Grupo destino da notificação (id) *(s/n)
- Usuario(s) destino da notificação (id)
- Criado quando?

## Usuario:
- Id do usuario (id)
- Grupo deste usuario (id)
- Owner desse usuario (id)
- Nome do usuario

## Grupo
- Id do grupo (id)
- id dos usuario(s) do grupo (id)
- Nome do grupo
- Setor do grupo


## Features
- Login
    - Adicionar sessão local no front-end para armazernar cookie/token de login do usuario
    - Verificar se o email do usuario está verificado antes de fazer login ou adicionar tratamento de erros
    - Tratamento de erros
    - Atualizar as rotas (users, notifications)
    - Add rotas (group)
- 