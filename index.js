//Consigo el cuerpo de la tabla
const fruitsTableBody = document.querySelector('#fruits-table > tbody');

//Consigo el contenedor de los botens de acción
const fruitButtonsContainer = document.getElementById(
  'fruit-buttons-container'
);

//Consigo el botón de agregar fruta
const actionFruitButton = document.getElementById('action-fruit-button');
actionFruitButton.addEventListener('click', fruitFormAction);

//Conseguir el formulario
const fruitForm = document.getElementById('fruit-form');

//Variable que gestiona el modo del formulario
let fruitFormMode = 'create';

//Conseguir cada uno de los campos del formulario
const nameField = document.querySelector('[name="name"]');
const expiryDateField = document.querySelector('[name="expiryDate"]');
const priceField = document.querySelector('[name="price"]');
const quantityField = document.querySelector('[name="quantity"]');

/**
 * Se programaron cada uno de los elementos del formulario para obtener cada uno de
 * los valores de la entidad fruta.
 */
let currentFruit = { name: '', expiryDate: '', price: '', quantity: '' };

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

//Función para gestionar la creación o edición de un registro
function fruitFormAction() {
  switch (fruitFormMode) {
    case 'create':
      //Se ejecuta la función de crear la fruta
      alert('Voy a crear una fruta');
      break;
    case 'update':
      //Se ejecuta la función de actualizar la fruta
      alert('Voy a actualizar una fruta');
      break;
    default:
      break;
  }
}

//Función para cambiar el nombre del botón según el modo
function changeActionFruitButtonText() {
  switch (fruitFormMode) {
    case 'create':
      //Se cambia el nombre del botón a crear
      actionFruitButton.innerText = 'Crear';
      actionFruitButton.className = 'btn btn-primary';
      break;
    case 'update':
      //Se cambia el nombre del botón a actualizar
      actionFruitButton.innerText = 'Modificar';
      actionFruitButton.className = 'btn btn-info text-white';
      break;
    default:
      break;
  }
}

//Función para agregar o eliminar el botón de cancelar
function handleCancelFruitActionButton() {
  switch (fruitFormMode) {
    case 'create':
      //Debemos borrar el botón cancelar
      alert('Debemos borrar el botón cancelar');
      break;
    case 'update':
      //Si el botón de cancelar ya existe, no añadimos otro botón de cancelar
      if (document.getElementById('cancel-fruit-button') !== null) {
        return;
      }

      //Debemos agregar el botón cancelar
      const cancelFruitButton = document.createElement('button');
      cancelFruitButton.className = 'btn btn-secondary';
      cancelFruitButton.innerText = 'Cancelar';
      cancelFruitButton.id = 'cancel-fruit-button';
      cancelFruitButton.addEventListener('click', () => {
        /**
         * - Debo removerme
         * - Debo cambiar el modo a create
         * - Debo vaciar el formulario
         * - Debo cambiar el texto a 'Crear' y color a 'primary' del botón de acción
         */
        cancelFruitButton.remove();
        fruitFormMode = 'create';
        fruitForm.reset();
        changeActionFruitButtonText();
      });
      fruitButtonsContainer.appendChild(cancelFruitButton);
      break;
    default:
      break;
  }
}

//Función para agregar o crear una fruta: CREATE
function createFruit() {
  fruits.push(Object.assign({}, currentFruit));
  listFruits();
  fruitForm.reset();
}

//Función para cargar la fruta en el formulario
function loadFruitInForm(index) {
  //Se cambia el modo del formulario a actualizar cuando se carga una fruta al formulario
  fruitFormMode = 'update';
  currentFruit = Object.assign({}, fruits[index]);
  nameField.value = currentFruit.name;
  expiryDateField.value = currentFruit.expiryDate;
  priceField.value = currentFruit.price;
  quantityField.value = currentFruit.quantity;

  //Se hace el cambio del nombre del botón
  changeActionFruitButtonText();

  //Se agrega el botón de cancelar
  handleCancelFruitActionButton();
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
      <td>
        <button 
          type="button" 
          class="btn btn-primary" 
          title="Editar" 
          onclick="loadFruitInForm(${index})"
        >
          <i class="fas fa-pen"></i>
        </button>
        <button type="button" class="btn btn-info text-white" title="Ver registro">
          <i class="fas fa-eye"></i>
        </button>
        <button type="button" class="btn btn-danger" title="Eliminar">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    fruitsTableBody.appendChild(fruitRow);
  });
}

//Se invoca el listado de frutas cuando inicia el programa
listFruits();
