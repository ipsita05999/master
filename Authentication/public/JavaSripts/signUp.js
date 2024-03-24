const nameEl = document.querySelector("#name");
const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const cpasswordEl = document.querySelector("#cpassword");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const formData = new FormData(e.target);
    const requestData = {};

    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    fetch("http://localhost:5000/logIn", {
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
            title: "Congratulations!",
            text: "Your account has been created successfully!",
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
            title: "Oops!",
            text: data.error,
            icon: "error",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/logIn';
            }
          });
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
nameEl.addEventListener("input", () => {
  inputElement(nameEl);
});
emailEl.addEventListener("input", () => {
  inputElement(emailEl);
});
passwordEl.addEventListener("input", () => {
  inputElement(passwordEl);
});
cpasswordEl.addEventListener("input", () => {
  inputElement(cpasswordEl);
});
function validateForm() {
  let flag = true;
  if (nameEl.value.length < 1) {
    setErrorMsg(nameEl, "Name field is required");
    flag = false;
  } else {
    setSuccess(nameEl);
  }
  if (emailEl.value.trim().length < 1) {
    setErrorMsg(emailEl, "Email field is required");
    flag = false;
  } else {
    setSuccess(emailEl);
  }
  if (passwordEl.value.trim().length < 1) {
    setErrorMsg(passwordEl, "Password field is required");
    flag = false;
  } else {
    setSuccess(passwordEl);
  }
  if (cpasswordEl.value.trim().length < 1) {
    setErrorMsg(cpasswordEl, "Confirm Password is required");
    flag = false;
  } else {
    setSuccess(cpasswordEl);
  }
  if (passwordEl.value.trim() !== cpasswordEl.value.trim()) {
    setErrorMsg(cpasswordEl, "Confirm Password doesn't match with Password");
    flag = false;
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
