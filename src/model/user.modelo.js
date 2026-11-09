import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    nombre: { type: String, required: true, unique: true, lowercase: true, trim: true, minlength: 4, maxlength: 50 },
    biografia: { type: String, required: true, lowercase: true, trim: true, maxlength: 155 },
    creacion: { type: String, default: () => new Date().toISOString().split('T')[0] },
}, {
    versionKey: false
});

export const User = model('User', userSchema);