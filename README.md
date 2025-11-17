⚙️ SENACK - API de Ranking (Backend)

API RESTful responsável pela gestão e persistência do sistema de ranking do jogo SENACK.

💻 Tecnologias Utilizadas

Node.js / Express.js: Framework para construção do servidor e definição de rotas.

MongoDB / Mongoose: Banco de dados NoSQL (MongoDB Atlas) para armazenamento das pontuações e Mongoose como ORM.

QuickSort Customizado: O algoritmo de ordenação QuickSort foi implementado diretamente no código para classificar os scores antes de retorná-los.

Vercel: Configuração serverless para deployment do endpoint (api/index.js).

🗺️ Rotas da API

Todas as rotas são prefixadas com /api/.

Método

Rota

Parâmetros

Descrição

GET

/api/ranking

Nenhum

Busca todos os scores, ordena usando QuickSort por pontuação descendente e retorna o TOP 10.

POST

/api/scores

name (String), score (Number)

Adiciona uma nova pontuação ao banco de dados.

DELETE

/api/ranking

Nenhum

Remove todos os registros de pontuação, resetando o ranking global.

💾 Modelo de Dados (Score)

A coleção armazena documentos com o seguinte esquema:

Campo

Tipo

Obrigatório

Descrição

name

String

Sim

Nome do jogador.

score

Number

Sim

Pontuação obtida no jogo.

🔑 Variáveis de Ambiente

Para a conexão correta com o banco de dados, é necessário configurar a seguinte variável de ambiente:

MONGODB_URI: A string de conexão completa para o seu cluster MongoDB Atlas.

🛠️ Instalação e Execução Local (Backend)

Clone este repositório.

Instale as dependências:

npm install


Defina a variável de ambiente MONGODB_URI (por exemplo, usando um arquivo .env ou exportando a variável no terminal).

Inicie a aplicação:

node api/index.js


(Se estiver utilizando Vercel, o ponto de entrada é api/index.js conforme o vercel.json).
