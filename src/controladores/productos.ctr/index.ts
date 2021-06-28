import { Request, Response, Router } from 'express';
import { crearProductos, consultaProductos } from '../../servicios/productos.srv';

const Producto = Router();

Producto.get('/crear-productos', async ( req: Request, res: Response  ) => {
    try {
        const respuesta = await crearProductos();

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

Producto.post('/consulta-productos', async ( req: Request, res: Response  ) => {

    const data = req.body
    try {
        const respuesta = await consultaProductos( data );

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

export default Producto;