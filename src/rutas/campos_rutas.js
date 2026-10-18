import { Router } from 'express';
import { obtenerCampos } from '../controladores/camposController.js';

export const rutasDeCampos = Router();


rutasDeCampos.get('/', obtenerCampos);
