// Arquivo: api/index.js

const express = require('express');
const cors = require('cors');

const app = express();
// Adicione isso ao final de api/index.js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor da API rodando em http://localhost:${PORT}`);
});


app.use(cors());
app.use(express.json());

// bd
let scores = [
    { name: 'Alan', score: 10 },
    { name: 'Ana', score: 30 },
    { name: 'Luis', score: 25 }
];

// --- Algoritmo de Ordenação: QuickSort ---
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

// --- Rotas da API ---

// Rota GET /api/ranking
app.get('/api/ranking', (req, res) => {
    console.log('GET /api/ranking - Solicitado ranking...');
    const sortedScores = quickSort([...scores], 'score');
    res.json(sortedScores.slice(0, 10));
});

// Rota POST /api/scores
app.post('/api/scores', (req, res) => {
    const { name, score } = req.body;
    console.log(req.body);
    if (!name || typeof score !== 'number') {
        return res.status(400).json({ message: 'Dados inválidos.' });
    }
    const newScore = { name, score };
    scores.push(newScore);
    console.log('POST /api/scores - Novo score adicionado:', newScore);
    res.status(201).json({ message: 'Score adicionado com sucesso!' });
});

// Rota DELETE /api/ranking
app.delete('/api/ranking', (req, res) => {
    scores = []; // Esvazia o array
    console.log('DELETE /api/ranking - Ranking foi resetado.');
    res.status(200).json({ message: 'Ranking resetado com sucesso!' });
});

module.exports = app;