import invoices, {invoiceByClientName, paper } from "./data/invoices";

const invoicesName = invoices.map( i => i.name );

console.log(invoices);
console.log(invoicesName);

console.log('map');
const invoicesClient = invoices.map( i => i.client.name);
console.log(invoicesClient);

console.log('find by Id');
const invoiceById = invoices.find(i => i.id === 2);
console.log(invoiceById);

console.log('find by client name');
// const invoiceByClientName = invoices.find(i => i.client.name === 'Pepe');
console.log(invoiceByClientName('Pepe'));

console.log('filter id mayor a 1');
const invoiceFilter = invoices.filter(i => i.id > 1);
console.log(invoiceFilter);

console.log('filter eliminar');
const invoiceDeleted = invoices.filter(i => i.id !== 2);
console.log(invoiceDeleted);

console.log('filter includes');
const invoiceFilter2 = invoices.filter(i => i.items.includes(paper));
console.log(invoiceFilter2);

console.log('some by name');
const result = invoices.some(i => i.client.name === 'Pepe');
console.log(result);

