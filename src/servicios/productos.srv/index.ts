import ProductoModel from '../../modelos/productos/producto.model';
import { IProducto } from '../../interfaces/productos';
import IRespuesta from '../../interfaces/repuesta.interface';
import { productos_json } from '../../utilidades/productos';

export const crearProductos = async (): Promise<IRespuesta> => {

    const productos: Array<IProducto> = productos_json;

    try {
        const respuesta = await ProductoModel.insertMany( productos );

        return {
            estatus: true,
            resultadoOperacion: 'Se ha creado los productos de forma exitosa.',
            data: {
                respuesta: respuesta
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo crear los productos.',
            error: error
        }
    }
    
}

export const consultaProductos = async ( payload: IConsultaProductos ): Promise<IRespuesta> => {

    const data = payload;
    const busqueda = new RegExp( data.busqueda, 'i')
    let productos

    try {
        productos = await ProductoModel.find({
            $or:[
                { description: busqueda },
                { brand: busqueda }
            ]
        }).skip( data.salto ).limit( data.limite )

    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo consultar los productos.',
            error: error
        }
    }

    let total
    try {
        total = await ProductoModel.countDocuments({
            $or:[
                { description: busqueda },
                { brand: busqueda }
            ]
        })

    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo consultar los productos.',
            error: error
        }
    }

    if ( productos && productos.length === 0 ) {
        return {
            estatus: true,
            resultadoOperacion: 'No se encontraron productos, por favor intenta con otra búsqueda.',
            data: {
                productos: [],
                total: total
            }
        }
    }
    return {
        estatus: true,
        resultadoOperacion: 'Se han encontrado productos.',
        data: {
            productos: productos,
            total: total
        }
    }
}

export interface IConsultaProductos {
    limite: number;
    salto: number;
    busqueda: string;
}