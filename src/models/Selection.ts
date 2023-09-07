import { Schema, model, models } from "mongoose";

const SelectionSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    size: String,
    ingredients: [String]
}, { versionKey: false });

const Selection = models.Selection || model('Selection', SelectionSchema);
export default Selection;