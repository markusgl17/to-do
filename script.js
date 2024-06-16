const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // create listItem

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  // Add li to DOM
  li.appendChild(button);

  itemList.appendChild(li);

  //Check UI
  checkUI();

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const i = createIcon('fa-solid fa-xmark');
  button.appendChild(i);
  return button;
}

function createIcon(classes) {
  const i = document.createElement('i');
  i.className = classes;
  return i;
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (window.confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

function clearAllItems() {
  if (window.confirm('Are you sure?')) {
    itemListArray = Array.from(itemList.children);
    itemListArray.forEach((item) => item.remove());
    checkUI();
  }
}

function filterItems(e) {
  const items = document.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  console.log(text);

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'None';
    }
  });
}

function checkUI() {
  const items = document.querySelectorAll('li');
  if (items.length === 0) {
    filter.style.display = 'None';
    clearButton.style.display = 'None';
  } else {
    filter.style.display = 'block';
    clearButton.style.display = 'block';
  }
}

//EventListeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearAllItems);
itemFilter.addEventListener('input', filterItems);

//when page loads
checkUI();
