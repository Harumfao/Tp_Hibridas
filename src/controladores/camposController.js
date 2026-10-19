import * as campo from '../servicios/campos.servicio.js';

export function listar (req, res) {
    res.json(campo.listar(req.query));
}

export function obtenerCampo(req, res){
    res.json(campo.obtenerCampo(req.idCampo));
}

export function crearCampo(req, res) {
    const nuevo = campo.crearCampo(req.body ?? {});
    res.status(201).location(`/api/campos/${nuevo.id}`).json(nuevo);
}

export function eliminarCampo (req, res){
    campo.eliminarCampo(req.idCampo);
    res.status(204).end();
}

export function modificarCampo(req,res){
    res.json(campo.modificarCampo(req.idCampo, req.body ?? {}));
}