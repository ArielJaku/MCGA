var {cargarProductos} = require('./productos_model')
var {cargarClientes} = require('./clientes_model')
var express = require('express')
var server = express()
const bodyParser = require('body-parser'); 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
var port = 3000;
server.use(express.urlencoded({extended: false}));

//ESPACIO PARA PRODUCTOS
server.get('/getProductos', function (req, res) {
   res.send(200,cargarProductos())
});

server.get('/getProducto/:id', function (req, res) {
   var id = parseInt(req.params.id);
   //console.log(id);

   var productos = cargarProductos();      
   var producto = productos["producto" + req.params.id]    
   res.end(JSON.stringify(producto));

   // Verificar si el id no es un numero o es menor que 1
   if (isNaN(id) || id < 1) {
      // Id inválido, almacenar un mensaje de error en el objeto de respuesta
      console.log('Id inválido. Por favor, proporcione un id válido mayor o igual a 1.');
   }
});

server.delete('/deleteProducto/:id', function(req,res){
   var productos = cargarProductos();
   delete productos["producto" + req.params.id]
   res.end(JSON.stringify(productos));
})

server.post('/postProducto/', function(req,res){   
   var productos = cargarProductos();
   var id = req.body.id;
   var nombre = req.body.nombre;
   var tipo = req.body.tipo;
   var nom = "producto" + id
   var producto = {
      [nom] : {
          "id": id,
          "nombre":nombre,
          "tipo":tipo
        },
   }
   productos[nom] = producto[nom];
   res.end(JSON.stringify(productos))
})
//ESPACIO PARA CLIENTES
server.get('/getClientes', function (req, res) {
   res.send(cargarClientes())
});

server.get('/getCliente/:id', function (req, res) {
   var clientes = cargarClientes();      
   var cliente = clientes["cliente" + req.params.id]    
   res.end(JSON.stringify(cliente));
});

server.delete('/deleteCliente/:id', function(req,res){
   var clientes = cargarClientes();
   delete clientes["cliente" + req.params.id]
   res.end(JSON.stringify(clientes));
})

server.post('/postCliente/', function(req,res){   
   var clientes = cargarClientes();
   var id = req.body.id;
   var nombre = req.body.nombre;
   var apellido = req.body.apellido;
   var direccion = req.body.direccion;
   var telefono = req.body.telefono;
   var correo = req.body.correo;
   var genero = req.body.genero;   
   var nom = "cliente" + id
   var cliente = {
      [nom] : {
          "id": id,
          "nombre":nombre,
          "apellido":apellido,
          "direccion":direccion,
          "telefono":telefono,
          "correo":correo,
          "genero":genero,
        },
   }
   clientes[nom] = cliente[nom];
   res.end(JSON.stringify(clientes))
})

server.listen(port, () => {
    console.log(`El servidor se encuentra escuchando en el puerto ${port}`)
  })