const signoutBtn = document.querySelector('#signout');
const resetPasswordBtn = document.querySelector("#resetP");
const homeHeader = document.querySelector('#homeHeader');
const homeContainer = document.querySelector('.container');
const quote = document.querySelector('#quote');

signoutBtn.addEventListener('click',()=>{
  Swal.fire({
    text: "Sign out Successfull!",
    icon: "success",
    timer: 1800,
    showConfirmButton: false,
  })
  .then(res=>{
    if(sessionStorage.getItem('user')){
      sessionStorage.removeItem('user');
      window.location.href='/logIn';
    }
    else{
      fetch('http://localhost:5000/logout',{
        method:'GET',
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response=>window.location.href='/logIn')
    }
  })
})

resetPasswordBtn.addEventListener('click',()=>{
  window.location.href='/resetPassword'
})

window.addEventListener('DOMContentLoaded',()=>{
  const id = sessionStorage.getItem('user');
  if(id){
  fetch(`http://localhost:5000/home/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      homeHeader.innerHTML= `Hello There!😊`
      fetch("https://type.fit/api/quotes")
      .then(response=> response.json())
      .then(d =>{
        let index= Math.floor(Math.random()*16);
        quote.innerHTML = '"'+d[index].text +'"';
      })
    })
    .catch((err) => {
      Swal.fire({
        title: "Oops!",
        text: "Something went wrong!",
        icon: "error",
      });
      console.log("Error ", err);
    });
  }
  else{
      homeHeader.innerHTML= `Hello There!😊`
      fetch("https://type.fit/api/quotes")
      .then(response=> response.json())
      .then(d =>{
        let index= Math.floor(Math.random()*16);
        quote.innerHTML = '"'+d[index].text +'"';
        resetPasswordBtn.disable=true;
      })
   }
})