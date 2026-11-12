import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    nombre: { type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true, 
        minlength: 4,
        maxlength: 50 },

    email: { type: String,
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un correo electrónico válido'] },

    password: { type: String,
        required: true, 
        trim: true,
     },
    
    salt: { type: String,
        required: true },

    rol: { type: String,
        required: true,
        enum: ['admin', 'usuario'],
        default: 'usuario' },

    // biografia: { type: String, 
    //     required: true, 
    //     lowercase: true, 
    //     trim: true, 
    //     maxlength: 155 },

    creacion: { type: String,
         default: () => new Date().toISOString().split('T')[0] },
}, {
    versionKey: false
});

export const User = model('User', userSchema);