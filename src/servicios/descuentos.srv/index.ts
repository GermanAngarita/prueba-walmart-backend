import DescuentoModel from '../../modelos/descuentos/descuento.model';
import { IDescuento } from '../../interfaces/descuentos';
import IRespuesta from '../../interfaces/repuesta.interface';
import { descuentos_json } from '../../utilidades/descuentos';

export const crearDescuentos = async (): Promise<IRespuesta> => {

    const descuentos: Array<any> = descuentos_json;

    try {
        const respuesta = await DescuentoModel.insertMany( descuentos )

        return {
            estatus: true,
            resultadoOperacion: 'Se han creado los descuentos.',
            data: {
                respuesta: respuesta
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo crear los descuentos.',
            error: error
        }
    }
    
}