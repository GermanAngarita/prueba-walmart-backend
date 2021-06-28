import { Request, Response, Router } from 'express';
import { crearDescuentos } from '../../servicios/descuentos.srv';
const Descuento = Router();

Descuento.get('/crear-descuentos', async ( req: Request, res: Response  ) => {
    try {
        const respuesta = await crearDescuentos();

        return res.status(200).send( respuesta );
    } catch (error) {
        return res.status(500).send( error );
    }
})

export default Descuento;