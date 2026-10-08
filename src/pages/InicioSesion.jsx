import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function InicioSesion() {
    const [credenciales, setCredenciales] = useState({ correo: '', password: '' });
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        // Pasamos los datos al contexto para que gestione la petición al backend
        const resultado = await login(credenciales.correo, credenciales.password);

        if (resultado.success) {
            // Si el token es válido y se inicia sesión, llevamos al usuario a la página principal
            navigate('/');
        } else {
            // Si falla, mostramos el mensaje de error (ej. "Credenciales inválidas")
            setError(resultado.message);
            setCargando(false);
        }
    };

    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="card-body p-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">
                            HOBI<span style={{ color: '#e0006c' }}>C</span>
                        </h2>
                        <p className="text-muted">Inicia sesión en tu cuenta</p>
                    </div>

                    {/* Alerta de Error de Seguridad */}
                    {error && (
                        <div className="alert alert-danger py-2" role="alert">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Correo Electrónico</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="correo"
                                placeholder="tu@correo.com"
                                value={credenciales.correo} 
                                onChange={handleChange} 
                                required 
                                disabled={cargando}
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="form-label fw-bold">Contraseña</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password"
                                placeholder="••••••••"
                                value={credenciales.password} 
                                onChange={handleChange} 
                                required 
                                disabled={cargando}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-dark w-100 fw-bold mb-3" 
                            disabled={cargando}
                        >
                            {cargando ? (
                                <span><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Validando...</span>
                            ) : (
                                "Ingresar"
                            )}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            ¿No tienes cuenta? <Link to="/registro" className="text-decoration-none" style={{ color: '#e0006c' }}>Regístrate aquí</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}