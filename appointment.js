// Fetch appointment types and cities and populate dropdown menus
fetch('http://127.0.0.1:3000/apptypes')
  .then(response => response.json())
  .then(data => {
    const appointmentTypeSelect = document.getElementById('appointment-type');
    data.forEach(type => {
      const option = document.createElement('option');
      option.value = new Array(type.name, type.id);
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
  let appointmentType = document.getElementById('appointment-type').value.split(',');
  const city = document.getElementById('city').value;

  // Make GET request to API
  let url = new URL("http://127.0.0.1:3000/find");
  url.searchParams.set('city', city);
  if (typeof appointmentType[0] != 'undefined') {
    url.searchParams.set('apptype', appointmentType[0]);
  } else {
    url.searchParams.set('apptype', '');
  }
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Display results in table
      const table = document.getElementById('result-table');
      table.innerHTML = '';
      data.forEach(result => {
        const row = document.createElement('tr');
        row.addEventListener('click', function () {
          let arr = new Array();
          for (i in row.getElementsByTagName('td')) {
            let x = row.getElementsByTagName('td')[i].innerHTML;
            if (typeof x != 'undefined') {
              arr.push(x);
              console.log(x);
            }
          }
          //0 to 6
          //doc id, docname, city, address, appoint type, price, appid
          localStorage.setItem('docid', arr[0]);
          localStorage.setItem('docname', arr[1]);
          localStorage.setItem('city', arr[2]);
          localStorage.setItem('address', arr[3]);
          localStorage.setItem('appname', arr[4]);
          localStorage.setItem('price', arr[5]);
          localStorage.setItem('apptype', arr[6]);
          window.location = "/bookappointment.html";
        });
        const docid = document.createElement('td');
        docid.classList.add('hidden');
        docid.innerText = result.docid;
        console.log(result.docid);
        row.append(docid);
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
        const appid = document.createElement('td');
        docid.classList.add('hidden');
        docid.innerText = appointmentType[1];
        console.log(appointmentType[1]);
        row.append(appid);

      });
      const results = document.getElementById('appointment-results');
      results.classList.remove('hidden');
    });
});
