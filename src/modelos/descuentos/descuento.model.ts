import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DescuentoSchema = new Schema({
    brand: { type: String },
    threshold: { type: Number },
    discount: { type: Number },
    valorComprado: { type: Number, default: 0 },
    aplicaDescuento: { type: Boolean, default: false }
})

export default mongoose.model('descuento', DescuentoSchema )