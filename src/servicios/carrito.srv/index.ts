import { ICarrito, ICarritoProductos, IProductosCarrito, IProductosCarritoId } from '@src/interfaces/carrito';
import { IDescuento } from '@src/interfaces/descuentos';
import IRespuesta from '@src/interfaces/repuesta.interface';
import CarritoModel from '../../modelos/carrito/carrito.model';
import DescuentoModel from '../../modelos/descuentos/descuento.model';

export const crearCarrito = async ( ): Promise<IRespuesta> => {

    const nuevoCarrito = new CarritoModel( {
        total: 0,
        sub_total: 0,
        mensaje: '',
        descuento: {
            valor: 0,
            mensaje: ''
        },
        productos: []
    } );

    try {
        const crear = await nuevoCarrito.save();

        return {
            estatus: true,
            resultadoOperacion: 'Se ha creado un nuevo carrito.',
            data: {
                carrito: crear
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo crear el carrito de compras',
            error: error
        }
    }
}

export const consultaCarrito = async ( payload: IConsultaCarrito ): Promise<IRespuesta> => {

    const data = payload;

    let carrito: ICarritoProductos;
    try {
        carrito = (await CarritoModel.findById({ _id: data._id  }).populate( 'productos.producto' )) as ICarritoProductos;

        if (!carrito) {
            return {
                estatus: false,
                resultadoOperacion: 'No existe este carrito.'
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo consultar este carrito de compras.',
            error: error
        }
    }

    if ( carrito.productos && carrito.productos.length > 0 ) {
        const marcas: Array<string> = []
        carrito.productos?.map( ( i: IProductosCarrito ) => {
            i.total = i.cantidad * i.producto.price;
            marcas.push(i.producto.brand);
            if (carrito.sub_total !== undefined ) carrito.sub_total += i.total;
        } )
    
        let descuentos: Array<IDescuento>;
        try {
            descuentos = (await DescuentoModel.find({ brand: { $in: marcas }}).sort({ discount: 1 })) as Array<IDescuento>
    
        } catch (error) {
            return {
                estatus: false,
                resultadoOperacion: 'No se pudo consultar el listado de descuentos.',
                error: error
            }
        }
    
        // descuentos.map( (i: IDescuento ) => {
        //     carrito.productos?.map( ( j: IProductosCarrito) => {
        //         if ( i.brand === j.producto.brand ) {
        //             if ( i.valorComprado !== undefined ) i.valorComprado += j.total;
        //         }
    
        //         if ( i.valorComprado !== undefined && i.threshold !== undefined) {
        //             if (i.valorComprado >= i.threshold ) {
        //                 i.aplicaDescuento = true;
        //             }
        //         }
    
                
        //     } )
        // } )
    
        // descuentos.map( (i: IDescuento ) => {
        //     if ( i.aplicaDescuento ) {
        //         if(carrito.descuento ) carrito.descuento.valor = i.discount ? i.discount: 0
        //         if(carrito.descuento ) carrito.descuento.mensaje = `Se aplicó un descuento de ${carrito.descuento.valor} por haber comprado ${i.valorComprado} de productos ${i.brand}!`
        //     }
        // } )
    
        // carrito.total = (carrito.sub_total? carrito.sub_total: 0) - (carrito.descuento?.valor? carrito.descuento?.valor: 0)
    
        // if ( !descuentos[ descuentos.length- 1 ].aplicaDescuento ) {
        //     const umbral = descuentos[ descuentos.length- 1 ].threshold ? descuentos[ descuentos.length- 1 ].threshold: 0;
        //     const valorComprado = descuentos[ descuentos.length- 1 ].valorComprado ? descuentos[ descuentos.length- 1 ].valorComprado : 0;
        //     const marca = descuentos[ descuentos.length- 1 ].brand
        //     const descuento = descuentos[ descuentos.length- 1 ].discount
        //     if (umbral !== undefined && valorComprado !== undefined) {
        //         const valor_faltante = umbral - valorComprado
        //         carrito.mensaje = `Agrega ${valor_faltante} más en productos ${marca} y aprovecha un descuento total de ${descuento} en tu compra!`
        //     }
        // }

        const resultadoCalculos = calculosCarrito({
            carrito: carrito,
            descuentos: descuentos
        })

        if ( resultadoCalculos.estatus ) {
            carrito = resultadoCalculos.data;
        }
    }

    return {
        estatus: true,
        resultadoOperacion: 'Consulta del carrito exitosa.',
        data: {
            carrito: carrito
        }
    }
}

export const calculosCarrito = ( payload: ICalculosCarrito ): IRespuesta => {

    const data = payload;
    let descuentos = data.descuentos;
    let carrito = data.carrito;

    descuentos.map( (i: IDescuento ) => {
        carrito.productos?.map( ( j: IProductosCarrito) => {
            if ( i.brand === j.producto.brand ) {
                if ( i.valorComprado !== undefined ) i.valorComprado += j.total;
            }

            if ( i.valorComprado !== undefined && i.threshold !== undefined) {
                if (i.valorComprado >= i.threshold ) {
                    i.aplicaDescuento = true;
                }
            }

            
        } )
    } )

    descuentos.map( (i: IDescuento ) => {
        if ( i.aplicaDescuento ) {
            if(carrito.descuento ) carrito.descuento.valor = i.discount ? i.discount: 0
            if(carrito.descuento ) carrito.descuento.mensaje = `Se aplicó un descuento de ${carrito.descuento.valor} por haber comprado ${i.valorComprado} de productos ${i.brand}!`
        }
    } )

    carrito.total = (carrito.sub_total? carrito.sub_total: 0) - (carrito.descuento?.valor? carrito.descuento?.valor: 0)

    if ( !descuentos[ descuentos.length- 1 ].aplicaDescuento ) {
        const umbral = descuentos[ descuentos.length- 1 ].threshold ? descuentos[ descuentos.length- 1 ].threshold: 0;
        const valorComprado = descuentos[ descuentos.length- 1 ].valorComprado ? descuentos[ descuentos.length- 1 ].valorComprado : 0;
        const marca = descuentos[ descuentos.length- 1 ].brand
        const descuento = descuentos[ descuentos.length- 1 ].discount
        if (umbral !== undefined && valorComprado !== undefined) {
            const valor_faltante = umbral - valorComprado
            carrito.mensaje = `Agrega ${valor_faltante} más en productos ${marca} y aprovecha un descuento total de ${descuento} en tu compra!`
        }
    }

    return {
        estatus: true,
        resultadoOperacion: 'Cálculos exitosos',
        data: carrito
    }
}

export const agregarProducto = async ( payload: IAgregarProducto ): Promise<IRespuesta> => {

    const data = payload;

    let existeCarrito
    try {
        existeCarrito = (await CarritoModel.findById({ _id: data.idCarrito }, { _id: 0 })) as ICarrito

        if ( !existeCarrito ) {
            return {
                estatus: false,
                resultadoOperacion: 'No existe este carrito'
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo consultar el carrito de compras.'
        }
    }

    const existeProducto = existeCarrito.productos?.find( ( i: IProductosCarritoId ) => {
        if ( i.producto.toString() === data.idProducto.toString() ) {
            return i
        }
    } )

    if ( existeProducto ) {
        existeCarrito.productos?.map( ( i: IProductosCarritoId ) => {
            if ( i.producto.toString() === data.idProducto.toString() ) {
                i.cantidad = data.cantidad + i.cantidad;
            }
        } )
    } else {
        existeCarrito.productos?.unshift({
            producto: data.idProducto,
            cantidad: data.cantidad,
            total: 0
        })
    }

    let actualizarCarrito
    try {
        actualizarCarrito = await CarritoModel.findByIdAndUpdate({ _id: data.idCarrito }, existeCarrito, { new: true } );
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo actualizar el carrito',
            error: error
        }
    }

    return {
        estatus: true,
        resultadoOperacion: 'Se ha agregado el producto de forma exitosa.',
        data: {
            carrito: actualizarCarrito
        }
    }
}

export const eliminarProducto = async ( payload: IEliminarProducto ): Promise<IRespuesta> => {
    const data = payload;

    let existeCarrito
    try {
        existeCarrito = (await CarritoModel.findById({ _id: data.idCarrito }, { _id: 0 })) as ICarrito

        if ( !existeCarrito ) {
            return {
                estatus: false,
                resultadoOperacion: 'No existe este carrito'
            }
        }
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo consultar el carrito de compras.'
        }
    }

    const existeProducto = existeCarrito.productos?.find( ( i: IProductosCarritoId ) => {
        if ( i.producto.toString() === data.idProducto.toString() ) {
            return i
        }
    } )

    if (!existeProducto) {
        return {
            estatus: false,
            resultadoOperacion: 'Este producto ya fué eliminado.'
        }
    }

    const index = existeCarrito.productos?.indexOf( existeProducto );

    if (index !== undefined ) {
        existeCarrito.productos?.splice( index, 1 );
    }

    let actualizarCarrito
    try {
        actualizarCarrito = await CarritoModel.findByIdAndUpdate({ _id: data.idCarrito }, existeCarrito, { new: true } );
    } catch (error) {
        return {
            estatus: false,
            resultadoOperacion: 'No se pudo actualizar el carrito',
            error: error
        }
    }
    

    return {
        estatus: true,
        resultadoOperacion: 'Se ha eliminado un producto del carrito.',

    }
}

export interface IConsultaCarrito {
    _id: string;
}

export interface IAgregarProducto {
    idCarrito: string;
    idProducto: string;
    cantidad: number;
}

export interface IEliminarProducto {
    idCarrito: string;
    idProducto: string;
    cantidad: number;
}

export interface ICalculosCarrito {
    descuentos: Array<IDescuento>;
    carrito: ICarritoProductos
}