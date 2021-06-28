import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductoSchema = new Schema({
    id: { type: Number },
    brand: { type: String },
    description: { type: String },
    image: { type: String },
    price: { type: Number },
})

export default mongoose.model('producto', ProductoSchema );