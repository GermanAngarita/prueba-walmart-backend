// © 2020 KIA COLOMBIA - CUSTOMER EXPERIENCE - TODOS LOS DERECHOS RESERVADOS

import { Request, Response, Router } from 'express';
import moment from 'moment-timezone';

import { test } from '../../servicios/test.srv';

const Test = Router();

Test.get('/servidor-en-linea', async (req: Request, res: Response) => {

    const data = req.body;

    let respuesta
    try {
        respuesta = await test({})
    } catch (error) {
        res.status(500).send( error );
    }
    res.status(200).send({
        estatus: 'OK',
        resultadoOperacion: 'Servidor corriendo',
        fecha: moment().format('DD-MM-YYYY'),
        hora: moment().format('hh:mm:ss a'),
        data: respuesta
    })
    
})

export default Test
