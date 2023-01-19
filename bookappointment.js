// Get variables from local storage
const jwt = localStorage.getItem('jwt');
const docid = localStorage.getItem('docid');
const apptype = localStorage.getItem('apptype');
const docname = localStorage.getItem('docname');
const city = localStorage.getItem('city');
const address = localStorage.getItem('address');
const price = localStorage.getItem('price');
const appname = localStorage.getItem('appname');

// Check if user is logged in
if (!jwt) {
  document.getElementById('not-logged-in').classList.remove('hidden');
} else {
  // Decode JWT to get patid and is_doctor
  const decoded = jwt_decode(jwt);
  const patid = decoded.patid;
  const is_doctor = decoded.is_doctor;

  // Populate form fields with stored variables
  document.getElementById('doc-name').value = docname;
  document.getElementById('city').value = city;
  document.getElementById('address').value = address;
  document.getElementById('app-type').value = appname;
  document.getElementById('price').value = price;

  // Show form
  document.getElementById('appointment-form').classList.remove('hidden');

  // Handle form submission
  document.getElementById('submit-button').addEventListener('click', e => {
    e.preventDefault();

    // Get form data
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const interactionMethod = document.getElementById('interaction-method').value;
    const datetime = date + ' ' + time;

    // Make API call to http://127.0.0.1:3000/newappointment
    fetch('http://127.0.0.1:3000/newappointment', {
      method: 'POST',
      headers: {
        'Authorization': jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        doctor_id: docid,
        patient_id: patid,
        datetime: datetime,
        phyorvirt: interactionMethod,
        status: "scheduled",
        prescription: ""
      })
    })
    .then(response => {
      // Handle success/error
    })
    .catch(error => {
      console.error(error);
    });
  });
}


