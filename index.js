/**
 * DOM (Document object model) -> document
 */

//1. Consigo el cuerpo de la tabla
const fruitsTableBody = document.querySelector('#fruits-table > tbody');

//2. Creo una fila con su contenido
const fruitRow1 = document.createElement('tr');
fruitRow1.innerHTML = `
<th scope="row">1</th>
<td>${fruit1.name}</td>
<td>${fruit1.expiryDate}</td>
<td>${fruit1.price}</td>
<td>${fruit1.quantity}</td>
`;

const fruitRow2 = document.createElement('tr');
fruitRow2.innerHTML = `
<th scope="row">2</th>
<td>${fruit2.name}</td>
<td>${fruit2.expiryDate}</td>
<td>${fruit2.price}</td>
<td>${fruit2.quantity}</td>
`;

const fruitRow3 = document.createElement('tr');
fruitRow3.innerHTML = `
<th scope="row">3</th>
<td>${fruit3.name}</td>
<td>${fruit3.expiryDate}</td>
<td>${fruit3.price}</td>
<td>${fruit3.quantity}</td>
`;

const fruitRow4 = document.createElement('tr');
fruitRow4.innerHTML = `
<th scope="row">4</th>
<td>${fruit4.name}</td>
<td>${fruit4.expiryDate}</td>
<td>${fruit4.price}</td>
<td>${fruit4.quantity}</td>
`;

const fruitRow5 = document.createElement('tr');
fruitRow5.innerHTML = `
  <th scope="row">5</th>
  <td>${fruit5.name}</td>
  <td>${fruit5.expiryDate}</td>
  <td>${fruit5.price}</td>
  <td>${fruit5.quantity}</td>
`;

//3. Agrego la fila al cuerpo de la tabla
fruitsTableBody.appendChild(fruitRow1);
fruitsTableBody.appendChild(fruitRow2);
fruitsTableBody.appendChild(fruitRow3);
fruitsTableBody.appendChild(fruitRow4);
fruitsTableBody.appendChild(fruitRow5);
