const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')

module.exports = function () {

    // Agrega nuevos clientes vía POST
    router.post('/clientes', clienteController.nuevoCliente)

    // Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes)

    // Muestra un cliente en específico
    router.get('/clientes/:idCliente', clienteController.mostrarCliente)

    // Actualizar Cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente)

    // Eliminar Cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

    /** PRODUCTOS */

    // Nuevos productos
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    )

    // Muestra todos los productos
    router.get('/productos', productosController.mostrarProductos)

    // Muestra producto en específico por su ID
    router.get('/productos/:idProducto', productosController.mostrarProducto)

    // Actualizar productos
    router.put('/productos/:idProducto',
        productosController.subirArchivo,
        productosController.actualizarProducto
    )

    // Eliinar un producto por su ID
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    return router
}
