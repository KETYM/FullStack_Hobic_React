import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- por convención, el contexto exporta su hook junto al Provider
export const useAuth = () => useContext(AuthContext);

const USUARIOS_SEED = [
    {
        id: 'u-admin',
        nombre: 'Administrador Hobic',
        correo: 'admin@hobic.cl',
        password: 'adm123',
        rol: 'admin',
        run: '11.111.111-1',
        direccion: 'Av. Siempre Viva 123',
        region: 'Metropolitana de Santiago',
        comuna: 'Santiago',
        fecha: '2026-01-01'
    },
    {
        id: 'u-vendedor',
        nombre: 'Vendedor Hobic',
        correo: 'vendedor@hobic.cl',
        password: 'ven123',
        rol: 'vendedor',
        run: '22.222.222-2',
        direccion: 'Paseo Ahumada 456',
        region: 'Metropolitana de Santiago',
        comuna: 'Santiago',
        fecha: '2026-01-01'
    }
];

function obtenerUsuariosGuardados() {
    try {
        let usuarios = JSON.parse(localStorage.getItem("usuariosHobic"));
        if (!usuarios || !Array.isArray(usuarios) || usuarios.length === 0) {
            usuarios = USUARIOS_SEED;
            localStorage.setItem("usuariosHobic", JSON.stringify(usuarios));
        } else {
            // Asegurar que admin y vendedor siempre existan
            if (!usuarios.some(u => u.correo === 'admin@hobic.cl')) {
                usuarios.push(USUARIOS_SEED[0]);
                localStorage.setItem("usuariosHobic", JSON.stringify(usuarios));
            }
            if (!usuarios.some(u => u.correo === 'vendedor@hobic.cl')) {
                usuarios.push(USUARIOS_SEED[1]);
                localStorage.setItem("usuariosHobic", JSON.stringify(usuarios));
            }
        }
        return usuarios;
    } catch {
        return USUARIOS_SEED;
    }
}

export const AuthProvider = ({ children }) => {
    // Lazy initializer: lee datos_usuario directamente en el primer render
    const [usuario, setUsuario] = useState(() => {
        try {
            const datos = sessionStorage.getItem("datos_usuario");
            return datos ? JSON.parse(datos) : null;
        } catch {
            return null;
        }
    });

    const login = async (correo, password) => {
        try {
            const usuarios = obtenerUsuariosGuardados();
            const usuarioValido = usuarios.find((u) => {
                const correoCoincide = u.correo.toLowerCase() === correo.trim().toLowerCase();
                const passCoincide = u.password === password || u.password === btoa(password);
                return correoCoincide && passCoincide;
            });

            if (usuarioValido) {
                const datosSesion = {
                    id: usuarioValido.id || crypto.randomUUID(),
                    nombre: usuarioValido.nombre,
                    correo: usuarioValido.correo,
                    rol: usuarioValido.rol,
                    run: usuarioValido.run || '',
                    direccion: usuarioValido.direccion || '',
                    region: usuarioValido.region || '',
                    comuna: usuarioValido.comuna || ''
                };
                setUsuario(datosSesion);
                sessionStorage.setItem("token_seguro", "jwt_simulado_" + Date.now());
                sessionStorage.setItem("datos_usuario", JSON.stringify(datosSesion));
                sessionStorage.setItem("usuarioActual", JSON.stringify(datosSesion));
                return { success: true, usuario: datosSesion };
            }

            return { success: false, message: "Correo o contraseña incorrectos." };
        } catch {
            return { success: false, message: "Error al intentar iniciar sesión." };
        }
    };

    const register = async (datosRegistro) => {
        try {
            const usuarios = obtenerUsuariosGuardados();
            const existe = usuarios.some(
                (u) => u.correo.toLowerCase() === datosRegistro.correo.trim().toLowerCase()
            );

            if (existe) {
                return { success: false, message: "Este correo electrónico ya está registrado." };
            }

            const nuevoUsuario = {
                id: crypto.randomUUID(),
                nombre: datosRegistro.nombre.trim(),
                run: datosRegistro.run.trim(),
                direccion: datosRegistro.direccion.trim(),
                region: datosRegistro.region,
                comuna: datosRegistro.comuna,
                correo: datosRegistro.correo.trim().toLowerCase(),
                password: datosRegistro.password,
                rol: 'cliente',
                fecha: new Date().toISOString().split('T')[0]
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuariosHobic", JSON.stringify(usuarios));
            return { success: true, usuario: nuevoUsuario };
        } catch {
            return { success: false, message: "Error al registrar la cuenta." };
        }
    };

    const recuperarPassword = async (correo, run, nuevaPassword) => {
        try {
            const usuarios = obtenerUsuariosGuardados();
            const index = usuarios.findIndex(
                (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && 
                       (u.run || '').trim().toUpperCase() === run.trim().toUpperCase()
            );

            if (index === -1) {
                return { success: false, message: "No se encontró un usuario con ese correo y RUN." };
            }

            usuarios[index].password = nuevaPassword;
            localStorage.setItem("usuariosHobic", JSON.stringify(usuarios));
            return { success: true };
        } catch {
            return { success: false, message: "Error al actualizar la contraseña." };
        }
    };

    const logout = () => {
        setUsuario(null);
        sessionStorage.removeItem("token_seguro");
        sessionStorage.removeItem("datos_usuario");
        sessionStorage.removeItem("usuarioActual");
    };

    return (
        <AuthContext.Provider value={{ 
            usuario, 
            login, 
            logout, 
            register, 
            recuperarPassword, 
            loading: false 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
