import { IProducto } from "../productos";

export interface ICarrito {
    _id?: string;
    total?: number;
    sub_total?: number;
    mensaje?: string;
    descuento?: {
        valor: number;
        mensaje: string;
    };
    productos?: Array<IProductosCarritoId>
}

export interface IProductosCarritoId {
    producto: string;
    cantidad: number;
    total: number;
}

export interface ICarritoProductos {
    _id?: string;
    total?: number;
    sub_total?: number;
    mensaje?: string;
    descuento?: {
        valor: number;
        mensaje: string;
    };
    productos?: Array<IProductosCarrito>
}

export interface IProductosCarrito {
    producto: IProducto;
    cantidad: number;
    total: number;
}