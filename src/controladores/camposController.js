import * as campo from '../servicios/campos.servicio.js';

export function listar (req, res) {
    res.json(campo.listar(req.query));
}

export function obtener(req, res){
    res.json(campo.obtener(req.idCampo));
}