import { Router } from 'express';
import { login, promoverAdmin, registro } from '../controladores/authController.js';
import { verificarAdmin, verificarToken } from '../middlewares/verificarToken.middleware.js';


export const rutasAuth = Router();



// Ruta pública para iniciar sesión
rutasAuth.post('/login', login);


// Ruta pública para registrarse
rutasAuth.post('/registro', registro);

// Solo un administrador autenticado puede promover usuarios registrados.
rutasAuth.patch('/usuarios/:id/admin', verificarToken, verificarAdmin, promoverAdmin);