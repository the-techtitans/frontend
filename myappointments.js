function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

// Get jwt variable from local storage
const jwt = localStorage.getItem("jwt");

if (!jwt) {
  // Show screen that user is not logged in
  document.getElementById("not-logged-in").style.display = "block";
} else {
  // Decode jwt into variables id and isdoctor
  const decoded = parseJwt(jwt);
  const id = decoded.id;
  const isDoctor = decoded.isDoctor;

  if (isDoctor) {
    // Render message saying "coming soon"
    document.getElementById("coming-soon").style.display = "block";
  } else {
    // Call API at example.com/prevapp
    fetch("http://127.0.0.1:3000/prevapp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt
      },
      body: JSON.stringify({ patient_id: id })
    })
      .then(response => response.json())
      .then(data => {
        // Get the table element
        const table = document.getElementById("my-appointments");
        if (data.length === 0) {
          // Show message that user has no appointments
          document.getElementById("no-appointments").style.display = "block";
        } else {
          // Iterate through the JSON array and add rows to the table
          for (let i = 0; i < data.length; i++) {
            const row = table.insertRow();
            row.insertCell().innerHTML = data[i].docname;
            row.insertCell().innerHTML = (new Date(data[i].timestamp).toDateString());
            row.insertCell().innerHTML = data[i].appname;
            row.insertCell().innerHTML = data[i].appstatus;
            row.insertCell().innerHTML = data[i].prescription;
          }
          document.getElementById("appointments").style.display = "block";
        }
      })
      .catch(error => console.error(error));
  }
}
