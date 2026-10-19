export const camposIniciales = [
    {
        id: 1,
        nombre: 'Saigon',
        ubicacion: 'Quilmes',
        contacto: '1146731893',
        descripcion: 'Campo boscoso y táctico',
        creacion: 2026,
        horario: '10 a 22',
        verificado: true,
        disponibilidad: true
    },
    {
        id: 2,
        nombre: 'Delta Airsoft',
        ubicacion: 'Berazategui',
        contacto: '1122334455',
        descripcion: 'Predio urbano con edificaciones',
        creacion: 2024,
        horario: '09 a 18',
        verificado: true,
        disponibilidad: false
    },
    {
        id: 3,
        nombre: 'The Jungle',
        ubicacion: 'La Plata',
        contacto: '1199887766',
        descripcion: 'Zona rural abierta',
        creacion: 2025,
        horario: '08 a 20',
        verificado: false,
        disponibilidad: true
    }
]

export let nextId = 4;

export function siguienteId() {
  return nextId++;
}
