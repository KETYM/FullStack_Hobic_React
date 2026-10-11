import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { DATOS_CHILE } from '../data/chile';

export default function Registro() {
    const [formData, setFormData] = useState({
        nombre: '',
        run: '',
        direccion: '',
        region: '',
        comuna: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errores, setErrores] = useState({});
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
    const [cargando, setCargando] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    // Formateo automático de RUN chileno (12.345.678-9)
    const formatearRun = (valor) => {
        let limpio = valor.replace(/[^0-9kK]/g, '').toUpperCase().slice(0, 9);
        if (limpio.length <= 1) return limpio;
        let cuerpo = limpio.slice(0, -1);
        let dv = limpio.slice(-1);
        cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${cuerpo}-${dv}`;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'run') {
            setFormData(prev => ({ ...prev, run: formatearRun(value) }));
        } else if (name === 'region') {
            setFormData(prev => ({ ...prev, region: value, comuna: '' }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const comunasDisponibles = formData.region ? (DATOS_CHILE[formData.region] || []) : [];

    const validar = () => {
        const errs = {};

        if (!formData.nombre.trim()) {
            errs.nombre = 'El nombre completo es requerido.';
        }

        const runRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/;
        if (!runRegex.test(formData.run)) {
            errs.run = 'Formato de RUN inválido (Ej: 12.345.678-9).';
        }

        if (!formData.direccion.trim()) {
            errs.direccion = 'La dirección es requerida.';
        }

        if (!formData.region) {
            errs.region = 'Debes seleccionar una región.';
        }

        if (!formData.comuna) {
            errs.comuna = 'Debes seleccionar una comuna.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            errs.email = 'Ingresa un correo electrónico válido.';
        }

        if (formData.password.length < 6) {
            errs.password = 'La contraseña debe tener al menos 6 caracteres.';
        }

        if (formData.password !== formData.confirmPassword) {
            errs.confirmPassword = 'Las contraseñas no coinciden.';
        }

        setErrores(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlerta({ tipo: '', mensaje: '' });

        if (!validar()) return;

        setCargando(true);
        const resultado = await register({
            nombre: formData.nombre,
            run: formData.run,
            direccion: formData.direccion,
            region: formData.region,
            comuna: formData.comuna,
            correo: formData.email,
            password: formData.password
        });

        setCargando(false);

        if (resultado.success) {
            setAlerta({ tipo: 'success', mensaje: '¡Cuenta creada con éxito! Redirigiendo al inicio de sesión...' });
            setTimeout(() => {
                navigate('/inicioSesion');
            }, 2000);
        } else {
            setAlerta({ tipo: 'danger', mensaje: resultado.message });
        }
    };

    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="card shadow-lg border-0" style={{ maxWidth: '520px', width: '100%' }}>
                <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold">
                            HOBI<span style={{ color: '#e0006c' }}>C</span>
                        </h2>
                        <h4 className="fw-semibold text-secondary">Crear Cuenta</h4>
                        <p className="text-muted small">Únete a la mayor comunidad geek de Chile</p>
                    </div>

                    {alerta.mensaje && (
                        <div className={`alert alert-${alerta.tipo} py-2`} role="alert">
                            {alerta.mensaje}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                placeholder="Tu nombre y apellido"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">RUN</label>
                            <input
                                type="text"
                                name="run"
                                className={`form-control ${errores.run ? 'is-invalid' : ''}`}
                                placeholder="Ej: 12.345.678-9"
                                maxLength={12}
                                value={formData.run}
                                onChange={handleChange}
                                required
                            />
                            {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Dirección</label>
                            <input
                                type="text"
                                name="direccion"
                                className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                                placeholder="Ej: Av. Siempreviva 742"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                            {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold small">Región</label>
                                <select
                                    name="region"
                                    className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seleccione región...</option>
                                    {Object.keys(DATOS_CHILE).map(region => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                                {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold small">Comuna</label>
                                <select
                                    name="comuna"
                                    className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                                    value={formData.comuna}
                                    onChange={handleChange}
                                    disabled={!formData.region}
                                    required
                                >
                                    <option value="">{formData.region ? 'Seleccione comuna...' : 'Elige región primero'}</option>
                                    {comunasDisponibles.map(comuna => (
                                        <option key={comuna} value={comuna}>{comuna}</option>
                                    ))}
                                </select>
                                {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold small">Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                                placeholder="ejemplo@correo.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold small">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                                    placeholder="Mínimo 6 caracteres"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-bold small">Confirmar Contraseña</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                                    placeholder="Repite la contraseña"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark w-100 fw-bold py-2 mb-3"
                            disabled={cargando}
                        >
                            {cargando ? 'Creando cuenta...' : 'Registrarse'}
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <small className="text-muted">
                            ¿Ya tienes una cuenta? <Link to="/inicioSesion" className="text-decoration-none fw-bold" style={{ color: '#e0006c' }}>Inicia sesión aquí</Link>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
