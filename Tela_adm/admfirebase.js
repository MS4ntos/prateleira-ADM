import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Função para cadastrar
async function salvarFuncionario(fotoBase64, nome, cargo, data) {
  try {
    const docRef = await addDoc(collection(db, "funcionarios"), {
      nome,
      cargo,
      data,
      foto: fotoBase64
    });
    alert("Funcionário cadastrado com sucesso!");
    return docRef.id; // <-- retorna o ID do documento salvo
  } catch (e) {
    console.error("Erro ao adicionar funcionário: ", e);
    alert("Erro ao cadastrar funcionário.");
    return null; // ou undefined, para indicar falha
  }
}



// ✅ Função para carregar
 async function carregarFuncionarios() {
  const funcionarios = [];
  const querySnapshot = await getDocs(collection(db, "funcionarios"));
  querySnapshot.forEach((doc) => {
    funcionarios.push({ id: doc.id, ...doc.data() });
  });
  return funcionarios;
}
async function removerFuncionario(id) {
  try {
    await deleteDoc(doc(db, "funcionarios", id));
  } catch (e) {
    console.error("Erro ao remover funcionário: ", e);
    throw e; // pode propagar o erro para tratar depois
  }
}



async function carregarFuncionariosDoFirebase() {
  const funcionarios = [];
  const querySnapshot = await getDocs(collection(db, "funcionarios"));

  querySnapshot.forEach((doc) => {
    funcionarios.push({ id: doc.id, ...doc.data() });
  });

  // Atualiza a lista local e salva no localStorage
  listaFuncionarios = funcionarios;
  salvarFuncionariosNoLocalStorage();
  return funcionarios;
}

// ✅ Exporta as duas
export { salvarFuncionario, carregarFuncionarios, removerFuncionario, carregarFuncionariosDoFirebase };