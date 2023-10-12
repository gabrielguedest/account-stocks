# Projeto Conta Corrente + Ações

REST API para criação de usuários + conta corrente, login com credenciais de acesso, visualização de balanço de patrimônio, visualização de ações trending (mock) e compra de ações.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de começar:

- Node.js
- Yarn
- Docker

## Executando o projeto

### Docker

Antes de começar, ajuste as configurações no arquivo docker-compose.yml na raiz do projeto alterando as variáveis de ambiente conforme necessário.

Execute o comando na raíz do projeto para construir e iniciar os serviços utilizando o docker-compose:

```
docker-compose up -d
```

Após a execução do comando, aguarde o banco + api serem criados e estarem em ready.


### Ambiente local

Instale as dependências localmente para rodar as migrations + seeds responsáveis por criar e popular as tabelas no banco dados.

Para instalar as dependências:

```
yarn
``` 

Rode o comando para criar as tabelas no banco:

```
yarn db:migrate
```

Rode o comando para popular as tabelas:

```
yarn db:seed
```
