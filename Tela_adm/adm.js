
  const menuLinks = document.querySelectorAll('.side-menu a');
  const telas = ['tela-dashboard', 'tela-cadastro', 'tela-funcionarios'];
  const listaFuncionarios = [];

  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      menuLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      const tela = this.getAttribute('data-tela');
      mostrarTela(tela);
    });
  });

  function mostrarTela(id) {
    telas.forEach(t => {
      document.getElementById(t).style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';

    if (id === 'tela-funcionarios') {
      renderizarListaFuncionarios();
    }
  }

  // FUNÇÃO DE CADASTRO COM FOTO
  document.getElementById('form-cadastro').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('id-funcionario').value.trim();
    const senha = document.getElementById('senha').value;
    const fotoInput = document.getElementById('foto-funcionario');
    const foto = fotoInput.files[0];

    if (!id || !senha || !foto) {
      alert('Preencha todos os campos.');
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      // Adiciona o funcionário com a foto base64
      listaFuncionarios.push({
        id,
        fotoBase64: reader.result
      });

      // Limpa o formulário
      document.getElementById('form-cadastro').reset();
      document.getElementById('preview-foto').style.display = 'none';

      // Mostra tela de funcionários
      mostrarTela('tela-funcionarios');
    };

    reader.readAsDataURL(foto);
  });

  // FUNÇÃO PARA MOSTRAR FUNCIONÁRIOS
  function renderizarListaFuncionarios() {
    const ul = document.getElementById('lista-funcionarios');
    ul.innerHTML = '';

    listaFuncionarios.forEach((f, index) => {
      const li = document.createElement('li');
      li.style.marginBottom = '15px';
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.gap = '10px';

      const img = document.createElement('img');
      img.src = f.fotoBase64;
      img.style.maxWidth = '100px';
      img.style.borderRadius = '8px';

      const span = document.createElement('span');
      span.textContent = `Funcionário ${index + 1}: ${f.id}`;

      li.appendChild(img);
      li.appendChild(span);
      ul.appendChild(li);
    });
  }

  // FUNÇÃO PARA PRÉ-VISUALIZAR A FOTO
  function previewFoto() {
    const input = document.getElementById('foto-funcionario');
    const preview = document.getElementById('preview-foto');

    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // Tela inicial
  mostrarTela('tela-dashboard');




 // bbotao excluir funcionarios
  const excluirBtn = document.createElement('button');
excluirBtn.innerHTML = '🗑️';
excluirBtn.onclick = () => {
  listaFuncionarios.splice(index, 1);
  renderizarListaFuncionarios();
};




function filtrarFuncionarios() {
  const termo = document.getElementById('busca-funcionario').value.toLowerCase();
  const filtrados = listaFuncionarios.filter(func =>
    func.nome.toLowerCase().includes(termo)
  );
  renderizarListaFuncionarios(filtrados);
}






  function logout() {
      alert("Logout efetuado!");
      // Redirecione se desejar:
       window.location.href = '../Tela_login/login.html';
    }

    // Navegação entre telas
    document.querySelectorAll('[data-tela]').forEach(btn => {
      btn.addEventListener('click', () => {
        const telas = ['tela-dashboard', 'tela-cadastro', 'tela-funcionarios'];
        telas.forEach(tela => document.getElementById(tela).style.display = 'none');
        const telaSelecionada = btn.getAttribute('data-tela');
        document.getElementById(telaSelecionada).style.display = 'block';

        // Ativa/Desativa menu
        document.querySelectorAll('.side-menu a').forEach(link => link.classList.remove('active'));
        btn.classList.add('active');
      });
    });