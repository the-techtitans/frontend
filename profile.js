// Get jwt from local storage
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

const jwt = localStorage.getItem("jwt");
if (!jwt) {
    document.getElementById("not-logged-in").classList.remove("hidden");
} else {
  // Decode jwt and get patient_id and isdoctor
  const decoded = parseJwt(jwt);
  const patid = decoded.id;
  const is_doctor = decoded.is_doctor;

  if (is_doctor) {
      document.getElementById("coming-soon").classList.remove("hidden");
  } else {
    // Get user information
    fetch("http://127.0.0.1:3000/patient", {
        method: "POST",
        headers: {
            "Authorization": jwt,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            patient_id: patid,
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("user-info").classList.remove("hidden");
        document.getElementById("name").innerHTML = data[0].name;
        document.getElementById("email").innerHTML = data[0].email;
        document.getElementById("phone").innerHTML = data[0].phone;
    })
    .catch(error => console.log(error));

    // Get prescription history
    fetch("http://127.0.0.1:3000/prescriptions", {
        method: "POST",
        headers: {
            "Authorization": jwt,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patient_id: patid,
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.length === 0) {
            document.getElementById("no-prescription").classList.remove("hidden");
            return;
        }
        document.getElementById("prescription-table").classList.remove("hidden");
        const tableBody = document.getElementById("table-body");
        data.forEach(prescription => {
            let row = document.createElement("tr");
            let doctorName = document.createElement("td");
            doctorName.innerHTML = prescription.docname;
            row.appendChild(doctorName);
            let date = document.createElement("td");
            date.innerHTML = new Date(prescription.timestamp).toDateString();
            row.appendChild(date);
            let prescriptionText = document.createElement("td");
            prescriptionText.innerHTML = prescription.prescription;
            row.appendChild(prescriptionText);
            tableBody.appendChild(row);
        });
    })
    .catch(error => console.log(error));

  }

}
