const navbarMenu = document.getElementsByClassName("navbar-nav")[0];
const homeBtn = document.getElementById("homeId");
const favouriteBtn = document.getElementById("favId");
const searchBtn = document.getElementById("searchBtn");
const inputData = document.getElementById("inputData");
const randomSingleMeal = document.getElementById("randomSingelMeal");
const randomBtn = document.getElementById("randomBtn");
const modalpopUp = document.getElementsByClassName("modal")[0];
const modalTitle = document.getElementById("staticBackdropLabel");
const modalBody = document.getElementsByClassName("modal-body")[0];
const leftContent = document.getElementById("leftContent");
const rightContent = document.getElementById("rightContent");
const closeBtn = document.getElementsByClassName("btn-close")[0];
const instructions = document.getElementById("instruction");
const ingredients = document.getElementById("ingredients");
const customContainer = document.getElementsByClassName("customcontainer")[0];
const favPage = document.getElementsByClassName("favouritePage")[0];
let mealNameArray = [];
autocomplete(inputData, mealNameArray);
getMealByFirstletter();
window.addEventListener("DOMContentLoaded", () => {
  getRandomMeal();
});
homeBtn.addEventListener("click", () => {
  if (homeBtn.classList.contains("btn-outline-primary")) {
    homeBtn.classList.remove("btn-outline-primary");
  }
  homeBtn.classList.add("btn-primary");
  favouriteBtn.classList.remove("btn-primary");
  favouriteBtn.classList.add("btn-outline-primary");
  customContainer.style.display = "flex";
  customContainer.style.flexDirection = "column";
  favPage.style.display = "none";
  getRandomMeal()
});

favouriteBtn.addEventListener("click", () => {
  if (favouriteBtn.classList.contains("btn-outline-primary")) {
    favouriteBtn.classList.remove("btn-outline-primary");
  }
  homeBtn.classList.remove("btn-primary");
  homeBtn.classList.add("btn-outline-primary");
  favouriteBtn.classList.add("btn-primary");
  customContainer.style.display = "none";
  favPage.innerHTML="";
  favPage.style.display = "flex";
  favPage.style.flexDirection = "row";
  favPage.style.flexWrap='wrap';
  favPage.style.justifyContent='space-around';

 items = getLocalStorage();
 items.forEach(elem =>{
    let div3 = document.createElement("div");
      let div4 = document.createElement("div");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      div3.classList.add("card");
      div4.classList.add("card-body");
      img.classList.add("card-img-top");
      button.classList.add("btn");
      button.classList.add("btn-danger");
      button.innerHTML =
        '<i class="fa-solid fa-xmark"></i>&nbsp;&nbspRemove';
        
      p.innerHTML = "<b>" + elem.dishName + "</b>";
      div4.style.textAlign='center';
      div3.style.width = "280px";
      div3.style.border = "2px solid black";
      div3.style.margin='10px';
      img.style.cursor = "pointer";
      let src = document.createAttribute("src");
      src.value = elem.imgUrl;
      img.setAttributeNode(src);
      img.style.height = "200px";
      let IngredientArray = [];
      for (item of elem.IngredientArray) {
        if (item.includes("strIngredient")) {
          if (elem.IngredientArray[item]) {
            IngredientArray.push(elem.IngredientArray[item]);
          }
        }
      }
      button.addEventListener('click', (e)=>{
        removeLocalStorage(elem.id);
        favPage.removeChild(e.target.parentElement.parentElement);
      })
      img.addEventListener("click", () => {
        openModal(
          elem.imgUrl,
          elem.dishName,
          elem.instruction,
          elem.IngredientArray
        );
      });
      div4.appendChild(p);
      div4.appendChild(button);
      div3.appendChild(img);
      div3.appendChild(div4);      
      favPage.appendChild(div3);
  });
});

searchBtn.addEventListener("click", () => {
  if (inputData.value != "") {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="+inputData.value)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      let div4 = document.createElement("div");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      div1.classList.add("row");
      div2.classList.add("col");
      div3.classList.add("card");
      div4.classList.add("card-body");
      img.classList.add("card-img-top");
      button.classList.add("btn");
      button.classList.add("btn-primary");
      if(addedToFavList(data.meals[0].idMeal)){
        button.innerHTML='<i class="fa-solid fa-check"></i>&nbsp;&nbsp;Item Added';
          button.disabled=true;
      }
      else{
        button.innerHTML =
        '<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add to Favourite';
        button.disabled=false;
      }
      p.innerHTML = "<b>" + data.meals[0].strMeal + "</b>";
      div3.style.width = "450px";
      div3.style.margin = "auto";
      div3.style.border = "2px solid black";
      img.style.cursor = "pointer";
      let src = document.createAttribute("src");
      src.value = data.meals[0].strMealThumb;
      img.setAttributeNode(src);
      img.style.height = "320px";
      let IngredientArray = [];
      for (item in data.meals[0]) {
        if (item.includes("strIngredient")) {
          if (data.meals[0][item]) {
            IngredientArray.push(data.meals[0][item]);
          }
        }
      }      
      button.addEventListener('click', ()=>{        
        addToLocalStorage(data.meals[0].idMeal,data.meals[0].strMealThumb,
          data.meals[0].strMeal,
          data.meals[0].strInstructions,
          IngredientArray);
          button.innerHTML='<i class="fa-solid fa-check"></i>&nbsp;&nbsp;Item Added';
          button.disabled=true;
      })
      img.addEventListener("click", () => {
        openModal(
          data.meals[0].strMealThumb,
          data.meals[0].strMeal,
          data.meals[0].strInstructions,
          IngredientArray
        );
      });
      div4.appendChild(p);
      div4.appendChild(button);
      div3.appendChild(img);
      div3.appendChild(div4);
      div2.appendChild(div3);
      div1.appendChild(div2);
      randomSingleMeal.innerHTML="";
      randomSingleMeal.appendChild(div1);
    })
    .catch((err) => console.log(err));
  }
});
randomBtn.addEventListener("click", () => getRandomMeal());
closeBtn.addEventListener("click", () => {
  modalpopUp.style.display = "none";
});

function getRandomMeal() {
  randomSingleMeal.innerHTML = "";
  inputData.value="";
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let div1 = document.createElement("div");
      let div2 = document.createElement("div");
      let div3 = document.createElement("div");
      let div4 = document.createElement("div");
      let img = document.createElement("img");
      let p = document.createElement("p");
      let button = document.createElement("button");
      div1.classList.add("row");
      div2.classList.add("col");
      div3.classList.add("card");
      div4.classList.add("card-body");
      img.classList.add("card-img-top");
      button.classList.add("btn");
      button.classList.add("btn-primary");
      if(addedToFavList(data.meals[0].idMeal)){
        button.innerHTML='<i class="fa-solid fa-check"></i>&nbsp;&nbsp;Item Added';
          button.disabled=true;
      }
      else{
        button.innerHTML =
        '<i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add to Favourite';
        button.disabled=false;
      }
      
      p.innerHTML = "<b>" + data.meals[0].strMeal + "</b>";
      div3.style.width = "450px";
      div3.style.margin = "auto";
      div3.style.border = "2px solid black";
      img.style.cursor = "pointer";
      let src = document.createAttribute("src");
      src.value = data.meals[0].strMealThumb;
      img.setAttributeNode(src);
      img.style.height = "320px";
      let IngredientArray = [];
      for (item in data.meals[0]) {
        if (item.includes("strIngredient")) {
          if (data.meals[0][item]) {
            IngredientArray.push(data.meals[0][item]);
          }
        }
      }
      button.addEventListener('click', ()=>{
        addToLocalStorage(data.meals[0].idMeal,data.meals[0].strMealThumb,
          data.meals[0].strMeal,
          data.meals[0].strInstructions,
          IngredientArray);
          button.innerHTML='<i class="fa-solid fa-check"></i>&nbsp;&nbsp;Item Added';
          button.disabled=true;
      });
      img.addEventListener("click", () => {
        openModal(
          data.meals[0].strMealThumb,
          data.meals[0].strMeal,
          data.meals[0].strInstructions,
          IngredientArray
        );
      });
      div4.appendChild(p);
      div4.appendChild(button);
      div3.appendChild(img);
      div3.appendChild(div4);
      div2.appendChild(div3);
      div1.appendChild(div2);
      randomSingleMeal.innerHTML="";
      randomSingleMeal.appendChild(div1);
    })
    .catch((err) => console.log(err));
}

function openModal(imgUrl, dishName, instruction, IngredientArray) {
  modalpopUp.style.display = "block";
  modalTitle.innerHTML = '<h2>'+dishName+'</h2>';
  modalTitle.style.fontWeight = "bolder";
  let div = document.createElement("div");
  div.classList.add("card");
  div.style.border = "2px solid #a9b85c";
  let img = document.createElement("img");
  img.style.height = "350px";
  let src = document.createAttribute("src");
  src.value = imgUrl;
  img.setAttributeNode(src);
  div.appendChild(img);
  leftContent.innerHTML = "";
  leftContent.appendChild(div);
  instructions.innerHTML = instruction;

  let ul = document.createElement("ul");
  IngredientArray.forEach((e) => {
    let li = document.createElement("li");
    li.innerHTML = e;
    ul.appendChild(li);
  });
  ingredients.innerHTML = "";
  ingredients.innerHTML = "<h3><b>INGREDIENTS</b></h3>";
  ingredients.appendChild(ul);
}

 async function getMealByFirstletter() {
  let charArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  charArray.forEach((e) => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=" + e)
      .then((res) => res.json())
      .then((data) => {
        if (data.meals != null) {
          for (meal in data.meals) {
            mealNameArray.push(data.meals[meal].strMeal);            
          }
        }
      })
      .catch((err) => console.log(err));
  });
  localStorage.setItem('names',JSON.stringify(mealNameArray));
}
function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value.trim();
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
}
//local storage setup
function addToLocalStorage(id, imgUrl, dishName, instruction, IngredientArray) {
  let favlist = { id, imgUrl, dishName, instruction, IngredientArray };
  let items = getLocalStorage();
  items.push(favlist);
  localStorage.setItem("meals", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("meals")
    ? JSON.parse(localStorage.getItem("meals"))
    : [];
}

function removeLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("meals", JSON.stringify(items));
}

function addedToFavList(id){
  let favMeals = getLocalStorage();
  favMeals= favMeals.filter(elem=>elem.id === id);
  return favMeals.length>0?true:false;
}
