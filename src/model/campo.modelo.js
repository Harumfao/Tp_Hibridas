import { Schema, model } from 'mongoose';

const campoSchema = new Schema({
    nombre: { type: String, required: true, lowercase: true, trim: true, minlength: 5, maxlength: 50 },
    tamano: { type: String, required: true, lowercase: true, trim: true },
    ubicacion: { type: String, required: true, lowercase: true, trim: true },
    contacto: { type: Number, default: null },
    descripcion: { type: String, required: true, lowercase: true, trim: true, maxlength: 155 },
    creacion: { type: String, default: () => new Date().toISOString().split('T')[0] },
    horario: { type: String, required: true, lowercase: true, trim: true },
    verificado: { type: Boolean, default: false },
    disponibilidad: { type: Boolean, default: true }
}, {
    versionKey: false
});

export const Campo = model('Campo', campoSchema);