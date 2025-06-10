const shelves = [


    
];

function getProgressBarColor(usagePercentage) {
    if (typeof usagePercentage !== 'number' || usagePercentage < 0 || usagePercentage > 100) {
        return 'gray'; // cor padrão para erro
    }

    if (usagePercentage <= 30) {
        return 'red';
    } else if (usagePercentage <= 60) {
        return 'yellow';
    } else {
        return 'green';
    }
}

function createShelfCard(shelf) {
    const pesoAtual = shelf.pesoAtual || 0;
    const capacity = shelf.capacidade || 1; // Evitar divisão por zero
    const usagePercentage = shelf.porcentagem || 0;
    const progressBarColor = getProgressBarColor(usagePercentage);

    const barra = document.getElementById('barra');
  barra.style.width = `${usagePercentage}%`;
  barra.style.backgroundColor = progressBarColor;

    const card = document.createElement('div');
    card.className = 'shelf-card';

    card.innerHTML = `
        <div class="shelf-header">
            <h2>${shelf.nome}</h2>
        </div>
        <div class="shelf-content">
            <div class="shelf-info">
                <div>
                    <span>Capacidade:</span>
                    <span>${capacity} kg</span>
                </div>
                <div>
                    <span>Em uso:</span>
                  <span id="peso-atual-${shelf.id}">
  ${
    !pesoAtual || Number(pesoAtual) === 0
      ? '0 kg'
      : Number(pesoAtual) < 1
        ? `${(Number(pesoAtual) * 1000).toLocaleString('pt-BR')} g`
        : `${Number(pesoAtual).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`
  }
</span>

                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" 
                     style="width: ${usagePercentage}%; background-color: ${progressBarColor}">
                </div>
            </div>
            <div class="usage-text">
                ${usagePercentage}% utilizado
            </div>
        </div>
    `;

    return card;
}


function formatarPesoSeguro(peso) {
  const valor = Number(peso);
  if (!valor || valor === 0) return '0 kg';
  if (valor < 1) return `${(valor * 1000).toLocaleString('pt-BR')} g`;
  return `${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`;
}


function atualizarSelectPrateleiras() {
  const select = document.getElementById('selecionar-prateleira');
  select.innerHTML = ''; // Limpa opções anteriores

  shelves.forEach(shelf => {
    const option = document.createElement('option');
    option.value = shelf.id;
    option.textContent = shelf.nome;
    select.appendChild(option);
  });
}


function filtrarPorPesoLimite() {
  const input = document.getElementById('peso-limite');
  const limite = parseFloat(input.value);

  if (isNaN(limite)) {
    alert('Digite um valor numérico válido!');
    return;
  }

  const prateleirasFiltradas = shelves.filter(shelf => shelf.pesoAtual > limite);
  renderShelvesCustom(prateleirasFiltradas);
}


function renderShelvesCustom(listaFiltrada) {
  const container = document.getElementById('shelves-container');
  container.innerHTML = '';
  listaFiltrada.forEach(shelf => {
    container.appendChild(createShelfCard(shelf));
  });
}



function renderShelves(corFiltro = 'todas') {
  const container = document.getElementById('shelves-container');
  container.innerHTML = '';

  const prateleirasFiltradas = shelves.filter(shelf => {
    const cor = getProgressBarColor(shelf.porcentagem || 0);
    return corFiltro === 'todas' || cor === corFiltro;
  });

  prateleirasFiltradas.forEach(shelf => {
    container.appendChild(createShelfCard(shelf));
  });
}



function filtrarShelvesPorCor(cor) {
  renderShelves(cor);
}


function atualizarCapacidade() {
  const select = document.getElementById('selecionar-prateleira');
  const novaCapacidade = parseFloat(document.getElementById('nova-capacidade').value);

  if (!select.value || isNaN(novaCapacidade) || novaCapacidade <= 0) {
    alert("Selecione uma prateleira válida e digite uma nova capacidade positiva.");
    return;
  }

  const prateleiraId = select.value;

  // Atualiza no Firebase
  database.ref(`Prateleira/${prateleiraId}`).update({
    capacidade: novaCapacidade
  }).then(() => {
    alert("Capacidade atualizada com sucesso!");
    atualizarPesoAtual(); // Recarrega os dados na tela
  }).catch((error) => {
    console.error("Erro ao atualizar capacidade:", error);
    alert("Erro ao atualizar capacidade.");
  });
}




function atualizarPesoAtual() {
    const shelvesRef = database.ref("Prateleira");

    shelvesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log("Dados recebidos do Firebase:", data);
        
        if (data) {
            shelves.length = 0; // Clear existing shelves array
           for (const id in data) {
  if (data.hasOwnProperty(id)) {
    console.log(`Prateleira ${id} - pesoAtual:`, data[id].pesoAtual);

    shelves.push({
      id: id,
      nome: data[id].nome || `Prateleira ${id}`,
      pesoAtual: data[id].pesoAtual || 0,
      capacidade: data[id].capacidade || 1,
      porcentagem: data[id].porcentagem || 0
    });
  }
}

            renderShelves();
            atualizarSelectPrateleiras();
        }
    }, (error) => {
        console.error("Erro ao acessar o Firebase:", error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarPesoAtual();
});

const firebaseConfig = {
    apiKey: "AIzaSyApF1lrZDydzkoAyc3jtudDxdlGTysON2Q",
    authDomain: "esp32-6fe25.firebaseapp.com",
    databaseURL: "https://esp32-6fe25-default-rtdb.firebaseio.com",
    projectId: "esp32-6fe25",
    storageBucket: "esp32-6fe25.firebasestorage.app",
    messagingSenderId: "357944367709",
    appId: "1:357944367709:web:6ad04ad636cc4c97b94bb4"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();









 





