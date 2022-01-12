//Consigo el cuerpo de la tabla
const fruitsTableBody = document.querySelector('#fruits-table > tbody');

//Consigo el botón de agregar fruta
const addFruitButton = document.getElementById('add-fruit-button');
addFruitButton.addEventListener('click', addFruit);

//Conseguir el formulario
const fruitForm = document.getElementById('fruit-form');

//Conseguir cada uno de los campos del formulario
const nameField = document.querySelector('[name="name"]');
const expiryDateField = document.querySelector('[name="expiryDate"]');
const priceField = document.querySelector('[name="price"]');
const quantityField = document.querySelector('[name="quantity"]');

/**
 * Se programaron cada uno de los elementos del formulario para obtener cada uno de
 * los valores de la entidad fruta.
 */
const currentFruit = { name: '', expiryDate: '', price: '', quantity: '' };

nameField.addEventListener('input', (event) => {
  currentFruit.name = event.target.value;
});

expiryDateField.addEventListener('input', (event) => {
  currentFruit.expiryDate = event.target.value;
});

priceField.addEventListener('input', (event) => {
  currentFruit.price = event.target.value;
});

quantityField.addEventListener('input', (event) => {
  currentFruit.quantity = event.target.value;
});

//Función para agregar o crear una fruta: CREATE
function addFruit() {
  fruits.push(Object.assign({}, currentFruit));
  listFruits();
  fruitForm.reset();
}

//Función para mostrar el listado de frutas
function listFruits() {
  //Borramos el pizarrón para poder redibujar el array con forEach
  fruitsTableBody.innerHTML = '';

  //El forEach redibuja cada una de las filas y columnas de la tabla
  fruits.forEach((fruit, index) => {
    const fruitRow = document.createElement('tr');
    fruitRow.innerHTML = `
      <th scope="row">${index + 1}</th>
      <td>${fruit.name}</td>
      <td>${fruit.expiryDate}</td>
      <td>${fruit.price}</td>
      <td>${fruit.quantity}</td>
    `;
    fruitsTableBody.appendChild(fruitRow);
  });
}

//Se invoca el listado de frutas cuando inicia el programa
listFruits();
