const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fs = require('fs');
const path = require('path'); // Importa o módulo path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const organogramaDataPath = path.join(__dirname, 'organogramaData.json'); // Caminho correto

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

function loadOrganogramaData() {
    return new Promise((resolve, reject) => {
        fs.readFile(organogramaDataPath, 'utf8', (err, data) => {
            if (err) {
                return reject(err);
            }
            resolve(JSON.parse(data));
        });
    });
}

function saveOrganogramaData(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(organogramaDataPath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

let organogramaData = [];

app.get('/api/carregar', (req, res) => {
    loadOrganogramaData()
        .then(data => {
            organogramaData = data;
            res.status(200).json({ dados: organogramaData });
        })
        .catch(err => {
            console.error('Erro ao carregar dados:', err);
            res.status(500).json({ message: 'Erro ao carregar dados' });
        });
});

app.post('/api/salvar', (req, res) => {
    const { dados } = req.body;

    console.log("Dados recebidos no backend:", dados);

    if (!dados || !Array.isArray(dados)) {
        return res.status(400).json({ message: 'Dados inválidos!' });
    }

    organogramaData = dados;

    console.log("Tentando salvar os dados:", organogramaData);

    saveOrganogramaData(organogramaData)
        .then(() => {
            res.status(200).json({ message: 'Dados salvos com sucesso!' });
        })
        .catch(err => {
            console.error('Erro ao salvar dados:', err);
            res.status(500).json({ message: 'Erro ao salvar dados' });
        });
});

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

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
