import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        default: 'email'
    },
    password: {
        type: String,
        maxLength: 20
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    phone: String,
    address: String
}, { versionKey: false });

const User = models.User || model('User', UserSchema);
export default User;