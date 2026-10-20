import mongoose from "mongoose";
import { config } from "./config.js";
import {Campo} from './model/campo.modelo.js'

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
        disponibilidad: true
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
        disponibilidad: false
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
        disponibilidad: true
    }
];

async function conectarSeed() {
    await mongoose.connect(config.dbUrl);
    console.log('Conectada seed a db');

    await Campo.deleteMany({});
    console.log('Datos antiguos borrados');

    await Campo.insertMany(camposIniciales);
    console.log('Cargada la seed');

    await mongoose.connection.close();
}

conectarSeed();