const emailEl = document.querySelector("#email");
const passwordEl = document.querySelector("#password");
const form = document.querySelector("#form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    const formData = new FormData(e.target);
    const requestData = {};

    formData.forEach((value, key) => {
      requestData[key] = value;
    });
    fetch("http://localhost:5000/home", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success ", data);
        (data.res?._id)?sessionStorage.setItem('user',data.res?._id):'';
        if(data.redirect!=''){
          Swal.fire({
            title: "Congratulations!",
            text: "LogIn Successfull",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = data.redirect;
            }
          });
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
          icon: "error",
        });
        console.log("Error ", err);
      });
  }
});

emailEl.addEventListener("input", () => {
  inputElement(emailEl);
});
passwordEl.addEventListener("input", () => {
  inputElement(passwordEl);
});
function validateForm() {
  let flag = true;
  if (emailEl.value.trim().length < 1) {
    setErrorMsg(emailEl, "Email field is required");
    flag = false;
  } else if (
    !emailEl.value.includes("@") ||
    !emailEl.value.includes(".com") ||
    emailEl.value.indexOf(".com") === -1 ||
    emailEl.value.indexOf("@") === emailEl.value.length - 1
  ) {
    setErrorMsg(passwordEl, "Invalid Email");
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
    console.log(inputEl.getAttribute("id") === "email");
    if (inputEl.getAttribute("id") === "email") {
      if (
        inputEl.value.includes("@") &&
        inputEl.value.includes(".com") &&
        inputEl.value.indexOf(".com") !== -1 &&
        inputEl.value.indexOf("@") !== inputEl.value.length - 1
      ) {
        parentEl.classList.add("success");
      }
    } else {
      parentEl.classList.add("success");
    }
  }
}
function setSuccess(inputEl) {
  const parentEl = inputEl.parentElement;
  if (parentEl.classList.contains("error")) {
    parentEl.classList.remove("error");
  }
  parentEl.classList.add("success");
}
