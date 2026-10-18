import { camposIniciales } from '../../datos.js';

export function obtenerCampos(req,res) {
    const campos = camposIniciales;
    return res.json(campos);
}
