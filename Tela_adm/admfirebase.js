const firebaseConfig = {
    apiKey: "AIzaSyBIq18Z5Fl4wQzTz1yTVuCmLWdCmQol2Uw",
    authDomain: "dashboard-da26e.firebaseapp.com",
    databaseURL: "https://dashboard-da26e-default-rtdb.firebaseio.com",
    projectId: "dashboard-da26e",
    storageBucket: "dashboard-da26e.appspot.com",
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

 