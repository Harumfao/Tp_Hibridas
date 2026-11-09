import mongoose from "mongoose";
import { config } from "./config.js";
import {User} from './model/user.modelo.js'

const UsuariosIniciales=[{
        nombre: 'Nokk',
        biografia: 'Un jugador veterano',
        creacion: 2026,
    },
    {
        nombre: 'Mili',
        biografia: 'Una jugadora principiante',
        creacion: 2024,
    },
    {
        nombre: 'Jonathan',
        biografia: 'Creo que un jugador',
        creacion: 2025,
    }
];

async function conectarSeed() {
    await mongoose.connect(config.dbUrl);
    console.log('Conectada seed a db');

    await User.deleteMany({});
    console.log('Datos antiguos borrados');

    await User.insertMany(UsuariosIniciales);
    console.log('Cargada la seed de usuarios');

    await mongoose.connection.close();
}

conectarSeed();