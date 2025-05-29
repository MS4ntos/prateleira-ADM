const firebaseConfig = {
    apiKey: "AIzaSyBIq18Z5Fl4wQzTz1yTVuCmLWdCmQol2Uw",
    authDomain: "dashboard-da26e.firebaseapp.com",
    databaseURL: "https://dashboard-da26e-default-rtdb.firebaseio.com",
    projectId: "dashboard-da26e",
    storageBucket: "dashboard-da26e.firebasestorage.app",
    messagingSenderId: "635053550607",
    appId: "1:635053550607:web:7f92fe33b4338d2695c77a",
    measurementId: "G-1PLTBHB19X"
  };
  // Inicializa o Firebase
  firebase.initializeApp(firebaseConfig);

  // Referência ao Firestore
  const db = firebase.database(); // ✅ CORRETO




  function converterImagemParaBase64(inputFile, callback) {
    const reader = new FileReader();
    reader.onload = function () {
      callback(reader.result); // resultado é base64
    };
    reader.readAsDataURL(inputFile);
  }

  // Lida com envio do formulário
  document.getElementById('form-funcionario').addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cargo = document.getElementById('cargo').value;
    const data = document.getElementById('data').value;
    const fotoInput = document.getElementById('foto');

    if (fotoInput.files.length === 0) {
      alert("Selecione uma foto.");
      return;
    }

    converterImagemParaBase64(fotoInput.files[0], function (fotoBase64) {
      const funcionario = {
        nome,
        cargo,
        data,
        foto: fotoBase64
      };

      // Envia para o Firebase
      db.ref('funcionarios').push(funcionario)
        .then(() => {
          alert('Funcionário cadastrado com sucesso!');
          // Aqui você pode atualizar a lista na tela, se quiser
          // renderizarListaFuncionarios([...listaFuncionarios, funcionario]);
        })
        .catch((erro) => {
          console.error('Erro ao salvar funcionário:', erro);
        });
    });
  });