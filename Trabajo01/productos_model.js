const {readFileSync} = require('fs');
var cargarProductos = () => JSON.parse(readFileSync('./datos/Productos.json'));
module.exports = {cargarProductos};