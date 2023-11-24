const myInput = document.querySelector('#myInput');

const buttons = Array.from(document.querySelectorAll('.button'));

buttons.forEach((button) =>{
if(button.innerText !=='C' && button.innerText !=='='){
  button.onclick=()=>{
    myInput.value= myInput.value+ button.innerText;
  }
}
else if(button.innerText ==='C'){
  button.onclick=()=>{
    myInput.value='';
  }
}
else{
  button.onclick=()=>{
    try{
      myInput.value= eval(myInput.value);
    }
    catch(err){
 alert('kindly provide a valid expression');
    }
  }
}
})