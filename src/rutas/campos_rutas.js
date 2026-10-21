import { Router } from 'express';
import * as controlador from '../controladores/camposController.js';
import {verificarAutorizacion} from '../middlewares/autorizar.middleware.js';

export const rutasDeCampos = Router();

rutasDeCampos.param('id', (req, res, next, id) => {
    req.idCampo = id;
    next();
});

rutasDeCampos.get('/',controlador.listar);
rutasDeCampos.get('/:id', controlador.obtenerCampo);

rutasDeCampos.post('/', verificarAutorizacion, controlador.crearCampo);
rutasDeCampos.delete('/:id', verificarAutorizacion, controlador.eliminarCampo);
rutasDeCampos.patch('/:id', verificarAutorizacion, controlador.modificarCampo);
rutasDeCampos.post('/:id/organizar', verificarAutorizacion, controlador.organizarCampo);