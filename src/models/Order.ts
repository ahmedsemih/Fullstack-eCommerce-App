import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    selections: {
        type: [Schema.Types.ObjectId],
        ref: 'Selection',
        required: true
    },
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    progress: {
        type: Number,
        default: 0
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    intentId: String,
    price: Number,
    deliveryDate: Date
}, { versionKey: false });

const Order = models.Order || model('Order', OrderSchema);
export default Order;