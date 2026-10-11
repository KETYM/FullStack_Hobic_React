import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Recuperar() {
    const [email, setEmail] = useState('');
    const [run, setRun] = useState('');
    const [nuevaPassword, setNuevaPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
    const [errorPass, setErrorPass] = useState('');
    const [cargando, setCargando] = useState(false);

    const { recuperarPassword } = useAuth();
    const navigate = useNavigate();

    // Formateo automático del RUN
    const formatearRun = (valor) => {
        let limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
        if (limpio.length <= 1) return limpio;
        let cuerpo = limpio.slice(0, -1);
        let dv = limpio.slice(-1);
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${cuerpo}-${dv}`;
    };

    const handleRunChange = (e) => {
        setRun(formatearRun(e.target.value));
    };

    const handlePasswordChange = (e) => {
        const val = e.target.value;
        setNuevaPassword(val);
        if (val.length > 0 && val.length < 6) {
            setErrorPass(`Faltan ${6 - val.length} caracteres (mínimo 6).`);
        } else {
            setErrorPass('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlerta({ tipo: '', mensaje: '' });

        if (!email.trim() || !run.trim() || !nuevaPassword || !confirmPassword) {
            setAlerta({ tipo: 'danger', mensaje: 'Por favor, completa todos los campos.' });
            return;
        }

        if (nuevaPassword.length < 6) {
            setAlerta({ tipo: 'danger', mensaje: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }

        if (nuevaPassword !== confirmPassword) {
            setAlerta({ tipo: 'danger', mensaje: 'Las contraseñas no coinciden.' });
            return;
        }

        setCargando(true);
        const resultado = await recuperarPassword(email, run, nuevaPassword);
        setCargando(false);

        if (resultado.success) {
            setAlerta({ tipo: 'success', mensaje: '¡Contraseña restablecida con éxito! Redirigiendo...' });
            setTimeout(() => {
                navigate('/inicioSesion');
            }, 2000);
        } else {
            setAlerta({ tipo: 'danger', mensaje: resultado.message });
        }
    };

    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: '460px', width: '100%' }}>
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">
                            HOBI<span style={{ color: '#e0006c' }}>C</span>
                        </h2>
                        <h4 className="fw-semibold text-secondary">Recuperar Contraseña</h4>
                        <p className="text-muted small">Ingresa tu correo y RUN registrado para restablecer tu clave</p>
                    </div>

                    {alerta.mensaje && (
                        <div className={`alert alert-${alerta.tipo} py-2`} role="alert">
                            {alerta.mensaje}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">RUN Registrado</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ej: 12.345.678-9"
                                maxLength={12}
                                value={run}
                                onChange={handleRunChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Nueva Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Mínimo 6 caracteres"
                                value={nuevaPassword}
                                onChange={handlePasswordChange}
                                required
                            />
                            {errorPass && <small className="text-danger fw-semibold d-block mt-1">{errorPass}</small>}
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small">Repetir Nueva Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repite tu nueva contraseña"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100 fw-bold py-2 mb-3"
                            disabled={cargando}
                        >
                            {cargando ? 'Actualizando...' : 'Restablecer Contraseña'}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <Link to="/inicioSesion" className="text-decoration-none fw-semibold small" style={{ color: '#e0006c' }}>
                            ← Volver a Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
