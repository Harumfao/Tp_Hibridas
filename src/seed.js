import mongoose from "mongoose";
import { config } from "./config.js";
import {Campo} from './model/campo.modelo.js'
import { User } from './model/user.modelo.js';

async function conectarSeed() {
    await mongoose.connect(config.dbUrl);
    console.log('Conectada seed a db');
    
    await Campo.deleteMany({});
    console.log('Datos antiguos borrados');
    
    const usuarios = await User.find();
    
    if (usuarios.length === 0) {
        console.log('No hay usuarios en la base de datos.');
        return;
    }
    
    const camposIniciales=[{
    id: 1,
            nombre: 'saigon',
            tamano: 'grande',
            ubicacion: 'quilmes',
            contacto: '1146731893',
            descripcion: 'campo boscoso y táctico',
            creacion: 2026,
            horario: '10 a 22',
            verificado: true,
            disponibilidad: true,
            admin: usuarios[0]._id
        },
        {
            id: 2,
            nombre: 'delta Airsoft',
            tamano: 'mediano',
            ubicacion: 'berazategui',
            contacto: '1122334455',
            descripcion: 'predio urbano con edificaciones',
            creacion: 2024,
            horario: '09 a 18',
            verificado: true,
            disponibilidad: false,
            admin: usuarios[2]._id
        },
        {
            id: 3,
            nombre: 'the Jungle',
            tamano: 'grande',
            ubicacion: 'capital',
            contacto: '1199887766',
            descripcion: 'zona rural abierta',
            creacion: 2025,
            horario: '08 a 20',
            verificado: false,
            disponibilidad: true,
            admin: usuarios[0]._id
        }
    ];
    
    await Campo.insertMany(camposIniciales);
    console.log('Cargada la seed de campos');

    await mongoose.connection.close();
}

conectarSeed();