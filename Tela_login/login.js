// Função para verificar o login ao enviar o formulário
function verificarLogin(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  const usuario = document.getElementById('funcionario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  // Verificação de administrador
  if (usuario === 'admin' && senha === '123456') {
   window.location.href = '../Tela_adm/adm.html'; // Redireciona para tela de administrador
    return;
  }

  // Lista de funcionários autorizados (simulada localmente)
  const funcionariosAutorizados = [
    { id: 'joao123', senha: 'abc123' },
    { id: 'maria456', senha: 'xyz789' },
    // Adicione mais aqui se quiser
  ];

  // Verifica se o usuário e senha estão corretos
  const funcionarioValido = funcionariosAutorizados.find(
    f => f.id === usuario && f.senha === senha
  );

  if (funcionarioValido) {
    window.location.href = 'index.html'; // Redireciona para painel de funcionário
  } else {
    alert('ID ou senha inválidos.');
  }
}

// Função de logout (para ser chamada em outras páginas)
function logout() {
  // Aqui você pode também limpar dados do localStorage, se usar
  window.location.href = 'login.html'; // Redireciona para tela de login
}






const adminUser = {
  username: 'admin',
  password: '123456'
};

document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === adminUser.username && password === adminUser.password) {
    // Redireciona para a tela admin
  window.location.href = '../Tela_adm/adm.html';
  } else {
    alert('Usuário ou senha incorretos!');
  }
});