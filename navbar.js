//decide what to render and when to render it
let ijwt = localStorage.getItem('jwt');
if (ijwt) {
  //login present, show profile page
  document.getElementById('login').className= "hidden";
  document.getElementById('signup').className= "hidden";
  document.getElementById('profile').className = "";
  document.getElementById('myapps').className = "";
  document.getElementById('signout').className = "";
}
