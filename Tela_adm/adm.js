
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
      const elemento = document.getElementById(t);
      if (elemento) elemento.style.display = 'none';
    });
  
    const telaSelecionada = document.getElementById(id);
    if (telaSelecionada) {
      telaSelecionada.style.display = 'block';
  
      if (id === 'tela-funcionarios') {
        renderizarListaFuncionarios();
      }
    }
  }




  // FUNÇÃO DE CADASTRO COM FOTO
  document.getElementById('form-cadastro').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const nome = document.getElementById('nome-funcionario').value;
    const data = document.getElementById('data-cadastro').value;
    const cargo = document.getElementById('cargo-funcionario').value;
    const fotoInput = document.getElementById('foto-funcionario');
  
    if (fotoInput.files.length === 0) {
      alert("Selecione uma foto.");
      return;
    }
  
    // Converte a imagem para base64
    const reader = new FileReader();
    reader.onload = function () {
      const fotoBase64 = reader.result;
  
      const novoFuncionario = {
        nome: nome,
        data: data,
        cargo: cargo,
        foto: fotoBase64
      };
  
      
      const db = firebase.database().ref('funcionarios').push(novoFuncionario)
        .then(() => {
          alert('Funcionário cadastrado com sucesso!');
          document.getElementById('form-cadastro').reset();
          document.getElementById('preview-foto').style.display = 'none';
        })
        .catch((erro) => {
          console.error('Erro ao cadastrar funcionário:', erro);
          alert('Erro ao cadastrar funcionário');
        });
    };
  
    reader.readAsDataURL(fotoInput.files[0]);//
  });






  // FUNÇÃO PARA MOSTRAR FUNCIONÁRIOS
  function renderizarListaFuncionarios(funcionariosFiltrados = null) {
    const container = document.getElementById('lista-funcionarios');
    container.innerHTML = '';
  
    const lista = funcionariosFiltrados || listaFuncionarios;
  
    lista.forEach((f, index) => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.justifyContent = 'space-between';
      div.style.gap = '15px';
      div.style.border = '1px solid #ddd';
      div.style.padding = '10px';
      div.style.borderRadius = '8px';
  
      const infoContainer = document.createElement('div');
      infoContainer.style.display = 'flex';
      infoContainer.style.alignItems = 'center';
      infoContainer.style.gap = '15px';
  
      const img = document.createElement('img');
      img.src = f.foto || f.fotoBase64 || '';
      img.style.width = '60px';
      img.style.height = '60px';
      img.style.objectFit = 'cover';
      img.style.borderRadius = '50%';
  
      const texto = document.createElement('div');
      texto.innerHTML = `
        <strong>${f.nome || 'Sem Nome'}</strong><br>
        Cargo: ${f.cargo || 'N/A'}<br>
        Data de Cadastro: ${f.data || 'N/A'}
      `;
  
      infoContainer.appendChild(img);
      infoContainer.appendChild(texto);
  
      const excluirBtn = document.createElement('button');
      excluirBtn.innerHTML = '🗑️';
      excluirBtn.style.cursor = 'pointer';
      excluirBtn.style.border = 'none';
      excluirBtn.style.background = 'transparent';
      excluirBtn.style.fontSize = '20px';
      excluirBtn.title = 'Excluir Funcionário';
      excluirBtn.onclick = () => {
        const indexOriginal = listaFuncionarios.findIndex(func => func === f);
        if (indexOriginal > -1) {
          listaFuncionarios.splice(indexOriginal, 1);
          renderizarListaFuncionarios();
        }
      };
  
      div.appendChild(infoContainer);
      div.appendChild(excluirBtn);
  
      container.appendChild(div);
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



  listaFuncionarios.forEach((funcionario, index) => {
    const excluirBtn = document.createElement('button');
    excluirBtn.innerHTML = '🗑️';
    excluirBtn.onclick = () => {
      listaFuncionarios.splice(index, 1);
      renderizarListaFuncionarios();
    };
    // aqui você adicionaria o botão no DOM, por exemplo:
    algumElemento.appendChild(excluirBtn);
  });
  





  function filtrarFuncionarios() {
    const termo = document.getElementById('busca-funcionario').value.toLowerCase();
    const filtrados = listaFuncionarios.filter(f =>
      f.nome.toLowerCase().includes(termo) || f.cargo.toLowerCase().includes(termo)
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









