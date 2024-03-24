const emailEl = document.querySelector("#email");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const formData = new FormData(e.target);
    const requestData = {};

    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    fetch("http://localhost:5000/forgotPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success ", data);
        if(data.redirect !==''){
          Swal.fire({
            text: "Password has been sent to your registered Email.",
            icon: "success"
          })
          .then(result=>{
            if(result.isConfirmed){
              window.location.href=data.redirect;
            }
          })
        }
        else{
          Swal.fire({
            text: data.error,
            icon: "error"
          })
          // .then(result=>{
          //   if(result.)
          // })
        }        
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong!",
          icon: "error"
        })
        console.log("Error ", err)
      });
  }
});

emailEl.addEventListener("input", () => {
  inputElement(emailEl);
});

function validateForm() {
  let flag = true;
  if (emailEl.value.trim().length < 1) {
    setErrorMsg(emailEl, "Email field is required");
    flag = false;
  } else {
    setSuccess(emailEl);
  }
  return flag;
}
function setErrorMsg(inputEl, errorMsg) {
  const parentEl = inputEl.parentElement;
  if (parentEl.classList.contains("success")) {
    parentEl.classList.remove("success");
  }
  parentEl.classList.add("error");
  const small = parentEl.querySelector("small");
  small.innerText = errorMsg;
}
function inputElement(inputEl) {
  const parentEl = inputEl.parentElement;
  if (inputEl.value.trim().length > 0 && parentEl.classList.contains("error")) {
    parentEl.classList.remove("error");
    parentEl.classList.add("success");
  }
}
function setSuccess(inputEl) {
  const parentEl = inputEl.parentElement;
  if (parentEl.classList.contains("error")) {
    parentEl.classList.remove("error");
  }
  parentEl.classList.add("success");
}