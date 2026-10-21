export function manejadorErrores(err, req, res, next) {
    console.error('Error en el centralizador:', err);
    
    if (err.name === 'ValidationError') {
        res.status(422).json({ error: 'Error de validación', detalles: err.message });
    }

    if (err.name === 'CastError') {
        res.status(400).json({ error: 'Error de conversión de tipo', detalles: err.message });
    }

    if (err.code === 11000) {
        res.status(409).json({ error: 'Error de duplicación', detalles: err.message });
    }

    if (err.message && err.message.includes('not found')) {
        res.status(404).json({ error: 'Recurso no encontrado', detalles: err.message });
    }

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ error: 'Error interno del servidor', detalles: err.message });
}