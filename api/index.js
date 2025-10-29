// Arquivo: api/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

//  Conexão com MongoDB Atlas 
const MONGO_URI = process.env.MONGODB_URI;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }
    try {
        const db = await mongoose.connect(MONGO_URI);
        cachedDb = db;
        console.log("Conectado ao MongoDB!");
        return db;
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        throw error;
    }
}

//  Tabelas do Banco de Dados 
const scoreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    score: { type: Number, required: true, default: 0 }
});
const Score = mongoose.models.Score || mongoose.model('Score', scoreSchema);


//  Algoritmo de Ordenação: QuickSort 

function quickSort(arr, key) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [], right = [], equal = [];
    for (const element of arr) {
        if (element[key] > pivot[key]) left.push(element);
        else if (element[key] < pivot[key]) right.push(element);
        else equal.push(element);
    }
    return [...quickSort(left, key), ...equal, ...quickSort(right, key)];
}


//  Rotas da API 

// Rota GET /api/ranking
app.get('https://senack-backend.vercel.app/api/ranking', async (req, res) => {
    try {
        await connectToDatabase();
        console.log('GET /api/ranking - Solicitado ranking...');

        // 1. Busca TODOS os scores do banco (sem ordenar)
        const allScores = await Score.find({});

        // 2. Converte os "documentos" do Mongoose para objetos JS simples
        const plainScores = allScores.map(doc => doc.toObject());

        // 3. USA A FUNÇÃO QUICKSORT para ordenar os resultados
        const sortedScores = quickSort(plainScores, 'score');
        
        // 4. Retorna apenas os 10 primeiros
        res.json(sortedScores.slice(0, 10));

    } catch (error) {
        console.error("Erro ao buscar ranking:", error);
        res.status(500).json({ message: 'Erro ao buscar ranking.' });
    }
});

// Rota POST /api/scores
app.post('https://senack-backend.vercel.app/api/scores', async (req, res) => {
    try {
        await connectToDatabase();
        const { name, score } = req.body;

        if (!name || typeof score !== 'number') {
            return res.status(400).json({ message: 'Dados inválidos.' });
        }
        const newScore = new Score({ name, score });
        await newScore.save();
        
        console.log('POST /api/scores - Novo score adicionado:', newScore);
        res.status(201).json({ message: 'Score adicionado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar score.' });
    }
});

// Rota DELETE /api/ranking
app.delete('https://senack-backend.vercel.app/api/ranking', async (req, res) => {
    try {
        await connectToDatabase();
        await Score.deleteMany({}); 
        console.log('DELETE /api/ranking - Ranking foi resetado.');
        res.status(200).json({ message: 'Ranking resetado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao resetar ranking.' });
    }
});

//  Exportação para a Vercel 
module.exports = app;