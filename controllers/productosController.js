const Productos = require('../models/Productos')

const multer = require('multer')
const shortid = require('shortid')

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/')
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1]
            cb(null, `${shortid.generate()}.${extension}`)
        }
    }),
    fileFilter(req, file, cb) {
        if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
            cb(null, true)
        } else {
            cb( new Error('Formato no válido'))
        }
    }
}

// Pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen')

//Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload( req, res, function (error){
        if(error) {
            res.json({mensaje: error})
        } 
        return next()
    })
}

// Agrega nuevos productos
exports.nuevoProducto = async (req, res, next) => {
    const producto = new Productos(req.body)
    
    try {
        if( req.file.filename ) {
            producto.imagen = req.file.filename
        }
        await producto.save()
        res.json({mensaje : 'Se agregó un nuevo producto'})

    } catch (err) {

        console.log(err)
        next()

    }
}

// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
    try{
        // Obtener todos los productos
        const productos = await Productos.find({})
        res.json(productos)
    } catch (err) {
        console.log(err)
    }
}

exports.mostrarProducto = async (req, res, next) => {
    const producto = await Productos.findById(req.params.idProducto) 

    if( !producto ) {
        res.json({mensaje: 'Ese Producto no existe'})
        return next()
    }

    // Mostrar el produto
    res.json(producto)
}

// Actualiza un producto vía ID
exports.actualizarProducto = async ( req, res, next ) => {
    try {
        
        // Construir un nuevo producto
        let nuevoProducto = req.body

        // Verifica si hay umagen nueva
        if( req.file ) {
            nuevoProducto.imagen = req.file.filename
        } else {
            let productoAnterior = await Productos.findById(req.params.idProducto)
            nuevoProducto.imagen = productoAnterior.imagen
        }

        let producto = await Productos.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto, {
                new: true,
            })

        res.json(producto)

    } catch (err) {
        console.log(err)
        next()
    }
}

// Elimian un productucto vía ID
exports.eliminarProducto = async (req, res, next) => {
    try {
        await Productos.findByIdAndDelete({_id: req.params.idProducto})
        res.json({mensaje: 'El producto de ha eliminado'})
    } catch (err) {
        res.send(err)
        next()
    }
}