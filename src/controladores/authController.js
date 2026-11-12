import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../model/user.modelo.js';

// Función auxiliar para hashear con scrypt
const hashearPassword = (password, salt) => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
};

export async function registro(req, res, next) {
    try {
        const { nombre, email, password } = req.body;

        // 1. Validar que los campos obligatorios estén presentes
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'El nombre, el email y la contraseña son obligatorios.' });
        }

        // 2. Verificar si ya existe un usuario con ese email (evita duplicados)
        const usuarioExistente = await User.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'Ya existe una cuenta registrada con este correo electrónico.' });
        }

        // 3. Generar una sal aleatoria y hashear la contraseña con scrypt
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await hashearPassword(password, salt);

        // 4. Crear el nuevo usuario en la base de datos
        const nuevoUsuario = new User({
            nombre,
            email,
            password: hashedPassword, // Se guarda el hash, NUNCA la contraseña en texto plano
            salt,                     // Se guarda la sal generada
            rol: 'usuario'
        });

        await nuevoUsuario.save();

        // 5. Responder con éxito (CÓDIGO 201 - Creado) omitiendo password y salt
        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });

    } catch (error) {
        next(error); // Lo atrapa tu manejador centralizado de errores
    }
}

export async function promoverAdmin(req, res, next) {
    try {
        const usuario = await User.findByIdAndUpdate(
            req.params.id,
            { rol: 'admin' },
            { new: true, runValidators: true }
        ).select('nombre email rol');

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }

        return res.status(200).json({
            mensaje: 'Usuario promovido a administrador.',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });
    } catch (error) {
        next(error);
    }
}

// Función auxiliar para replicar el hash de scrypt y comparar contraseñas
const hashearPasswordConSal = (password, salt) => {
    return new Promise((resolve, reject) => {
        // Usamos los mismos parámetros con los que guardaste el registro (ej: 64 bytes)
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
};

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        // 1. Validar que el cliente envíe email y password
        if (!email || !password) {
            return res.status(400).json({ error: 'El email y la contraseña son obligatorios.' });
        }

        // 2. Buscar el usuario por email en la base de datos
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // 3. Hashear la contraseña ingresada utilizando la sal guardada de ese usuario
        const hashIngresado = await hashearPasswordConSal(password, user.salt);

        // 4. Comparar el hash generado con el hash almacenado en la BD
        if (hashIngresado !== user.password) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        // 5. Si coincide, generar el JSON Web Token (JWT)
        // El secreto debe venir obligatoriamente de tu archivo .env
        const secretoJwt = process.env.JWT_SECRET;
        if (!secretoJwt) {
            throw new Error('Falta configurar JWT_SECRET en las variables de entorno.');
        }

        const token = jwt.sign(
            { id: user._id, rol: user.rol }, // Información útil dentro del token (payload)
            secretoJwt,
            { expiresIn: '4h' } // Tiempo de expiración del token
        );

        // 6. Responder con éxito y el token (NUNCA incluyas user.password ni user.salt)
        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });

    } catch (error) {
        next(error);
    }
    
    
}
