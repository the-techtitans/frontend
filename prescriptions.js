// Get jwt from local storage
const jwt = localStorage.getItem('jwt');

function jwt_decode(jwt) {
  let handler = new JwtSecurityTokenHandler();
}

// Check if user is logged in
if (!jwt) {
  document.getElementById('not-logged-in').classList.remove('hidden');
} else {
  // Decode JWT to get patient_id and is_doctor
  const decoded = jwt_decode(jwt);
  const patient_id = decoded.patient_id;
  const is_doctor = decoded.is_doctor;

  if (is_doctor) {
    document.getElementById('coming-soon').classList.remove('hidden');
  } else {
    // Make API call to http://127.0.0.1:3000/prescriptions
    fetch('http://127.0.0.1:3000/prescriptions', {
      method: 'POST',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        patient_id: patient_id
      })
    })
    .then(response => response.json())
    .then(data => {
      // Populate table with data
      const tableBody = document.getElementById('table-body');
      data.forEach(item => {
        const row = document.createElement('tr');

        const docnameCell = document.createElement('td');
        docnameCell.innerHTML = item.docname;
        row.appendChild(docnameCell);

        const dateCell = document.createElement('td');
        const date = new Date(item.timestamp);
        dateCell.innerHTML = date.toLocaleDateString();
        row.appendChild(dateCell);

        const prescriptionCell = document.createElement('td');
        prescriptionCell.innerHTML = item.prescription;
        row.appendChild(prescriptionCell);

        tableBody.appendChild(row);
      });

      // Show table
      document.getElementById('table-container').classList.remove('hidden');
    })
    .catch(error => {
      console.error(error);
    });
  }
}
