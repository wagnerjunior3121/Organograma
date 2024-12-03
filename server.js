const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Pool } = require('pg');  // Importando o Pool do pacote pg
const path = require('path');    // Importando o módulo path para uso no caminho do arquivo

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Configurando a conexão com o PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,  // URL de conexão ao banco de dados (adicionada ao .env)
    ssl: {
        rejectUnauthorized: false
    }
});

const organogramaDataPath = path.join(__dirname, 'organogramaData.json'); // Caminho correto

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// Endpoint para carregar os dados
app.get('/api/carregar', async (req, res) => {
    try {
        const result = await pool.query('SELECT dados FROM organograma ORDER BY created_at DESC LIMIT 1');
        const dados = result.rows[0] ? result.rows[0].dados : [];
        res.status(200).json({ dados });
    } catch (err) {
        console.error('Erro ao carregar dados do banco:', err);
        res.status(500).json({ message: 'Erro ao carregar dados' });
    }
});

// Endpoint para salvar os dados
app.post('/api/salvar', async (req, res) => {
    const { dados } = req.body;

    if (!dados || !Array.isArray(dados)) {
        return res.status(400).json({ message: 'Dados inválidos!' });
    }

    try {
        await pool.query('INSERT INTO organograma (dados) VALUES ($1)', [JSON.stringify(dados)]);
        res.status(200).json({ message: 'Dados salvos com sucesso!' });
    } catch (err) {
        console.error('Erro ao salvar dados no banco:', err);
        res.status(500).json({ message: 'Erro ao salvar dados' });
    }
});

// Endpoint para retornar uma lista de usuários (com credenciais do .env)
app.get('/users', (req, res) => {
    const users = [
        { username: process.env.USERNAME_CRISTIANO, password: process.env.PASSWORD_CRISTIANO },
        { username: process.env.USERNAME_TIAGOP, password: process.env.PASSWORD_TIAGOP },
        { username: process.env.USERNAME_FERNANDO, password: process.env.PASSWORD_FERNANDO },
        { username: process.env.USERNAME_LINDOMAR, password: process.env.PASSWORD_LINDOMAR },
        { username: process.env.USERNAME_LUCAS, password: process.env.PASSWORD_LUCAS },
        { username: process.env.USERNAME_PAULO, password: process.env.PASSWORD_PAULO },
        { username: process.env.USERNAME_STEFANO, password: process.env.PASSWORD_STEFANO },
        { username: process.env.USERNAME_TIAGOROBERTO, password: process.env.PASSWORD_TIAGOROBERTO },
    ];

    res.json(users);
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
