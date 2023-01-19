// function to check if the passwords match
function checkPasswordMatch() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("password-repeat").value;
    const error = document.getElementById("password-error");
    const registerButton = document.getElementById("register-button");

    if (password !== confirmPassword) {
      error.innerHTML = "Passwords do not match";
      registerButton.disabled = true;
    } else {
      error.innerHTML = "";
      registerButton.disabled = false;
    }
  }

  // function to fetch specialities
  function fetchSpecialities() {
    fetch("http://127.0.0.1:3000/specialities")
      .then((response) => response.json())
      .then((data) => {
        const speciality = document.getElementById("speciality");
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.text = item.name;
          speciality.appendChild(option);
        });
      });
  }

  // function to register a new doctor
  function register(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const specialityId = document.getElementById("speciality").value;

    const data = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      address: address,
      city: city,
      speciality: specialityId
    };

    fetch("http://127.0.0.1:3000/newdoctor", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 403) {
          throw new Error("Forbidden");
        } else if (response.status === 401) {
          throw new Error("Unauthorized");
        } else if (response.status === 500) {
          throw new Error("Internal Server Error");
        } else {
          throw new Error("Error in registration");
        }
      })
      .then((data) => {
        // redirect to the home page or show a success message
        {
          let data = {
            email: email,
            password: password,
          };
          fetch("http://127.0.0.1:3000/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
    })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Incorrect email or password");
              }
            })
            .then((data) => {
              localStorage.setItem('jwt', data);
              window.location = "/profile.html";
            })
            .catch((error) => {
              console.error("Error:", error);
              // show an error message
            });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
  // show an error message
  });
  }

  // call the fetchSpecialities function on page load
  fetchSpecialities();
