import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        default: 'email'
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    password: String,
    phone: String,
    address: String
}, { versionKey: false });

const User = models?.User || model('User', UserSchema);
export default User;