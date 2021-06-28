import { Request, Response, Router } from 'express';
import { crearCarrito, consultaCarrito, agregarProducto, eliminarProducto } from '../../servicios/carrito.srv';

const Carrito = Router();

Carrito.post('/crear-carrito', async ( req: Request, res: Response  ) => {
    try {
        const respuesta = await crearCarrito();

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

Carrito.post('/consulta-carrito', async ( req: Request, res: Response  ) => {

    const data = req.body;
    try {
        const respuesta = await consultaCarrito( data );

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

Carrito.post('/agregar-producto', async ( req: Request, res: Response  ) => {

    const data = req.body;
    try {
        const respuesta = await agregarProducto( data );

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

Carrito.post('/eliminar-producto', async ( req: Request, res: Response  ) => {

    const data = req.body;
    try {
        const respuesta = await eliminarProducto( data );

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})



export default Carrito;