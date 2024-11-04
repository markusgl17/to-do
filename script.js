itemForm = document.getElementById('item-form');
itemList = document.getElementById('item-list');
clearBtn = document.getElementById('clear');
filter = document.getElementById('filter');

function getItemFromForm(e) {
  e.preventDefault();
  item = document.getElementById('item-input');
  setItemToLocalStorage(item.value);
  item.value = '';
  displayItemsUI();
}

function getItemsFromLocalStorage() {
  isNullItems = localStorage.getItem('items');

  if (isNullItems === null) {
    items = JSON.stringify([]);
    localStorage.setItem('items', items);
  }
  items = JSON.parse(localStorage.getItem('items'));

  return items;
}

function setItemToLocalStorage(item) {
  const items = getItemsFromLocalStorage();
  items.push(item);

  items_JSON = JSON.stringify(items);
  console.log(items_JSON);
  localStorage.setItem('items', items_JSON);
}

function filterItems(e) {
  e.preventDefault();
  query = e.target.value;

  items = getItemsFromLocalStorage();

  const filteredItems = items.filter((item) => {
    return item.includes(query);
  });

  displayItemsUI(filteredItems);
}

function checkElementInArray(element, array) {
  for (const array_element of array) {
    if (array_element === element) {
      return true;
    }
  }
  return false;
}

function deleteItemFromLocalStorage(item) {
  const items = getItemsFromLocalStorage();

  console.log('Delete item');
  console.log(item);
  console.log(checkElementInArray(item, items));
  console.log(`Items delete single: ${items}`);
  if (true) {
    items.pop(item);
    items_JSON = JSON.stringify(items);
    console.log(items_JSON);
    localStorage.setItem('items', items_JSON);
    displayItemsUI();
  }
}

function displaySingleItemUI(itemText) {
  const li = document.createElement('li');
  const textNode = document.createTextNode(itemText);
  const btn = document.createElement('btn');
  btn.classList.add('remove-btn', 'btn-link', 'text-red');
  const i = document.createElement('i');
  // i.innerText = 'x';
  i.classList.add('fa-solid', 'fa-xmark');

  btn.appendChild(i);
  li.appendChild(textNode);
  li.appendChild(btn);

  li.addEventListener('click', deleteLI);

  itemList.appendChild(li);
}

function displayItemsUI(filtered_items) {
  clearUI();
  items = getItemsFromLocalStorage();
  if (filtered_items) {
    items = filtered_items;
    console.log(items);
  }
  console.log(items);
  items.forEach((item) => displaySingleItemUI(item));
}

function deleteLI(e) {
  if (e.target.tagName === 'I') {
    const itemText = e.target.parentElement.parentElement.textContent;
    deleteItemFromLocalStorage(itemText);
  }
}

function clearUI() {
  items = Array.from(itemList.children);
  items.forEach((item) => {
    item.remove();
  });
}

function clear() {
  items = getItemsFromLocalStorage();
  console.log(`Items clear ${items}`);
  items.forEach((item) => {
    deleteItemFromLocalStorage(item);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  itemForm.addEventListener('submit', getItemFromForm);
  displayItemsUI();
  clearBtn.addEventListener('click', clear);
  filter.addEventListener('input', filterItems);
});
