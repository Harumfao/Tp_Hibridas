import * as campo from '../servicios/campos.servicio.js';

export async function listar (req, res, next){ 
    try {
        const resultado = await campo.listar(req.query);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }
}

export async function obtenerCampo(req, res, next){
    try {
        const resultado = await campo.obtenerCampo(req.idCampo);
        res.json(resultado);
    } catch (error) {
        next(error);
    }
}   

export async function crearCampo(req, res, next) {
    try {
        const nuevo = await campo.crearCampo(req.body ?? {});
        res.status(201).location(`/api/campos/${nuevo._id}`).json(nuevo);
    } catch (error) {
        next(error);
    }
}

export async function eliminarCampo (req, res, next){
    try {
        const resultado = await campo.eliminarCampo(req.idCampo);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
}

export async function modificarCampo(req,res, next){
    try {
        const resultado = await campo.modificarCampo(req.idCampo, req.body ?? {});
        res.json(resultado);
    } catch (error) {
        next(error);
    }
}

export async function organizarCampo (req, res, next){
    try {
        const resultado = await campo.organizarCampo(req.idCampo);
        res.json(resultado);
    } catch (error) {
        next(error);
    }
}