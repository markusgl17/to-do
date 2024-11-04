itemForm = document.getElementById('item-form');
editForm = document.getElementById('edit-form');
itemList = document.getElementById('item-list');
clearBtn = document.getElementById('clear');
filter = document.getElementById('filter');
exitEdit = document.getElementById('exit-edit');

var oldItem = '';

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

function setEditMode(e) {
  if (e.target.tagName === 'LI') {
    itemForm.style.display = 'None';
    filter.style.display = 'None';
    editForm.style.display = 'block';
    Array.from(itemList.children).forEach((element) => {
      element.style.color = '#000';
      console.log(element);
    });
    e.target.style.color = 'grey';
    editInput = document.getElementById('edit-input');
    oldItem = e.target.textContent;
    editInput.value = e.target.textContent;
    editInput.focus();
  }
}

function offsetEditMode() {
  itemForm.style.display = 'block';
  filter.style.display = 'block';
  editForm.style.display = 'None';
}

function editItemFromForm(e) {
  e.preventDefault();
  newItem = editInput.value;
  items = getItemsFromLocalStorage();
  index = items.indexOf(oldItem);
  if (index >= 0) {
    items[index] = newItem;
    items_JSON = JSON.stringify(items);
    console.log(items_JSON);
    localStorage.setItem('items', items_JSON);
    displayItemsUI();
    offsetEditMode();
  }
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
    const index = items.indexOf(item);
    if (index !== -1) {
      // Check if the element exists
      items.splice(index, 1);
    }
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
  }

  items.forEach((item) => displaySingleItemUI(item));
}

function deleteLI(e) {
  if (e.target.tagName === 'I') {
    const itemText = e.target.parentElement.parentElement.textContent;
    itemText;
    console.log(`Items text ${itemText}`);
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
  itemList.addEventListener('click', setEditMode);
  editForm.addEventListener('submit', editItemFromForm);
  exitEdit.addEventListener('click', offsetEditMode);
});
