var {cargarProductos} = require('./productos_model')
var express = require('express')
var server = express()
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

server.post('/postProducto/:id:nombre:tipo', function(req,res){
   var id = req.params.id;
   var nombre = req.params.nombre;
   var tipo = req.params.tipo;
   var producto = {
      "producto11": {
          "id":11,
          "nombre":"pizza",
          "tipo":"Alimentos elaborados"
        },
   }    
   var productos = cargarProductos();
   productos["producto11"] = producto["producto11"];
   console.log(id)
   console.log(nombre)
   console.log(tipo);
   res.end(JSON.stringify(productos))
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })