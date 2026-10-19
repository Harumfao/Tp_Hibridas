import express from 'express';
import {rutasDeCampos} from './rutas/campos_rutas.js';

export function crearApp() {
const app = express();

app.use(express.json());

app.use('/api/campos', rutasDeCampos);

app.get('/api/salud', (req, res) => {
    res.json( `estado: ok, hora: ${new Date().toISOString()}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');});
return app;
}