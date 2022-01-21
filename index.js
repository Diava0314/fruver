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

//Variable para almacenar el índice de un registro
let fruitIndex = undefined;

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
      createFruit();
      break;
    case 'update':
      //Se ejecuta la función de actualizar la fruta
      updateFruit();
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
      document.getElementById('cancel-fruit-button').remove();
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

//Función para actualizar una fruta: UPDATE
function updateFruit() {
  //1. Se modifica la fruta en la posición del indice con el valor de la fruta actual.
  fruits[fruitIndex] = Object.assign({}, currentFruit);
  //2. Redibujamos los registros de la tabla de frutas.
  listFruits();
  //3. Limpiar el formulario
  fruitForm.reset();
  //4 Cambiar el modo del formulario a crear
  fruitFormMode = 'create';
  changeActionFruitButtonText();
  handleCancelFruitActionButton();
}

//Función para eliminar una fruta: DELETE
function deleteFruit(index) {
  fruits = fruits.filter((_, i) => {
    return i !== index;
  });
  listFruits();
}

//Función para cargar la fruta en el formulario
function loadFruitInForm(index) {
  //Se cambia el modo del formulario a actualizar cuando se carga una fruta al formulario
  fruitFormMode = 'update';
  fruitIndex = index;
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
    fruitRow.innerHTML = /*html */ `
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
        <button 
          type="button" 
          class="btn btn-info text-white" 
          title="Ver registro"
          onclick="showFruit(${index})"
        >
          <i class="fas fa-eye"></i>
        </button>
        <button 
          type="button" class="btn btn-danger" 
          title="Eliminar"
          onclick="deleteFruit(${index})"
        >
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    fruitsTableBody.appendChild(fruitRow);
  });
}

//Se invoca el listado de frutas cuando inicia el programa
listFruits();

/**
 * Modal de bootstrap
 * 1. Declaramos una constante donde se va a guardar la ventana modal de bs.
 * 2. Creamos una nueva instancia con la clase de boostrap new bootstrap.Modal
 * 3. Dentro de la clase vamos a añadir el elemento html de la ventana modal
 */

const modalHtmlElement = document.getElementById('view-fruit');
const boostrapModal = new bootstrap.Modal(modalHtmlElement);

//Función que invoca el detalle de la fruta en una modal
function showFruit(index) {
  const modalTitle = document.querySelector('#view-fruit .modal-title');
  const modalBody = document.querySelector('#view-fruit .modal-body');
  boostrapModal.show();
  modalBody.innerHTML = `
    <ul>
      <li><b>Nombre:</b> ${fruits[index].name}</li>
      <li><b>Precio:</b> $${fruits[index].price}</li>
      <li><b>Cantidad:</b> ${fruits[index].quantity}</li>
      <li><b>Fecha de vencimiento:</b> ${fruits[index].expiryDate}</li>
    </ul>
  `;
  modalTitle.innerText = fruits[index].name;
}
