import mongoose, { mongo } from 'mongoose';
import { crearApp } from './app.js';
import { config } from './config.js';

const app = crearApp();

async function iniciarDB() {
  try {
    await mongoose.connect(config.dbUrl)
    console.log('Conectado correctamente a MongoDB');
 

app.listen(config.puerto, () => {
  console.log(`Escuchando localhost:${config.puerto} (${config.entorno})`);
});
} catch (error) {
    console.error('Error al conectar a MongoDB', error);
    process.exit(1);
  }
  }

iniciarDB()