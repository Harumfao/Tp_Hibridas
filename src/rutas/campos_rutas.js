import { Router } from 'express';
import * as controlador from '../controladores/camposController.js';

export const rutasDeCampos = Router();

rutasDeCampos.param('id', (req, res, next, id) => {
    req.idCampo = Number(id);
    next();
});

rutasDeCampos.get('/',controlador.listar);
rutasDeCampos.get('/:id', controlador.obtener);
