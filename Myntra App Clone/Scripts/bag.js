const bagItemsContainer = document.querySelector(".bag-items-container");
const bagSummary = document.querySelector(".bag-summary");

window.addEventListener("DOMContentLoaded", () => loadbagContent());

function loadbagContent() {
  let wishlistItems = getLocalStorage("wishlistItems");
  wishlistCount.innerHTML = "";
  wishlistCount.innerHTML = wishlistItems.length;
  wishlistCount.style.display = wishlistItems.length > 0 ? "block" : "none";
  let bagItems = getLocalStorage("items");
  bagItemsContainer.innerHTML =
    bagItems.length > 0 ? "" : "<h1>Your bag is Empty</h1>";
    let original_price = 0;
let current_price = 0;
let discount = 0;
  items.forEach((item) => {
    if (bagItems.indexOf(String(item.id)) > -1) {
      current_price += item.current_price;
      bagItemsContainer.innerHTML += `<div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.image}">
      </div>
      <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.current_price}</span>
        <span class="original-price">Rs ${item.original_price}</span>
        <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
  </div>

    <div class="remove-from-cart" onclick="removeFromCart(${item.id},this)">X</div>
  </div>`;
      bagSummary.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${bagItems.length} Items)</div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs ${(original_price +=
      item.original_price)}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value">Rs ${(discount =
      original_price - current_price)}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${current_price + 99}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>
</div>`;
    }
  });
}

function removeFromCart(itemID, elem) {
  let original_price = 0;
let current_price = 0;
let discount = 0;
  removeFromLocalStorage("items", itemID);
  bagItemsContainer.removeChild(elem.parentElement);
  let bagItems = items.filter(item => {
    return getLocalStorage('items').indexOf(String(item.id)) >-1;
  });
  if(bagItems.length > 0){
    bagItems.forEach(item =>{
      current_price += item.current_price;
      bagSummary.innerHTML = `<div class="bag-details-container">
    <div class="price-header">PRICE DETAILS (${bagItems.length} Items)</div>
    <div class="price-item">
      <span class="price-item-tag">Total MRP</span>
      <span class="price-item-value">Rs ${(original_price +=
        item.original_price)}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Discount on MRP</span>
      <span class="price-item-value">Rs ${(discount =
        original_price - current_price)}</span>
    </div>
    <div class="price-item">
      <span class="price-item-tag">Convenience</span>
      <span class="price-item-value">Rs 99</span>
    </div>
    <hr>
    <div class="price-footer">
      <span class="price-item-tag">Total Amount</span>
      <span class="price-item-value">Rs ${current_price + 99}</span>
    </div>
  </div>
  <button class="btn-place-order">
    <div class="css-xjhrni">PLACE ORDER</div>
  </button>
  </div>`;
    })
  }
  else{
    bagItemsContainer.innerHTML ='<h1>Your bag is Empty</h1>';
    bagSummary.innerHTML='';
  }
  
}
