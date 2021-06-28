import express from 'express';
import logger from '../../configuraciones/logger';

import test from '../../controladores/test.ctr';
import productos from '../../controladores/productos.ctr';
import descuentos from '../../controladores/descuentos.ctr';
import carrito from '../../controladores/carrito.ctr';

const enrutador = express.Router()

enrutador.use('/test', test );
enrutador.use('/producto', productos );
enrutador.use('/descuento', descuentos );
enrutador.use('/carrito', carrito );

logger.info('TEST: SERVIDOR', '     /test');
logger.info('PRODUCTOS', '          /producto');
logger.info('DESCUENTOS', '         /descuento');
logger.info('CARRITO', '            /carrito');


export default enrutador;