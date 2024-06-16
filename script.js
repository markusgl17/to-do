//create new List item

// const createNewListItem = (e) => {
//   e.preventDefault();
//   const itemInput = document.getElementById('item-input').value;
//   const list = document.querySelector('#item-list');

//   const newLi = document.createElement('li');
//   newLi.innerText = itemInput;

//   newLi.appendChild(createRemoveButton());
//   list.appendChild(newLi);
// };

// const createRemoveButton = () => {
//   const newBtn = document.createElement('button');
//   newBtn.classList.add('remove-item', 'btn-link', 'text-red');

//   const newI = document.createElement('i');
//   newI.classList.add('fa-solid', 'fa-xmark');

//   newBtn.appendChild(newI);

//   return newBtn;
// };

// const addItemButton = document
//   .querySelector('#item-form')
//   .children[1].querySelector('.btn');

// addItemButton.addEventListener('click', createNewListItem);

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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

  li.appendChild(button);

  itemList.appendChild(li);

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

itemForm.addEventListener('submit', addItem);
