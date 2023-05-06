# Authentication-API

## :memo: Descrição do projeto
Este é um projeto criado utilizando as tecnologias Node e TypeScript, com o objetivo de demonstrar minhas habilidades em abstração, Programação Orientada a Objetos (POO), princípios SOLID, CLEAN CODE e Domain-Driven Design (DDD).

A API desenvolvida neste projeto tem como funcionalidades registrar usuários, autenticar (login) do usuário e recuperar senha do usuário. Para implementar essas funcionalidades, o projeto utiliza o Redis como um mecanismo temporário de armazenamento de tokens para a recuperação de senha do usuário e o PostgreSQL como banco de dados para persistência dos dados do usuário.

Também foi implementada uma funcionalidade de envio de e-mails utilizando a biblioteca Nodemailer.

Para facilitar o gerenciamento e a execução do projeto, foi utilizado o Docker, com a criação de imagens para o Redis e o PostgreSQL. O Docker Compose foi utilizado para rodar a aplicação de forma simples e rápida.

Com este projeto, busquei criar uma estrutura limpa e escalável, seguindo as melhores práticas de desenvolvimento e utilizando tecnologias modernas e confiáveis para garantir a qualidade e a segurança do software.
## :wrench: Tecnologias Utilizadas

Express.js, TypeScript, PostgreSQL, Redis e Docker. 

<img align="left" height="50em" src="https://www.edureka.co/blog/wp-content/uploads/2019/07/express-logo.png" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain-wordmark.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original-wordmark.svg" />
<img align="left" height="50em" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" />
<br>
<br>

## :rocket: Implementação futura
* Sem planos futuros para o mesmo.

## Como Rodar o Projeto
Observação: Para rodar o projeto é necessário ter o Docker instalado e configurado na máquina.

Observação²: Para que a funcionalidade de envio de emails funcione corretamente, é necessário configurar as variáveis de ambiente `MAILTRAP_USER`,  `MAILTRAP_PASSWORD` e `MAILTRAP_MAIL` no arquivo `docker-compose.yml` com as credenciais da sua conta no Mailtrap. Dessa forma, você poderá visualizar os emails enviados na caixa de entrada da sua conta e testar essa funcionalidade.

```
environment:
      NODE_ENV: development
      JWT_SECRET: chavesecreta
      PORT: 3002
      MAILTRAP_HOST: sandbox.smtp.mailtrap.io
      MAILTRAP_USER: SEU USUÁRIO
      MAILTRAP_PASSWORD: SUA SENHA
      MAILTRAP_MAIL: SEU EMAIL
      REDIS_HOST: redis
      POSTGRES_HOST: db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres
```


Para executar o projeto, siga os passos abaixo:

1. Abra o terminal e navegue até a pasta raiz do projeto.

2. Execute o seguinte comando:
```
docker-compose up
```
Esse comando irá gerar as imagens do Redis e do PostgreSQL e inicializará o servidor na porta 3002.

Observação: É importante lembrar que a primeira execução do comando pode levar alguns minutos, pois o Docker precisa baixar as imagens necessárias para o projeto.

3. Acesse o servidor através do endereço `http://localhost:3002`.

Com esses passos, o projeto deverá estar rodando corretamente na sua máquina.

## Documentação dos Endpoints

<details><summary>(POST) <strong>/new/user</strong></summary>

<br/>
<b>Responsável por criar novo usuário.</b>
<br/>
<br/>

<div>
Request:
<br/>
<br/>
Body

```
JSON
{
	"name": "nome completo",
	"cpf": "123.456.789-01",
	"email": "teste@teste.com",
	"password": "123"
}
```

Response:

HTTP CODE: 201

<br/>
Body

```
OK
```

HTTP CODE: 401

Caso CPF ou email já esteja cadastrado.

<br/>
Body

```
JSON
{
	"message": "CPF  e  Email Já cadastrado."
} 
```

</div>

</details>&nbsp;

<details><summary>(POST) <strong>/user/login</strong></summary>

<br/>
<b>Responsável por autenticar(fazer login) de usuário cadastrado.</b>
<br/>
<br/>

<div>
Request:
<br/>
<br/>
Body

```
JSON
{
	"email": "teste@teste.com",
	"password": "123"
}
```

Response:

HTTP CODE: 200

<br/>
Body

```
{
	"jwt": HASH JWT
}
```

HTTP CODE: 401

<br/>
Body

```
JSON
{
	"message": "Email or Password Invalid"
} 
```

</div>

</details>&nbsp;

<details><summary>(POST) <strong>/user/recoverypassword</strong></summary>

<br/>
<b>1º Passo para recuperação de senha do usuário. 

 - Gera um token e envia para o email cadastrado.</b>
<br/>
<br/>

<div>
Request:
<br/>
<br/>
Body

```
JSON
{
	"email": "teste@teste.com",
}
```

Response:

HTTP CODE: 200

```
{
	"jwt": HASH JWT
}
```

HTTP CODE: 401

```
JSON
{
	"message": "Invalid Email"
}
```

</div>

</details>&nbsp;

<details><summary>(POST) <strong>/user/matchtoken</strong></summary>

<br/>
<b>2º Passo para recuperação de senha do usuário. 

 - Verifica o token que foi enviado por email.</b>
<br/>

<div>
Request:

<br/>
<br/>
HEADER

```
authorization: HASH JWT
```
<br/>
Body

```
JSON
{
	"token": TOKEN RECEBIDO POR EMAIL
}
```

Response:

HTTP CODE: 200

<br/>
Body

```
OK
```

HTTP CODE: 401

<br/>
Body

```
JSON
{
	"message": "Invalid Token"
}
```

</div>

</details>&nbsp;

<details><summary>(PUT) <strong>/user/recoverypassword/newpassword</strong></summary>

<br/>
<b>3º Passo para recuperação de senha do usuário. 

 - Troca a senha antiga da conta por uma nova senha.</b>
<br/>
<br/>

<div>
Request:

<br/>
<br/>
HEADER

```
authorization: HASH JWT
```

<br/>
Body

```
JSON
{
	"password": "1234"
}
```

Response:

HTTP CODE: 200

<br/>
Body

```
OK
```

HTTP CODE: 401

<br/>
Body

```
JSON
{
	"message": "new password cannot be the same as the old one"
}
```

</div>

</details>&nbsp;

<details><summary>(GET) <strong>/user/recoverypassword/resendtoken</strong></summary>

<br/>
<b>Faz parte do 2º passo para recuperação de senha. 

 - Reenvia o token para o email cadastrado.</b>
<br/>
<br/>

<div>
Request:
<br/>
<br/>
HEADER

```
authorization: HASH JWT
```

Response:

HTTP CODE: 200

<br/>
Body

```
OK
```

HTTP CODE: 401

<br/>
Body

```
JSON
{
	"message": "Invalid JWT"
}
```

</div>

</details>&nbsp;

## :dart: Status do projeto
Projeto finalizado.
