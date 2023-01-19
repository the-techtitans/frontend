//decide what to render and when to render it
let jwt = localStorage.getItem('jwt');
if (jwt) {
  //login present, show profile page
  document.getElementById('login').className= "hidden";
  document.getElementById('profile').className = "";
}
