import { Schema, model, models } from "mongoose";

const CampaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    discountRate: {
        type: Number,
        required: true
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'Product',
        maxItems: 3,
        minItems: 3,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    endDate: Date
}, { versionKey: false });

const Campaign = models.Campaign || model('Campaign', CampaignSchema);
export default Campaign;