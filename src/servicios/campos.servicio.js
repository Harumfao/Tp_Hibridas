import { camposIniciales, siguienteId } from '../../datos.js';

export function listar({ubicacion}={}) {
    let resultado = camposIniciales;
    if (ubicacion) {
        resultado = resultado.filter((c) => c.ubicacion === ubicacion);
    }
    return resultado;
}

export function obtener(id){
    const campos = camposIniciales.find((c) => c.id === id);
    return campos
}