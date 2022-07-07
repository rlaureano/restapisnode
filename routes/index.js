const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

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

    // Eliminar un producto por su ID
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    /*** PREDIDOS ***/

    // Agrega nuevos pedidos
    router.post('/pedidos', pedidosController.nuevoPedido)

    // Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos)

    // Mustra pedido por su id
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

    // Actualizar pedidos
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    // Elimiar un pedido por el ID
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)
    
    return router
}
