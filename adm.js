const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Para servir o HTML

// Simulação de banco de dados (array na memória)
const funcionarios = [];

app.post('/cadastrar-funcionario', async (req, res) => {
    const { 'id-funcionario': id, senha } = req.body;

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Armazena o funcionário (em um "banco de dados" simulado)
    funcionarios.push({ id, senha: senhaHash });

    res.send('Funcionário cadastrado com sucesso!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});



function mostrarTela(id) {
    // Oculta todas as "telas"
    document.getElementById('tela-dashboard').style.display = 'none';
    document.getElementById('tela-cadastro').style.display = 'none';

    // Mostra a tela selecionada
    document.getElementById(id).style.display = 'block';
}

