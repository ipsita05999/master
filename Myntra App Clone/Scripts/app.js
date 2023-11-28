const Profile = document.querySelector("#profile-container");
const Modal = document.querySelector(".modal-container");
const cancleBtn = document.querySelector(".cancle-btn");
const mainContainer = document.querySelector(".main-container");
const bagCount = document.querySelector("#bag-count");
const wishlistCount = document.querySelector("#wishlist-count");

window.addEventListener("DOMContentLoaded", () => loadContent());

Profile.addEventListener("click", () => {
  Modal.style.display = "flex";
});

cancleBtn.addEventListener("click", () => {
  Modal.style.display = "none";
});

function addToBag(itemID, elem) {
  addToLocalStorage("items", itemID);
  let items = getLocalStorage("items");
  bagCount.innerHTML = "";
  bagCount.innerHTML = items.length;
  bagCount.style.display = items.length > 0 ? "block" : "none";
  elem.innerText = "Item Added To Bag";
}

function addToWishlist(itemID, elem) {
if(elem.classList.contains('fa-regular')){
  addToLocalStorage("wishlistItems", itemID);
  let items = getLocalStorage("wishlistItems");
  wishlistCount.innerHTML = "";
  wishlistCount.innerHTML = items.length;
  wishlistCount.style.display = items.length > 0 ? "block" : "none";
  elem.classList.remove("fa-regular");
  elem.classList.add("fa-solid");
}
else{
  removeFromLocalStorage('wishlistItems',itemID);
  let items = getLocalStorage("wishlistItems");
  wishlistCount.innerHTML = "";
  wishlistCount.innerHTML = items.length;
  wishlistCount.style.display = items.length > 0 ? "block" : "none";
  elem.classList.remove("fa-solid");
  elem.classList.add("fa-regular");
}
  
}

function loadContent() {
  mainContainer.innerHTML = "";
  let bagItems = getLocalStorage("items");
  bagCount.innerHTML = "";
  bagCount.innerHTML = bagItems.length;
  bagCount.style.display = bagItems.length > 0 ? "block" : "none";
  let wishlistItems = getLocalStorage("wishlistItems");
  wishlistCount.innerHTML = "";
  wishlistCount.innerHTML = wishlistItems.length;
  wishlistCount.style.display = wishlistItems.length > 0 ? "block" : "none";
  let buttonText = "";
  let heartIconClass='';
  items.forEach((item) => {
    if (bagItems.indexOf(item.id) > -1) {
      buttonText = "Item Added To Bag";
    } else {
      buttonText = "Add To Bag";
    }
    if(wishlistItems.indexOf(item.id) > -1){
      heartIconClass= 'fa-solid'
    }
    else{
      heartIconClass='fa-regular'
    }
    mainContainer.innerHTML += `<div class="Item-container">
      <img class="item-image" src=${item.image} alt="item-image">
      <div class="rating">
       ${item.rating.stars} ⭐ | ${
      item.rating.count >= 1000
        ? item.rating.count / 1000 + "k"
        : item.rating.count
    }
       <span class='item-wishlist' title='Add to Wishlist'><i class="${heartIconClass} fa-heart" style='color:#f16565'onclick='addToWishlist(${
        item.id
      },this)'></i></span>
      </div>
      <div class="company-name">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <button class="addToBag" onclick="addToBag(${
        item.id
      },this)">${buttonText}</button>
    </div>`;
  });
}

//Local storage setup

function addToLocalStorage(key, itemID) {
  let items = getLocalStorage(key);
  if (!items.includes(String(itemID))) {
    items.push(JSON.stringify(itemID));
  }
  localStorage.setItem(key, JSON.stringify(items));
}

function getLocalStorage(key) {
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function removeFromLocalStorage(key, id){
  let items = getLocalStorage(key);
  items.splice(items.indexOf(String(id)),1);
  let value = items.length<1 ? []:items;
  localStorage.setItem(key, JSON.stringify(value));
}
