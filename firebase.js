// firebase.js

// Your Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHv19dThRHf8ZL0XVnTeGftUOmP1RkgSQ",
    authDomain: "class-d4f9b.firebaseapp.com",
    databaseURL: "https://class-d4f9b-default-rtdb.firebaseio.com",
    projectId: "class-d4f9b",
    storageBucket: "class-d4f9b.firebasestorage.app",
    messagingSenderId: "119551430571",
    appId: "1:119551430571:web:426e3df057c31c37f78cee",
    measurementId: "G-9173ZZ5MXK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference to the database
  const db = firebase.database();
  
  // Handle form submit
  document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Get form values
    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const submissionStatus = document.getElementById("submissionStatus").value;
    const projectName = document.getElementById("projectName").value;
  
    // Push data to Firebase
    const studentRef = db.ref("students").push();
    studentRef.set({
      name: name,
      rollNo: rollNo,
      submissionStatus: submissionStatus,
      projectName: projectName
    })
    .then(() => {
      alert("Student data added!");
      document.getElementById("studentForm").reset();
    })
    .catch((error) => {
      alert("Error: " + error);
    });
  });
  