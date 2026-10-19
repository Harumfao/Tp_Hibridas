import { Router } from 'express';
import * as controlador from '../controladores/camposController.js';

export const rutasDeCampos = Router();

rutasDeCampos.param('id', (req, res, next, id) => {
    req.idCampo = Number(id);
    next();
});

rutasDeCampos.get('/',controlador.listar);
rutasDeCampos.get('/:id', controlador.obtenerCampo);
rutasDeCampos.post('/', controlador.crearCampo);
rutasDeCampos.delete('/:id',controlador.eliminarCampo);
rutasDeCampos.patch('/:id',controlador.modificarCampo);
rutasDeCampos.post('/:id/organizar',controlador.organizarCampo);