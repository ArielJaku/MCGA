const {readFileSync} = require('fs');
var cargarClientes = () => JSON.parse(readFileSync('./datos/Clientes.json'));
module.exports = {cargarClientes};