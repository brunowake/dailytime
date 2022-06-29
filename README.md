# Daily Time

Baseado num projeto de UX/UI desenvolvido pela Carolina Caetano da turma de UX/UI da Ironhack.

Aplicativo desenvolvido especialmente para pessoas portadoras de Sindrome de Down, com o fim de facilitar a noção de tempo em tarefas e eventos.

Navegue pelo aplicativo [daily time](https://daily-time-app.netlify.app/)

<br>

### Back-end

#### Para o desenvolvimento do back-end foram utilizadas as seguintes tecnologias:

- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/) (ODM para o mongoDB)
- [JWT](https://jwt.io/) (Token baseado em Json para comunicação com a api)
- [Express](https://expressjs.com/) (framework para construir api)
- [Multer](https://www.npmjs.com/package/multer) (framework para manusear upload de arquivos)
- [Cloudinary](https://cloudinary.com/) (servidor de arquivos para armazenar fotos)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) (algoritmo para criptografar senhas)
- [Heroku](https://www.heroku.com/platform) (plataforma para deploy da api)

### Executar o applicativo localmente

#### Clonar o repositório

```sh
git clone https://github.com/brunowake/dailytime.git
```

#### Criar arquivo .env na raiz da aplicação e configurar variáveis da seguinte forma:

```sh
TOKEN_SIGN_SECRET= # seu secret aqui #
CLOUDINARY_NAME= # seu cloudinary name aqui #
CLOUDINARY_KEY= # sua key aqui #
CLOUDINARY_SECRET= # seu secret aqui #
MONGODB_URI= #seu endereço do banco aqui#
PORT=4000
REACT_APP_URL= #endereço da sua aplicação react aqui (localhost ou deploy)#
```

#### Entrar na pasta e Instalar dependências

```sh
cd dailytime
npm install
```

#### Rodar o servidor

```sh
npm run dev:server
```

### Features

- Upload de foto armazenado em servidor de arquivos
- Autenticação de usuário feito através de JWT
- Rotas de da api protegidas por middlewares

Front-end: https://github.com/thaismachado31/dailytime-client

Projeto desenvolvido para o Bootcamp de Web Development da Ironhack por [André Leal](https://github.com/andreirece), [Bruno Wake](https://github.com/brunowake) e [Thaís Machado](https://github.com/thaismachado31)
Apresentação: [slides](https://docs.google.com/presentation/d/1hlPxue5IARrPvFwg8_uHHvngdMm_J3pu1Zm7NDVt79o/edit#slide=id.g134a2957081_0_2)
