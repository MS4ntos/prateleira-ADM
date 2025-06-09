import { salvarFuncionario } from './admfirebase.js';

const menuLinks = document.querySelectorAll('.side-menu a');
const telas = ['tela-dashboard', 'tela-cadastro', 'tela-funcionarios'];


let listaFuncionarios = carregarFuncionariosDoLocalStorage();
exibirFuncionariosNaTela(listaFuncionarios);

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
  carregarFuncionariosDoFirebase().then(renderizarListaFuncionarios);
}
  }
}

mostrarTela('tela-dashboard');

function renderizarListaFuncionarios(lista) {
  const container = document.getElementById('lista-funcionarios');
  container.innerHTML = '';

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
    img.src = f.foto || '';
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

    const btnRemover = document.createElement('button');
    btnRemover.textContent = "Remover";
    btnRemover.style.padding = '5px 10px';
    btnRemover.style.border = 'none';
    btnRemover.style.backgroundColor = '#e74c3c';
    btnRemover.style.color = 'white';
    btnRemover.style.borderRadius = '5px';
    btnRemover.style.cursor = 'pointer';

    btnRemover.addEventListener('click', async () => {
      const confirmar = confirm(`Deseja remover ${f.nome}?`);
      if (!confirmar) return;

      try {
        await removerFuncionario(f.id);
      } catch (erro) {
        console.warn("Erro ao remover do Firebase (pode ser local):", erro);
      }

      listaFuncionarios.splice(index, 1);
      salvarFuncionariosNoLocalStorage();
      renderizarListaFuncionarios(listaFuncionarios);
    });

    infoContainer.appendChild(img);
    infoContainer.appendChild(texto);
    div.appendChild(infoContainer);
    div.appendChild(btnRemover);
    container.appendChild(div);
  });
}



// Prévias de imagem
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




// Cadastro de funcionário com Firestore
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

  const reader = new FileReader();
  reader.onload = function () {
    const fotoBase64 = reader.result;

    salvarFuncionario(fotoBase64, nome, cargo, data).then((id) => {
  if (!id) return; // se deu erro, não continua

  const novoFuncionario = { id, nome, cargo, data, foto: fotoBase64 };
  listaFuncionarios.push(novoFuncionario);
  salvarFuncionariosNoLocalStorage();
  renderizarListaFuncionarios(listaFuncionarios);

  document.getElementById('form-cadastro').reset();
  document.getElementById('preview-foto').style.display = 'none';
  mostrarTela('tela-funcionarios');
});
  };

  reader.readAsDataURL(fotoInput.files[0]);
});




function logout() {
  alert("Logout efetuado!");
  window.location.href = '../Tela_login/login.html';
}

// Tela inicial
mostrarTela('tela-dashboard');




function salvarFuncionariosNoLocalStorage() {
  localStorage.setItem('funcionarios', JSON.stringify(listaFuncionarios));
}

function carregarFuncionariosDoLocalStorage() {
  const dados = localStorage.getItem('funcionarios');
  return dados ? JSON.parse(dados) : [];
}




function adicionarFuncionario(funcionario) {
  listaFuncionarios.push(funcionario);
  salvarFuncionariosNoLocalStorage();
}

document.addEventListener('DOMContentLoaded', () => {
  const campoBusca = document.getElementById('busca-funcionario');

  campoBusca.addEventListener('input', filtrarFuncionarios);

  carregarFuncionariosDoLocalStorage();
  exibirFuncionariosNaTela(listaFuncionarios);
});




function exibirFuncionariosNaTela(funcionarios) {
  const container = document.getElementById('lista-funcionarios');
  container.innerHTML = '';

  funcionarios.forEach((func, index) => {
    const item = document.createElement('div');
    item.classList.add('card-funcionario');

   renderizarListaFuncionarios(funcionarios);
    container.appendChild(item);
  });

  // Adiciona os eventos aos botões de remover
  const botoesRemover = document.querySelectorAll('.btn-remover');
  botoesRemover.forEach(botao => {
    botao.addEventListener('click', () => {
      const index = botao.getAttribute('data-index');
      removerFuncionario(index);
    });
  });
}




function removerFuncionario(index) {
  if (confirm('Tem certeza que deseja remover este funcionário?')) {
    listaFuncionarios.splice(index, 1); // Remove da lista
    salvarFuncionariosNoLocalStorage(); // Atualiza o localStorage
    exibirFuncionariosNaTela(listaFuncionarios); // Atualiza a tela
  }
}




function filtrarFuncionarios() {
  const termo = document.getElementById('busca-funcionario').value.toLowerCase();

  // Se a lista ainda não estiver carregada, não faz nada
  if (!Array.isArray(listaFuncionarios)) return;

  // Se campo vazio, mostra todos
  if (termo.trim() === '') {
    exibirFuncionariosNaTela(listaFuncionarios);
    return;
  }

  // Filtro por nome OU cargo
  const filtrados = listaFuncionarios.filter(func => {
    const nome = func.nome ? func.nome.toLowerCase() : '';
    const cargo = func.cargo ? func.cargo.toLowerCase() : '';
    return nome.includes(termo) || cargo.includes(termo);
  });

  exibirFuncionariosNaTela(filtrados);
}
