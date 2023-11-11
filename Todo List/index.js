const inputText = document.getElementById("inputText");
const menuItems = document.getElementsByClassName("menu-items")[0];
const circlePlus = document.getElementById("circlePlus");
const itemList = document.getElementById("item-list");
const counter = document.getElementById("counter");
const completeAllTasks = document.getElementById("completeAllTask");
const clearCompletedBtn = document.getElementById("clearcompletedBtn");
const allFilter = document.getElementById("allfilter");
const unCompletedFilter = document.getElementById("uncompletedfilter");
const completedFilter = document.getElementById("completedfilter");

circlePlus.addEventListener("click", addItem);

inputText.addEventListener("input", () => {
  circlePlus.style.display = "flex";
});
window.addEventListener("DOMContentLoaded", setupItems);

completeAllTasks.addEventListener("click", () => {
  let items = getLocalStorage();
  const allLielem = Array.from(itemList.getElementsByTagName("li"));
  allLielem.forEach((li) => {
    const id = li.dataset.id;
    items.map((item) => {
      if (item.id === id && item.completed === false) {
        const circle = li.querySelector(".fa-circle");
        circle.classList.remove("fa-circle");
        circle.classList.add("fa-circle-check");
        circle.style.color = "green";
        editLocalStorage(id, inputText.value, true);
      }
    });
    counter.innerHTML = "<b>" + 0 + "</b> tasks left";
  });
});

clearCompletedBtn.addEventListener("click", () => {
  let items = getLocalStorage();
  const allLielem = Array.from(itemList.getElementsByTagName("li"));
  allLielem.forEach((li) => {
    const id = li.dataset.id;
    items.map((item) => {
      if (item.id === id && item.completed === true) {
        itemList.removeChild(li);
        removeLocalStorage(id);
      }
    });
  });
});

allFilter.addEventListener("click", () => {
    itemList.innerHTML="";
    unCompletedFilter.innerHTML = "Uncompleted";
  completedFilter.innerHTML = "Completed";
  setupItems();
});

unCompletedFilter.addEventListener("click", () => {
    itemList.innerHTML="";
  unCompletedFilter.innerHTML = "<b>Uncompleted</b>";
  allFilter.innerHTML = "All";
  completedFilter.innerHTML = "Completed";
  const items = getLocalStorage();
  if (items.length > 0) {
    items.map((item) => {
      if (item.completed === false) {
        const li = document.createElement("li");
        let attr = document.createAttribute("data-id");
        attr.value = item.id;
        li.setAttributeNode(attr);
        li.innerHTML =
          '<div><i class="fa-regular fa-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
          item.value +
          '</div><i class="fa-regular fa-circle-xmark"></i>';
          const circle = li.querySelector(".fa-circle");
      circle.addEventListener("click", completeItem);
      const circleXMark = li.querySelector(".fa-circle-xmark");
      circleXMark.addEventListener("click", deleteItem);
      itemList.appendChild(li);
      }
    });
  }
});

completedFilter.addEventListener("click", () => {
    itemList.innerHTML="";
    unCompletedFilter.innerHTML = "Uncompleted";
  allFilter.innerHTML = "All";
  completedFilter.innerHTML = "<b>Completed</b>";
  const items = getLocalStorage();
  items.map((item)=>{
    if (item.completed === true) {
        const li = document.createElement("li");
        let attr = document.createAttribute("data-id");
        attr.value = item.id;
        li.setAttributeNode(attr);
        li.innerHTML =
          '<div><i class="fa-regular fa-circle-check" style="color:green"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
          item.value +
          '</div><i class="fa-regular fa-circle-xmark"></i>';
          const circle = li.querySelector(".fa-circle-check");
      circle.addEventListener("click", completeItem);
      const circleXMark = li.querySelector(".fa-circle-xmark");
      circleXMark.addEventListener("click", deleteItem);
      itemList.appendChild(li);
    }
  });
});

function addItem(e) {
  e.preventDefault();
  let li = document.createElement("li");
  const id = new Date().getTime().toString();
  let attr = document.createAttribute("data-id");
  attr.value = id;
  li.setAttributeNode(attr);
  li.innerHTML =
    '<div><i class="fa-regular fa-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
    inputText.value +
    '</div><i class="fa-regular fa-circle-xmark"></i>';
  const circle = li.querySelector(".fa-circle");
  circle.addEventListener("click", completeItem);
  const circleXMark = li.querySelector(".fa-circle-xmark");
  circleXMark.addEventListener("click", deleteItem);
  itemList.appendChild(li);
  circlePlus.style.display = "none";
  addToLocalStorage(id, inputText.value, false);
  inputText.value = "";
  let items = getLocalStorage();
  counter.innerHTML = "<b>" + items.length + "</b> tasks left";
}

function completeItem(e) {
  const lielement = e.currentTarget.parentElement.parentElement;
  const id = lielement.dataset.id;
  const elemet = e.currentTarget;
  elemet.classList.remove("fa-circle");
  elemet.classList.add("fa-circle-check");
  elemet.style.color = "green";
  editLocalStorage(id, inputText.value, true);
  let items = getLocalStorage();
  counter.innerHTML =
    "<b>" +
    items.filter((item) => item.completed === false).length +
    "</b> tasks left";
}

function deleteItem(e) {
  const elem = e.currentTarget.parentElement;
  const id = elem.dataset.id;
  itemList.removeChild(elem);
  removeLocalStorage(id);
  let items = getLocalStorage();
  counter.innerHTML =
    "<b>" +
    items.filter((item) => item.completed === false).length +
    "</b> tasks left";
}

//Local storage setup
function addToLocalStorage(id, value, completed) {
  const todoList = { id, value, completed };
  let items = getLocalStorage();
  items.push(todoList);
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function removeLocalStorage(id) {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id !== id) {
      return item;
    }
  });
  localStorage.setItem("list", JSON.stringify(items));
}

function editLocalStorage(id, value, completed) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === id) {
      item.completed = completed;
    }
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}

//Page on load setups
function setupItems() {
  allFilter.innerHTML = "<b>All</b>";
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItems(item.id, item.value, item.completed);
    });
  }
}

function createListItems(id, value, completed) {
  let li = document.createElement("li");
  let attr = document.createAttribute("data-id");
  attr.value = id;
  li.setAttributeNode(attr);
  let items = getLocalStorage();
  li.innerHTML =
    '<div><i class="fa-regular fa-circle"></i>&nbsp;&nbsp;&nbsp;&nbsp;' +
    value +
    '</div><i class="fa-regular fa-circle-xmark"></i>';
  const circle = li.querySelector(".fa-circle");
  if (completed === true) {
    circle.classList.remove("fa-circle");
    circle.classList.add("fa-circle-check");
    circle.style.color = "green";
  }
  circle.addEventListener("click", completeItem);
  const circleXMark = li.querySelector(".fa-circle-xmark");
  circleXMark.addEventListener("click", deleteItem);
  itemList.appendChild(li);
  counter.innerHTML =
    "<b>" +
    items.filter((item) => item.completed === false).length +
    "</b> tasks left";
}
