import mongoose from 'mongoose';
import ProductoModel from '../productos/producto.model';
const Schema = mongoose.Schema;

const CarritoSchema = new Schema({
    total: { type: Number, default: 0 },
    sub_total: { type: Number, default: 0 },
    mensaje: { type: String, default: '' },
    descuento: {
        valor: { type: Number, default: 0 },
        mensaje: { type: String, default: '' }
    },
    productos: [{ 
        producto: { type: Schema.Types.ObjectId, ref: ProductoModel },
        cantidad: { type: Number, default: 1 },
        total: { type: Number, default: 0 }
    }]
})

export default mongoose.model('carrito', CarritoSchema );