// Get a reference to the Realtime Database
const db = firebase.database();

// Add student data to 'students' node
function addStudentData(name, rollNo, status = false) {
  const newStudentRef = db.ref('students').push();  // Creates a new unique key
  return newStudentRef.set({
    name: name,
    rollNo: rollNo,
    submitted: status,
    dateAdded: new Date().toISOString()
  });
}

// Get all students and display them
function loadStudents() {
  const studentTableBody = document.getElementById('studentTableBody');
  
  // Clear existing table rows
  studentTableBody.innerHTML = '';
  
  // Listen for changes in the 'students' node
  db.ref('students').on('value', (snapshot) => {
    studentTableBody.innerHTML = '';
    
    snapshot.forEach((childSnapshot) => {
      const studentData = childSnapshot.val();
      const studentId = childSnapshot.key;
      
      // Create table row
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${studentData.name}</td>
        <td>${studentData.rollNo}</td>
        <td class="${studentData.submitted ? 'submitted' : 'not-submitted'}">
          ${studentData.submitted ? 'Submitted' : 'Not Submitted'}
        </td>
        <td>
          <button onclick="updateStudentStatus('${studentId}', ${!studentData.submitted})">
            ${studentData.submitted ? 'Mark Not Submitted' : 'Mark Submitted'}
          </button>
          <button onclick="deleteStudent('${studentId}')">Delete</button>
        </td>
      `;
      
      studentTableBody.appendChild(row);
    });
  });
}

// Update student submission status
function updateStudentStatus(studentId, status) {
  return db.ref('students/' + studentId).update({
    submitted: status,
    lastUpdated: new Date().toISOString()
  });
}

// Delete a student
function deleteStudent(studentId) {
  if (confirm('Are you sure you want to delete this student?')) {
    return db.ref('students/' + studentId).remove();
  }
}

// Make functions available globally
window.addStudentData = addStudentData;
window.updateStudentStatus = updateStudentStatus;
window.deleteStudent = deleteStudent;

// Handle form submission
document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const roll = document.getElementById('roll').value.trim();
  
  if (name && roll) {
    addStudentData(name, roll)
      .then(() => {
        // Clear form fields after successful submission
        document.getElementById('name').value = '';
        document.getElementById('roll').value = '';
        console.log('Student added successfully!');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
        alert('Failed to add student: ' + error.message);
      });
  } else {
    alert('Please fill in all fields');
  }
});

// Load students when the page loads
document.addEventListener('DOMContentLoaded', loadStudents);