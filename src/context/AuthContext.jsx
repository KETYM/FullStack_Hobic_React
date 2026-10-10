import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components -- por convención, el contexto exporta su hook junto al Provider
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Lazy initializer: sessionStorage es síncrono, leemos la sesión activa
    // directamente en el primer render. Si hay datos guardados, restauramos
    // el usuario; si no, queda en null (visitante sin sesión).
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
            // Simulación de llamada a API
            if(correo === "admin@hobic.cl" && password === "adm123") {
                const data = { nombre: "Admin", correo, rol: "admin" };
                setUsuario(data);
                sessionStorage.setItem("token_seguro", "jwt_simulado_123");
                sessionStorage.setItem("datos_usuario", JSON.stringify(data));
                return { success: true };
            }
            return { success: false, message: "Credenciales inválidas" };
        } catch {
            return { success: false, message: "Error de conexión" };
        }
    };

    const logout = () => {
        setUsuario(null);
        sessionStorage.removeItem("token_seguro");
        sessionStorage.removeItem("datos_usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, loading: false }}>
            {children}
        </AuthContext.Provider>
    );
};
