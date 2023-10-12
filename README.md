# Projeto Conta Corrente + Ações

Essa API oferece funcionalidades de criação de usuários, gestão de contas correntes, autenticação, consulta de patrimônio, visualização de ações em alta (simulada) e compra de ações.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina antes de começar:

- Node.js
- Yarn
- Docker

## Instalando dependências

Execute o seguinte comando para instalar as dependências:


```
yarn
``` 

## Configurando variáveis de ambiente

Crie um arquivo .env.local na raiz do projeto e configure as variáveis conforme o exemplo em .env.example:


```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DATABASE=postgres
```

## Configurando o banco de dados

Como utilizamos uuid_v4() no PostgreSQL, adicione a extensão uuid-ossp executando o comando SQL:


```
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Após adicionar a extensão, execute as migrações e seeds para preparar o banco de dados.


```
yarn db:migrate
```

```
yarn db:seed
```

## Executando a aplicação

Para iniciar a aplicação em modo de desenvolvimento, utilize o comando:


```
yarn start:dev
```

## Executando testes

Execute o seguinte comando para rodar os testes:


```
yarn test
```


## Cloud

A aplicação está hospedada na AWS.

- A API é executada em uma instância do ElasticBeanstalk usando um container hospedado no DockerHub.
- O banco está rodando em uma instância PostgreSQL no RDS.
Para visualizar a aplicação na nuvem, acesse o link:

```
http://desafio-toro.sa-east-1.elasticbeanstalk.com/
```

## Endpoints

A API possui 6 endpoints, descritos abaixo:

### GET "/"

Endpoint de HealthCheck da aplicação.

### POST "/users"

Endpoint para criar um usuário. O corpo da requisição deve seguir o exemplo:

```
{
  "name": "nome",
  "cpf": "12345678900",
  "password": "senha"
}
```

A resposta inclui o access_token (JWT) necessário para autenticar outros endpoints:

```
{
  "access_token": "access_token_gerado"
}
```

### POST "/auth"

Endpoint para autenticação de usuário através de credenciais de acesso. O corpo da requisição deve seguir o exemplo:

```
{
  "cpf": "12345678900",
  "password": "senha"
}
```

A resposta inclui o access_token (JWT) necessário para autenticação de outros endpoints:

```
{
  "access_token": "access_token_gerado"
}
```

### POST "/userPosition"

Endpoint para consultar o patrimônio de um usuário. Este endpoint necessita de um token de autenticação obtido anteriormente. O cabeçalho deve incluir:

```
Authorization: Bearer <access_token>
```

A resposta inclui o saldo atual da conta corrente, as ações do usuário e o patrimônio consolidado:

```
{
  "checkingAccountAmount": 180,
  "positions": [
    {
      "symbol": "PETR4",
      "amount": 2,
      "currentPrice": 10.00,
    }
  ],
  "consolidated": 200
}
```

### GET "/stocks/trends"

Endpoint para consultar ações mais vendidas recentemente. Este endpoint utiliza dados simulados, consultando uma tabela no banco de dados (populada previamente através dos seeds) sem ordenação específica. Este endpoint não espera corpo ou cabeçalho.

A resposta inclui uma lista de ações e seus preços:

```
[
  {
    "symbol": "PETR4",
    "currentPrice": 28.44
  },
  {
    "symbol": "MGLU3",
    "currentPrice": 25.91
  }
]
```

### GET "/user-stocks/order"

Endpoint que permite que um usuário compre ações. Este endpoint necessita de um token de autenticação obtido anteriormente. O cabeçalho deve incluir:

```
Authorization: Bearer <access_token>
```

Além disso, para este endpoint, é necessário passar um corpo conforme o exemplo:

```
{
  "cpf": "12345678900",
  "amount": 1,
  "symbol": "PETR4" 
}
```

Esse endpoint não contém um corpo de resposta, apenas um statusCode relativo ao status da resposta é devolvido.