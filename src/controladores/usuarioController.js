import * as usuario from '../modelos/usuarioModelo.js';

export async function listar (req, res, next){ 
    try {
        const resultado = await usuario.listar(req.query);
        res.json(resultado);
    }
    catch (error) {
        next(error);
    }

    export async function obtenerUsuario(req, res, next){
    try {
        const resultado = await usuario.obtenerUsuario(req.idUsuario);
        res.json(resultado);
    } catch (error) {
        next(error);
    }
}

