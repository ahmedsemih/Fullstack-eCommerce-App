import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { versionKey: false });

const Category = models.Category || model('Category', CategorySchema);
export default Category;