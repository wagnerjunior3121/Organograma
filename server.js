const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000; 

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
    { key: 9, parent: 2, name: "Adriano Quiderolli", title: "Eletricista III", department: "Planta Trio - 2º Turno", color: "red"},
    { key: 10, parent: 2, name: "Anísio da Silva Vieira", title: "Mecânico de Manutenção III", department: "Planta Trio - 2º Turno", color: "red" },
    { key: 11, parent: 2, name: "Carlos Roberto Mendes Batista", title: "Mecânico de Manutenção II", department: "Planta Trio - 2º Turno", color: "red" },
    { key: 12, parent: 2, name: "Carmelindo Evangelista de Pina", title: "Mecânico de Manutenção II", department: "Planta Trio - 2° Turno", color: "red" },
    { key: 13, parent: 2, name: "Clayton Werneck de Matos", title: "Mecânico de Manutenção III", department: "Planta Trio - 2° Turno", color: "red" },
    { key: 14, parent: 2, name: "Élio de Andrade Silva", title: "Eletricista III", department: "Planta Trio - 2° Turno", color: "red" },
    { key: 15, parent: 3, name: "Alex Sandro Paulino Meireles", title: "Eletricista II", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 16, parent: 3, name: "Alexandre Santos", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 17, parent: 3, name: "Anésio Pinheiro de Souza", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 18, parent: 3, name: "Ederson Barbosa da Silva", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 2° Turno", color: "blue"  },
    { key: 19, parent: 3, name: "Gabriel Nascimento Luiz", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 20, parent: 3, name: "Johny do Nascimento Domingos", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 21, parent: 3, name: "Luiz Carlos Dutra", title: "Eletricista II", department: "Semi-Acabado - 2º Turno (12/36)", color: "blue" },
    { key: 22, parent: 3, name: "Osmar Rodrigues", title: "Eletricista III", department: "Semi-Acabado - 2° Turno", color: "blue" },
    { key: 23, parent: 4, name: "Ademir Xavier", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 3º Turno (12/36)", color: "green" },
    { key: 24, parent: 4, name: "Alyson de Lima Prates", title: "Monitor de Manutenção", department: "Manutenção - 3º Turno", color: "green" },
    { key: 25, parent: 4, name: "André Carvalho dos Santos", title: "Auxiliar de Manutenção (Higienizador)", department: "Planta Trio - 3º Turno - Higienização", color: "green" },
    { key: 26, parent: 4, name: "Clécio Aparecido Joaquim", title: "Eletricista III", department: "Semi-Acabado - 3° Turno", color: "green" },
    { key: 27, parent: 4, name: "David Sampaio da Silva", title: "Eletricista II", department: "Planta Trio - 3º Turno", color: "green" },
    { key: 28, parent: 4, name: "Denilson Aparecido dos Santos", title: "Auxiliar de Manutenção (Higienizador)", department: "Higienização - 3º Turno", color: "green" },
    { key: 29, parent: 4, name: "Djailson Alves de Sousa", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 3º Turno (12/36)", color: "green" },
    { key: 30, parent: 4, name: "Ernandes Aparecido das Neves", title: "Mecânico de Manutenção II", department: "Planta Trio - 3º Turno", color: "green" },
    { key: 31, parent: 4, name: "Guilherme Hermes Martins", title: "Auxiliar de Manutenção (Higienizador)", department: "Higienização - 3º Turno", color: "green" },
    { key: 32, parent: 4, name: "José Augusto Ferreira dos Santos", title: "Auxiliar de Manutenção (Higienizador)", department: "Higienização - 3º Turno", color: "green" },
    { key: 33, parent: 4, name: "José Carlos Alves Ferreira", title: "Mecânico de Manutenção II", department: "Planta Trio - 3º Turno", color: "green" },
    { key: 34, parent: 4, name: "José Heitor Santana", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 3º Turno", color: "green" },
    { key: 35, parent: 4, name: "José Justino dos Santos", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 3° Turno", color: "green" },
    { key: 36, parent: 4, name: "Kleberson Henrique Meira", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 3° Turno", color: "green" },
    { key: 37, parent: 4, name: "Marcos Rodrigues Miller", title: "Torneiro II", department: "Tornearia - 3º Turno", color: "green" },
    { key: 38, parent: 4, name: "Matheus Brant dos Santos", title: "Auxiliar de Manutenção (Higienizador)", department: "Higienização - 3º Turno", color: "green" },
    { key: 39, parent: 4, name: "Michael Daves Gomes Ferreira", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 3º Turno", color: "green" },
    { key: 40, parent: 4, name: "Ricardo Luis Estevo", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 3º Turno", color: "green" },
    { key: 41, parent: 4, name: "Wilton Cesar Neves Costa", title: "Auxiliar de Manutenção (Higienizador)", department: "Higienização - 3º Turno", color: "green" },
    { key: 42, parent: 5, name: "Adriano dos Santos Carlos", title: "Mecânico de Manutenção III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 43, parent: 5, name: "Bruno Lima Lins", title: "Eletricista III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 44, parent: 5, name: "Hugo Cesar Trevizi", title: "Eletricista III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 45, parent: 5, name: "João Américo da Cruz Cortelazzi", title: "Mecânico de Manutenção II", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 46, parent: 5, name: "Leandro Tiago Paulo", title: "Mecânico de Manutenção III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 47, parent: 5, name: "Marcelo Ferraz da Silva", title: "Mecânico de Manutenção II", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 48, parent: 5, name: "Rafael Silva Manoel Zinezi", title: "Eletricista III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 49, parent: 5, name: "Thiago Luiz dos Santos", title: "Mecânico de Manutenção III", department: "Planta Trio - 1º Turno", color: "purple" },
    { key: 50, parent: 6, name: "Claudinei Francisco da Silva", title: "Eletricista III", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 51, parent: 6, name: "Cleverson Almeida de Sousa", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 52, parent: 6, name: "Israel Lucas Pereira da Silva", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 1º Turno (12/36)", color: "orange" },
    { key: 53, parent: 6, name: "José Aparecido dos Santos", title: "Mecânico de Manutenção II", department: "Semi-Acabado - 1º Turno (12/36)", color: "orange" },
    { key: 54, parent: 6, name: "Rogério Nicoleti", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 55, parent: 6, name: "Vagner Antônio Cavalcante", title: "Eletricista III", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 56, parent: 6, name: "Valdir Bazilio", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 57, parent: 6, name: "Walter Luiz de Paula", title: "Mecânico de Manutenção III", department: "Semi-Acabado - 1º Turno", color: "orange" },
    { key: 58, parent: 7, name: "André Luiz Nunes", title: "Mecânico de Manutenção II", department: "Área Externa - 2º Turno", color: "cyan" },
    { key: 59, parent: 7, name: "Antônio Fernandes Camargo", title: "Pedreiro", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 60, parent: 7, name: "Bruno Aparecido Camilo de Carvalho", title: "Eletricista III", department: "Área Externa - 1º Turno (12/36)", color: "cyan" },
    { key: 61, parent: 7, name: "Daniel de Carvalho", title: "Mecânico de Manutenção I", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 62, parent: 7, name: "Edevair Simplicio", title: "Pedreiro", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 63, parent: 7, name: "Edson Luis Modesto", title: "Mecânico de Manutenção III", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 64, parent: 7, name: "Eli Frank Bernardo Rodrigues", title: "Pintor", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 65, parent: 7, name: "Francisco Bernardo", title: "Soldador", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 66, parent: 7, name: "Jefferson Lucas Lima Nicolau", title: "Mecânico de Manutenção II (Refrigeração)", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 67, parent: 7, name: "João Henrique Silva de Oliveira", title: "Mecânico de Manutenção II", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 68, parent: 7, name: "José Chavier de Omena", title: "Mecânico de Manutenção II", department: "Área Externa - 2º Turno", color: "cyan" },
    { key: 69, parent: 7, name: "Leicester Carnavali Rodrigues", title: "Mecânico de Manutenção II (Empilhadeira)", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 70, parent: 7, name: "Lucas Cavalcante Andrade", title: "Eletricista II", department: "Área Externa - 1º Turno (12/36)", color: "cyan" },
    { key: 71, parent: 7, name: "Luiz Gustavo Rossigalli Mercado", title: "Mecânico de Manutenção III (Empilhadeira)", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 72, parent: 7, name: "Mario Augusto Onório Pereira", title: "Soldador", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 73, parent: 7, name: "Mauro Sérgio do Careno Junior", title: "Pintor", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 74, parent: 7, name: "Milton Santana", title: "Mecânico de Manutenção III", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 75, parent: 7, name: "Pedro José de Carvalho", title: "Pedreiro", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 76, parent: 7, name: "Sidnei Souza Galvão", title: "Pedreiro", department: "Área Externa - 1º Turno", color: "cyan" },
    { key: 77, parent: 8, name: "Gustavo Gabriel Antonucci", title: "Analista de Manutenção JR", department: "Manutenção - 1º Turno", color: "magenta" },
    { key: 78, parent: 1, name: "Cristiano Zavan", title: "Coordenador (CORP)", department: "Manutenção - 1º Turno", color: "black" },
    { key: 79, parent: 8, name: "Hugo da Cruz Siviero", title: "Analista de Manutenção JR", department: "Manutenção - 1º Turno", color: "magenta"  },
    { key: 80, parent: 8, name: "Luiz Antônio de Souza", title: "Torneiro I",  department: "Manutenção - 1º Turno", color: "magenta" },
    { key: 81, parent: 8, name: "Thiago Aparecido Mendes", title: "Torneiro I", department: "Manutenção - 2º Turno", color: "magenta" },
    { key: 82, parent: 8, name: "Vagner da Silva", title: "Mecânico de Manutenção I", department: "Manutenção - 1º Turno", color: "magenta" },
    { key: 83, parent: 78, name: "Guilherme Silva Mussato Antunes", title: "Estagiário", department: "Manutenção - 1º Turno", color: "black" },
    { key: 84, parent: 78, name: "Gustavo Henrique Peres Martinelli", title: "Analista de Manutenção JR", department: "Manutenção - 1º Turno", color: "black" },
    { key: 85, parent: 8, name: "Jhonatan Willian dos Santos", title: "Analista de Manutenção JR", department: "Manutenção - 1º Turno", color: "magenta" },
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
