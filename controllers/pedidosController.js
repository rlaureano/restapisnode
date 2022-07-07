const Pedidos = require('../models/Pedidos')

exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)

    try {
        await pedido.save()
        res.json({mensaje: 'Se agregó un nuevo pedido'})
    } catch (err) {
        console.error(err)
        next()
    }   
}

//Muestra todos los pedidos
exports.mostrarPedidos = async (req, res, next) => {
    try {

        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',
            model: 'Productos'
        })

        res.json(pedidos)

    } catch (err) {
        console.log(err)
        next()
    }
} 

// mostrar pedido por ID
exports.mostrarPedido = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    })

    if( !pedido ) {
        res.json({mensaje: "ese pedido no existe"})
    }

    // mostrar pedido
    res.json(pedido)
}

// Actulaiza pedidos vía id
exports.actualizarPedido = async (req, res, next) => {
    try{
        let pedido = await Pedidos.findOneAndUpdate(
            {_id: req.params.idPedido}, 
            req.body, 
            { 
                new: true
            }
        )
        .populate('cliente')
        .populate({
            path: 'pedido.producto',
            model: 'Productos'
        })
    

        res.json(pedido)

    } catch (err) {
        console.log(err)
        next()
    }
}

// Eliminar pedido por id
exports.eliminarPedido = async (req, res, next) => {
    try {
         await Pedidos.findOneAndDelete({_id: req.params.idPedido})
         res.json({mensaje: "El pedido de ha eliminado"})
    } catch (err) {
        console.log(err)
        next()
    }
}