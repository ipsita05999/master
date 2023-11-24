const calculateBtn = document.getElementById('calculateBtn');
const billAmount = document.getElementById('billamount');
const tipPercentage = document.getElementById('tipPercentage');
const totalValue = document.getElementsByClassName('totalValue')[0];

calculateBtn.addEventListener('click', ()=>{
    console.log(billAmount, tipPercentage);
if(billAmount.value!='' && tipPercentage.value!=''){
 let totalBill= (Number(billAmount.value)+(billAmount.value*(tipPercentage.value/100))).toFixed(2);
let tipPaid = Number(billAmount.value*(tipPercentage.value/100)).toFixed(2);
totalValue.innerHTML="<p>Total Bill: $"+ totalBill+"</p><p>Tip Paid: $"+tipPaid;
}
})