# ⚙️ SENACK - API de Ranking (Backend)

API RESTful responsável pela gestão e persistência do sistema de ranking do jogo **SENACK**.

---

## 💻 Tecnologias Utilizadas

- **Node.js / Express.js** – Framework para construção do servidor e definição de rotas.
- **MongoDB / Mongoose** – Banco de dados NoSQL (MongoDB Atlas) para armazenamento das pontuações, usando Mongoose como ORM.
- **QuickSort Customizado** – Implementação própria do algoritmo QuickSort para ordenar os scores antes de retorná-los.
- **Vercel** – Deployment serverless utilizando `api/index.js` como ponto de entrada.

---

## 🗺️ Rotas da API

Todas as rotas são prefixadas com `/api/`.

| Método | Rota          | Parâmetros                      | Descrição                                                                 |
|--------|---------------|----------------------------------|---------------------------------------------------------------------------|
| GET    | `/api/ranking` | Nenhum                           | Busca todos os scores, ordena com QuickSort (descendente) e retorna o TOP 10. |
| POST   | `/api/scores`  | `name` (String), `score` (Number) | Adiciona uma nova pontuação ao banco de dados.                            |
| DELETE | `/api/ranking` | Nenhum                           | Remove todos os registros, resetando o ranking global.                    |

---

## 💾 Modelo de Dados (Score)

A coleção utiliza o seguinte esquema:

| Campo | Tipo   | Obrigatório | Descrição             |
|--------|---------|--------------|-------------------------|
| name   | String  | Sim          | Nome do jogador.        |
| score  | Number  | Sim          | Pontuação do jogador.   |

---

## 🔑 Variáveis de Ambiente

Para a conexão com o MongoDB Atlas, a seguinte variável deve estar configurada:

- **MONGODB_URI** – String de conexão completa do seu cluster MongoDB.

---

## 🛠️ Instalação e Execução Local

1. **Clone este repositório:**
   ```bash
   git clone <sua-url-aqui>
