import { Router } from 'express';
import * as controlador from '../controladores/camposController.js';
import {verificarAutorizacion} from '../middlewares/autorizar.middleware.js';
import { verificarToken, verificarAdmin } from '../middlewares/verificarToken.middleware.js';

export const rutasDeCampos = Router();

rutasDeCampos.param('id', (req, res, next, id) => {
    req.idCampo = id;
    next();
});

rutasDeCampos.get('/',controlador.listar);
rutasDeCampos.get('/:id', controlador.obtenerCampo);

rutasDeCampos.post('/', verificarToken, controlador.crearCampo);
rutasDeCampos.delete('/:id',  verificarToken, verificarAdmin, controlador.eliminarCampo);
rutasDeCampos.patch('/:id',  verificarToken, verificarAdmin, controlador.modificarCampo);
rutasDeCampos.post('/:id/organizar', verificarToken, verificarAdmin, controlador.organizarCampo);