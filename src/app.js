import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { rutaNoEncontrada } from './middlewares/404.middleware.js';
import { manejadorErrores } from './middlewares/error.middleware.js';
import { registroMiddleware } from './middlewares/registro.middleware.js';
import { rutasDeCampos } from './rutas/campos_rutas.js';
import { rutasAuth } from './rutas/auth.rutas.js';

export function crearApp() {
    const app = express();

    app.use(express.json());
    app.use(registroMiddleware);

    if (config.conCors) {
        app.use(cors({ origin: config.origenesPermitidos }));
    }

    app.use('/api/campos', rutasDeCampos);
    app.use('/api/auth', rutasAuth);
    app.get('/api/salud', (req, res) => {
        res.json(`estado: ok, hora: ${new Date().toISOString()}`);
    });

    app.use(rutaNoEncontrada);
    app.use(manejadorErrores);
    return app;
}