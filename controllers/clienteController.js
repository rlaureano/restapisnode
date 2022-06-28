const Clientes = require('../models/Clientes')

// Agrega un nuevo cliente
exports.nuevoCliente = async(req, res, next) => {
    
    const cliente = new Clientes(req.body)

    try {
        // almacenar el registro
        await cliente.save()
        res.json({mensaje: 'Se agregó un nuevo cliente'})

    } catch (err) {
        console.log(err)
        next()
    }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {

    try {

        const clientes = await Clientes.find({})
        res.json(clientes)

    } catch (err) {
        console.log(err)
        next()
    }
}

// Muestra un cliente por su id
exports.mostrarCliente = async (req, res, next) => {
    
    const cliente = await Clientes.findById(req.params.idCliente)

    if( !cliente ) {
        res.json({ mensaje: 'Ese cliente no existe' })
        next()
    }

    // Mostrar el cliente
    res.json(cliente)

}

// Actuaiza un cliente por su ID
exports.actualizarCliente = async (req, res, next) => {

    try{
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, 
            req.body, { 
                new : true 
            })

        res.json(cliente)

    } catch(err){
        console.log(err);
        next()
    } 

}

// Elimina un cliente por su ID
exports.eliminarCliente = async (req, res, next) => {

    try{
        await Clientes.findOneAndDelete({ _id : req.params.idCliente })
        res.json({mensaje: 'El cliente se ha eliminado'})
    }catch(err){
        console.log(err)
        next()
    }
}