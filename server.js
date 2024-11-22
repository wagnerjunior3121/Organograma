const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors()); 
app.use(express.json()); 
app.use(express.static('public')); 

let organogramaData = [
    { key: 1, name: "Cristiano Zavan", title: "Coordenador", department: "Manutenção", color: "white" },
    { key: 2, parent: 1, name: "Fernando Barbeiro", title: "Supervisor - Planta Trio", department: "Manutenção - 2° Turno", color: "red" },
    { key: 3, parent: 1, name: "Lindomar Freire", title: "Supervisor - Semi-Acabado", department: "Manutenção - 2° Turno", color: "blue" },
    { key: 4, parent: 1, name: "Lucas Cruzeiro", title: "Supervisor", department: "Manutenção - 3° Turno", color: "green" },
    { key: 5, parent: 1, name: "Paulo Roberto", title: "Supervisor - Planta Trio", department: "Manutenção - 1° Turno", color: "purple" },
    { key: 6, parent: 1, name: "Stefano Danilo", title: "Supervisor - Semi-Acabado", department: "Manutenção - 1° Turno", color: "orange" },
    { key: 7, parent: 1, name: "Tiago Roberto", title: "Supervisor - Área Externa", department: "Manutenção - 1° Turno", color: "cyan" },
    { key: 8, parent: 1, name: "Tiago Passos", title: "Supervisor - PCM", department: "Manutenção - 1° Turno", color: "magenta" },
  ];

  app.post('/api/salvar', (req, res) => {
    const { dados } = req.body;

    console.log("Dados recebidos no backend:", dados);

    if (!dados || !Array.isArray(dados)) {
        return res.status(400).json({ message: 'Dados inválidos!' });
    }

    organogramaData = dados; 
    res.status(200).json({ message: 'Dados salvos com sucesso!' });
});

app.get('/api/carregar', (req, res) => {
    res.status(200).json({ dados: organogramaData });
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
