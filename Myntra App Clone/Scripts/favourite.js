const mainContainerfav = document.querySelector('.mainContainer');
let buttonText='';
window.addEventListener('DOMContentLoaded',()=>loadContent());

function loadContent(){
  let wishlistItems= getLocalStorage('wishlistItems');
  let bagItems = getLocalStorage('items');
  mainContainerfav.innerHTML=wishlistItems.length<1?'<h1>NO ITEMS IN WISHLIST</h1>':'';
  bagCount.innerHTML='';
  bagCount.innerHTML= bagItems.length;
  bagCount.style.display=bagItems.length>0?'block':"none";
  items.forEach(item => {
    if(wishlistItems.indexOf(String(item.id)) >-1){
      if(bagItems.indexOf(String(item.id))>-1){
        buttonText='Item Added To Bag';
      }
      else{
        buttonText='Add To Bag';
      }
      mainContainerfav.innerHTML += `<div class="Item-container">
      <img class="item-image" src=${item.image} alt="item-image">
      <div class="rating">
       ${item.rating.stars} ⭐ | ${item.rating.count>=1000?item.rating.count/1000+"k":item.rating.count}
       <span class='item-remove' title='Remove From Wishlist'><i class="fa-solid fa-xmark" onclick='removeFromWishlist(${
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
      <button class="addToBag" onclick="addToBagFromWishlist(${item.id},this)">${buttonText}</button>
    </div>`;
    }
    
  });
}

function removeFromWishlist(itemID, elem){
  removeFromLocalStorage('wishlistItems',itemID);
  mainContainerfav.removeChild(elem.parentElement.parentElement.parentElement);
  isEmptyorNot();
}

function addToBagFromWishlist(itemID, elem){
  if(elem.innerText==='Add To Bag'){
    removeFromLocalStorage('wishlistItems',itemID);
    mainContainerfav.removeChild(elem.parentElement);
    isEmptyorNot();
    addToLocalStorage('items',itemID);
    let bagItems = getLocalStorage('items');
    bagCount.innerHTML='';
    bagCount.innerHTML= bagItems.length;
    bagCount.style.display=bagItems.length>0?'block':"none";
  }
}

function isEmptyorNot(){
  let items = getLocalStorage('wishlistItems');
  if(items.length<1){
    mainContainerfav.innerHTML='<h1>NO ITEMS IN WISHLIST</h1>';
  }
}
