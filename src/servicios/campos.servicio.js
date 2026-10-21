import {Campo} from '../model/campo.modelo.js'

const camposModificable = ['nombre','tamano','ubicacion','contacto','descripcion','horario']

export async function listar({ubicacion,tamano,disponibilidad}={}) {
    const query = {};
    if (ubicacion) {
        query.ubicacion = ubicacion.toLowerCase();
    }

    if (tamano){
        if (tamano == "mediano" ){
            query.tamano = tamano === 'mediano';
        }
        if (tamano == "grande"){
            query.tamano = tamano === 'grande';
        }
    }

    if (disponibilidad !== undefined) {
        query.disponibilidad = disponibilidad === true
    }
    return await Campo.find(query);
}

export async function obtenerCampo(id){
    return await Campo.findById(id);
}

export async function crearCampo(datos){
    const nuevo = new Campo({
        nombre: datos.nombre?.toLowerCase(),
        tamano: datos.tamano?.toLowerCase(),
        ubicacion: datos.ubicacion?.toLowerCase(),
        contacto: typeof datos.contacto === 'number' ? datos.contacto : null,
        descripcion: datos.descripcion?.toLowerCase(),
        creacion: new Date().toISOString().split('T')[0],
        horario: datos.horario?.toLowerCase(),
        verificado: false,
        disponibilidad: true
    });

    return await nuevo.save();
}

export async function eliminarCampo(id) {
    return await Campo.findByIdAndDelete(id);
}

export async function modificarCampo(id, modificacion){
    const modificaciones = Object.entries(modificacion).filter(([clave]) => camposModificable.includes(clave))
    const campoModificado = Object.fromEntries(modificaciones);
    return await Campo.findByIdAndUpdate(id,campoModificado,{new:true,runValidators:true});
}

export async function organizarCampo (id){
    const campo = await Campo.findById(id);
    if (campo.disponibilidad === true) {
        campo.disponibilidad = false;
        await campo.save();
        return {mensaje:`Alquilaste el campo ${campo.nombre}`}
    } 
}