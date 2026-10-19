import { camposIniciales, siguienteId } from '../../datos.js';

const camposModificable = ['nombre','ubicacion','contacto','descripcion','horario']

export function listar({ubicacion}={}) {
    let resultado = camposIniciales;
    if (ubicacion) {
        resultado = resultado.filter((c) => c.ubicacion === ubicacion);
    }
    return resultado;
}

export function obtenerCampo(id){
    const campos = camposIniciales.find((c) => c.id === id);
    return campos
}

export function crearCampo(datos){
    const nuevo = {
        id: siguienteId(),
        nombre: datos.nombre.toLowerCase(),
        ubicacion: datos.ubicacion.toLowerCase(),
        contacto: typeof datos.contacto === 'number' ? datos.contacto : null,
        descripcion: datos.descripcion.toLowerCase(),
        creacion: new Date().toISOString().split('T')[0],
        horario: datos.horario.toLowerCase(),
        verificado: false,
        disponibilidad: true
    };

    camposIniciales.push(nuevo);
    return nuevo;
}

export function eliminarCampo(id) {
    const campo = obtenerCampo(id);
    camposIniciales.splice(camposIniciales.indexOf(campo),1);
}

export function modificarCampo(id, modificacion){
    const camposIniciales = obtenerCampo (id);
    const modificaciones = Object.entries(modificacion).filter(([clave]) => camposModificable.includes(clave))
    const campoModificado = {...camposIniciales, ...Object.fromEntries(modificaciones)};
    Object.assign(camposIniciales,campoModificado);
    return camposIniciales;
}