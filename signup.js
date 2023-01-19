function register() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
  
  const data = { name: name, email: email, password: password, phone: phone };
  
  fetch("http://127.0.0.1:3000/newpatient", {
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
  console.log("Success:", data);
  // redirect to the home page or show a success message
  })
  .catch((error) => {
  console.error("Error:", error);
  // show an error message
  });
  }