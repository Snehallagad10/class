// app.js

// Function to add student details to Firestore
function addStudentDetails(name, rollNo, course, email) {
    db.collection("students").add({
      name: name,
      rollNo: rollNo,
      
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      alert("Student details added successfully!");
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("Error adding student details.");
    });
  }
  
  // Handle form submission
  document.getElementById("studentForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page
    
    const name = document.getElementById("name").value;
    const rollNo = document.getElementById("rollNo").value;
    const course = document.getElementById("course").value;
    const email = document.getElementById("email").value;
  
    // Add student details to Firestore
    addStudentDetails(name, rollNo, course, email);
  });
  