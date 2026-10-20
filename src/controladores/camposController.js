import * as campo from '../servicios/campos.servicio.js';

export async function listar (req, res) {
    const resultado = await campo.listar(req.query);
    res.json(resultado);
}

export async function obtenerCampo(req, res){
    const resultado = await campo.obtenerCampo(req.idCampo)
    res.json(resultado);
}

export async function crearCampo(req, res) {
    const nuevo = await campo.crearCampo(req.body ?? {});
    res.status(201).location(`/api/campos/${nuevo._id}`).json(nuevo);
}

export async function eliminarCampo (req, res){
    const resultado = await campo.eliminarCampo(req.idCampo);
    res.status(204).end();
}

export async function modificarCampo(req,res){
    const resultado = await campo.modificarCampo(req.idCampo, req.body ?? {});
}

export async function organizarCampo (req, res){
    const resultado = await campo.organizarCampo(req.idCampo);
    res.json(resultado);
}