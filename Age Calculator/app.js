const myInput = document.getElementById('myInput');
const calculateAgeBtn = document.getElementById('calculateAge');
const Result = document.getElementsByClassName('Result')[0];

calculateAgeBtn.addEventListener('click', ()=>{
    if(myInput.value != ""){
        let dob = new Date(myInput.value);
        let age = Date.now() - dob.getTime();
        if(new Date(age).getFullYear() == 1970){
            Result.innerHTML= 'Your age is '+(new Date().getMonth()-dob.getMonth()) + ' months old '
        }
        else{
            Result.innerHTML = 'Your age is '+(new Date(age).getFullYear() - 1970)+' years old';
        }
    }
})