// Fetch appointment types and cities and populate dropdown menus
fetch('http://127.0.0.1:3000/apptypes')
  .then(response => response.json())
  .then(data => {
    const appointmentTypeSelect = document.getElementById('appointment-type');
    data.forEach(type => {
      const option = document.createElement('option');
      option.value = type.name;
      option.text = type.name;
      appointmentTypeSelect.add(option);
    });
  });

fetch('http://127.0.0.1:3000/cities')
  .then(response => response.json())
  .then(data => {
    const citySelect = document.getElementById('city');
    data.forEach(city => {
      const option = document.createElement('option');
      option.value = city.city;
      option.text = city.city;
      citySelect.add(option);
    });
  });

// Handle form submission
document.getElementById('appointment-form').addEventListener('submit', e => {
  e.preventDefault();
  const appointmentType = document.getElementById('appointment-type').value;
  const city = document.getElementById('city').value;

  // Make GET request to API
  let url = new URL("http://127.0.0.1:3000/find");

  url.searchParams.set('city', city);
  url.searchParams.set('apptype', appointmentType);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Display results in table
      const table = document.getElementById('result-table');
      data.forEach(result => {
        const row = document.createElement('tr');
        row.addEventListener('click', function () {
          console.log("Hello World!");
        });
        const docname = document.createElement('td');
        docname.innerText = result.docname;
        row.appendChild(docname);
        const city = document.createElement('td');
        city.innerText = result.city;
        row.appendChild(city);
        const address = document.createElement('td');
        address.innerText = result.address;
        row.appendChild(address);
        const apptype = document.createElement('td');
        apptype.innerText = result.apptype;
        row.appendChild(apptype);
        const price = document.createElement('td');
        price.innerText = result.price;
        row.appendChild(price);
        table.appendChild(row);
      });
      const results = document.getElementById('appointment-results');
      results.classList.remove('hidden');
    });
});