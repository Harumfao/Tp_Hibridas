import express from 'express';
import {rutasDeCampos} from './rutas/campos_rutas.js';
import {registroMiddleware} from './middlewares/registro.middleware.js';
import {rutaNoEncontrada} from './middlewares/404.middleware.js';
import {manejadorErrores} from './middlewares/error.middleware.js';

export function crearApp() {
const app = express();

app.use(express.json());
app.use(registroMiddleware);


//Rutas
app.use('/api/campos', rutasDeCampos);

app.get('/api/salud', (req, res) => {
    res.json( `estado: ok, hora: ${new Date().toISOString()}`);
});
app.use(rutaNoEncontrada);
app.use(manejadorErrores);
return app;
}