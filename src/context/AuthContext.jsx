import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Por ahora, leemos temporalmente un token simulado para la migración.
        const token = sessionStorage.getItem("token_seguro");
        if (token) {
            // Simulamos la decodificación de un JWT seguro
            setUsuario(JSON.parse(sessionStorage.getItem("datos_usuario")));
        }
        setLoading(false);
    }, []);

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
        } catch (error) {
            return { success: false, message: "Error de conexión" };
        }
    };

    const logout = () => {
        setUsuario(null);
        sessionStorage.removeItem("token_seguro");
        sessionStorage.removeItem("datos_usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};