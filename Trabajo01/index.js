var {cargarProductos} = require('./productos_model')
var express = require('express')
var server = express()
const bodyParser = require('body-parser'); 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
var port = 3000;
server.use(express.urlencoded({extended: false}));

server.get('/getProductos', function (req, res) {
   res.send(cargarProductos())
});

server.get('/getProducto/:id', function (req, res) {
   var productos = cargarProductos();      
   var producto = productos["producto" + req.params.id]    
   res.end(JSON.stringify(producto));
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

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })