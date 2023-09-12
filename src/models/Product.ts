import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 25,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    numberOfSales: {
        type: Number,
        default: 0
    },
    discountRate: {
        type: Number,
        default: 0
    },
    ingredients: [String],
    description: String,
}, { versionKey: false });

const Product = models.Product || model('Product', ProductSchema);
export default Product;