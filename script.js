const shelves = [


    
];

function getProgressBarColor(usagePercentage) {
    if (usagePercentage >= 0 && usagePercentage <= 30) {
        return 'red'; // Vermelho para 0-30%
    } else if (usagePercentage > 30 && usagePercentage <= 60) {
        return 'yellow'; // Amarelo para 31-60%
    } else {
        return 'green'; // Verde para 61-100%
    }
}

function createShelfCard(shelf) {
    const pesoAtual = shelf.pesoAtual || 0;
    const capacity = shelf.capacidade || 1; // Evitar divisão por zero
    const usagePercentage = shelf.porcentagem || 0;
    const progressBarColor = getProgressBarColor(usagePercentage);

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
                    <span>${capacity}</span>
                </div>
                <div>
                    <span>Em uso:</span>
                    <span id="peso-atual-${shelf.id}">${pesoAtual} kg</span>
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

function renderShelves() {
    const container = document.getElementById('shelves-container');
    container.innerHTML = '';
    shelves.forEach(shelf => {
        container.appendChild(createShelfCard(shelf));
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
                    shelves.push({
                        id: id,
                        nome: data[id].nome || `Prateleira ${id}`,
                        pesoAtual: data[id].pesoAtual || 0,
                        capacidade: data[id].capacidade || '1kg',
                        porcentagem: data[id].porcentagem || 0
                    });
                }
            }
            renderShelves();
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


 function verificarLogin(event) {
      event.preventDefault();

      const usuario = document.getElementById('funcionario').value.trim();
      const senha = document.getElementById('senha').value.trim();

      // Lista de funcionários válidos
      const usuarios = {
        joao123: '1234',
        maria2024: 'senhaSegura',
        admin: 'admin123'
      };

      if (usuarios[usuario] && usuarios[usuario] === senha) {
        // Redireciona para a tela principal (index.html)
        window.location.href = 'index.html';
      } else {
        alert('ID ou senha incorretos!');
      }
    }

     function logout() {
    // Limpa dados (se tiver) e volta para a tela de login
    window.location.href = 'login.html';
  }