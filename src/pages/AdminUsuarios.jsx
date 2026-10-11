import { useState } from 'react';
import { DATOS_CHILE } from '../data/chile';
import { useAuth } from '../context/AuthContext';

const USUARIOS_BASE = [
    { id: 'u-admin', nombre: 'Administrador Hobic', correo: 'admin@hobic.cl', rol: 'admin', run: '11.111.111-1', direccion: 'Av. Siempre Viva 123', region: 'Metropolitana de Santiago', comuna: 'Santiago', fecha: '2026-01-01' },
    { id: 'u-vendedor', nombre: 'Vendedor Hobic', correo: 'vendedor@hobic.cl', rol: 'vendedor', run: '22.222.222-2', direccion: 'Paseo Ahumada 456', region: 'Metropolitana de Santiago', comuna: 'Santiago', fecha: '2026-01-01' }
];

function leerUsuariosDeStorage() {
    try {
        const datos = localStorage.getItem("usuariosHobic");
        if (datos) {
            const parsed = JSON.parse(datos);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
        localStorage.setItem("usuariosHobic", JSON.stringify(USUARIOS_BASE));
        return USUARIOS_BASE;
    } catch {
        return USUARIOS_BASE;
    }
}

export default function AdminUsuarios() {
    const { usuario: usuarioActual } = useAuth();

    const [usuarios, setUsuarios] = useState(() => leerUsuariosDeStorage());
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
    const [modoEdicion, setModoEdicion] = useState(false);

    const estadoInicialForm = {
        id: '',
        nombre: '',
        run: '',
        direccion: '',
        region: '',
        comuna: '',
        correo: '',
        password: '',
        rol: 'cliente'
    };
    const [formData, setFormData] = useState(estadoInicialForm);

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

    const mostrarAlerta = (tipo, mensaje) => {
        setAlerta({ tipo, mensaje });
        setTimeout(() => setAlerta({ tipo: '', mensaje: '' }), 4000);
    };

    const validar = () => {
        if (!formData.nombre.trim()) {
            mostrarAlerta('warning', 'El nombre es obligatorio.');
            return false;
        }
        const runRegex = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]{1}$/;
        if (!runRegex.test(formData.run)) {
            mostrarAlerta('warning', 'El formato del RUN es inválido. Ejemplo: 12.345.678-9');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.correo.trim())) {
            mostrarAlerta('warning', 'El formato del correo es inválido.');
            return false;
        }
        if (!modoEdicion && formData.password.length < 6) {
            mostrarAlerta('warning', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        // Validar correo duplicado
        const duplicado = usuarios.find(
            u => u.correo.toLowerCase() === formData.correo.trim().toLowerCase() && u.id !== formData.id
        );
        if (duplicado) {
            mostrarAlerta('danger', 'Ya existe un usuario con ese correo electrónico.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) return;

        let nuevaLista;
        if (modoEdicion) {
            nuevaLista = usuarios.map(u => {
                if (u.id === formData.id) {
                    return {
                        ...u,
                        nombre: formData.nombre.trim(),
                        run: formData.run.trim(),
                        direccion: formData.direccion.trim(),
                        region: formData.region,
                        comuna: formData.comuna,
                        correo: formData.correo.trim().toLowerCase(),
                        rol: formData.rol,
                        ...(formData.password ? { password: formData.password } : {})
                    };
                }
                return u;
            });
            mostrarAlerta('success', 'Usuario actualizado correctamente.');
        } else {
            const nuevo = {
                id: crypto.randomUUID(),
                nombre: formData.nombre.trim(),
                run: formData.run.trim(),
                direccion: formData.direccion.trim(),
                region: formData.region,
                comuna: formData.comuna,
                correo: formData.correo.trim().toLowerCase(),
                password: formData.password,
                rol: formData.rol,
                fecha: new Date().toISOString().split('T')[0]
            };
            nuevaLista = [...usuarios, nuevo];
            mostrarAlerta('success', 'Usuario creado exitosamente.');
        }

        setUsuarios(nuevaLista);
        localStorage.setItem("usuariosHobic", JSON.stringify(nuevaLista));
        setFormData(estadoInicialForm);
        setModoEdicion(false);
    };

    const handleEditar = (u) => {
        setFormData({
            id: u.id || '',
            nombre: u.nombre || '',
            run: u.run || '',
            direccion: u.direccion || '',
            region: u.region || '',
            comuna: u.comuna || '',
            correo: u.correo || '',
            password: '', // En edición, se deja en blanco para no sobreescribir salvo que se ingrese una nueva
            rol: u.rol || 'cliente'
        });
        setModoEdicion(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEliminar = (user) => {
        if (usuarioActual && (user.correo === usuarioActual.correo || user.id === usuarioActual.id)) {
            mostrarAlerta('warning', 'No puedes eliminar tu propio usuario activo.');
            return;
        }
        if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${user.nombre}" (${user.correo})?`)) {
            const filtrados = usuarios.filter(u => u.id !== user.id && u.correo !== user.correo);
            setUsuarios(filtrados);
            localStorage.setItem("usuariosHobic", JSON.stringify(filtrados));
            mostrarAlerta('success', 'Usuario eliminado con éxito.');
            if (modoEdicion && formData.id === user.id) {
                setFormData(estadoInicialForm);
                setModoEdicion(false);
            }
        }
    };

    const cancelarEdicion = () => {
        setFormData(estadoInicialForm);
        setModoEdicion(false);
    };

    const comunasDisponibles = formData.region ? (DATOS_CHILE[formData.region] || []) : [];

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center fw-bold">Gestión de Usuarios</h2>

            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                </div>
            )}

            <div className="row">
                {/* Formulario de Agregar / Editar */}
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm p-4 rounded-4 border-0 bg-white">
                        <h4 className="fw-bold mb-3">{modoEdicion ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</h4>
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-2">
                                <label className="form-label small fw-semibold">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className="form-control form-control-sm"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Nombre completo"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-semibold">RUN</label>
                                <input
                                    type="text"
                                    name="run"
                                    className="form-control form-control-sm"
                                    value={formData.run}
                                    onChange={handleChange}
                                    placeholder="12.345.678-9"
                                    maxLength={12}
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-semibold">Dirección</label>
                                <input
                                    type="text"
                                    name="direccion"
                                    className="form-control form-control-sm"
                                    value={formData.direccion}
                                    onChange={handleChange}
                                    placeholder="Av. Ejemplo 123"
                                />
                            </div>

                            <div className="row g-2 mb-2">
                                <div className="col-6">
                                    <label className="form-label small fw-semibold">Región</label>
                                    <select
                                        name="region"
                                        className="form-select form-select-sm"
                                        value={formData.region}
                                        onChange={handleChange}
                                    >
                                        <option value="">Región...</option>
                                        {Object.keys(DATOS_CHILE).map(r => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-semibold">Comuna</label>
                                    <select
                                        name="comuna"
                                        className="form-select form-select-sm"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        disabled={!formData.region}
                                    >
                                        <option value="">Comuna...</option>
                                        {comunasDisponibles.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-semibold">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="correo"
                                    className="form-control form-control-sm"
                                    value={formData.correo}
                                    onChange={handleChange}
                                    placeholder="correo@ejemplo.com"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="form-label small fw-semibold">
                                    {modoEdicion ? 'Contraseña (dejar en blanco para no cambiar)' : 'Contraseña'}
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control form-control-sm"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required={!modoEdicion}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Rol del Sistema</label>
                                <select
                                    name="rol"
                                    className="form-select form-select-sm"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="cliente">Cliente</option>
                                    <option value="vendedor">Vendedor</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className={`btn btn-sm ${modoEdicion ? 'btn-warning text-dark' : 'btn-dark'} fw-bold`}>
                                    {modoEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
                                </button>
                                {modoEdicion && (
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={cancelarEdicion}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Tabla de Usuarios */}
                <div className="col-lg-8">
                    <div className="card shadow-sm p-3 rounded-4 border-0 bg-white table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Usuario</th>
                                    <th>RUN</th>
                                    <th>Rol</th>
                                    <th>Ubicación</th>
                                    <th className="text-end">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-muted">No hay usuarios registrados.</td>
                                    </tr>
                                ) : (
                                    usuarios.map(u => {
                                        const esPropio = usuarioActual && (u.correo === usuarioActual.correo || u.id === usuarioActual.id);
                                        return (
                                            <tr key={u.id || u.correo}>
                                                <td>
                                                    <div className="fw-bold">{u.nombre}</div>
                                                    <small className="text-muted">{u.correo}</small>
                                                </td>
                                                <td><small className="fw-semibold">{u.run || 'Sin RUN'}</small></td>
                                                <td>
                                                    <span className={`badge ${
                                                        u.rol === 'admin' ? 'bg-danger' : 
                                                        u.rol === 'vendedor' ? 'bg-warning text-dark' : 
                                                        'bg-primary'
                                                    }`}>
                                                        {(u.rol || 'CLIENTE').toUpperCase()}
                                                    </span>
                                                </td>
                                                <td>
                                                    <small className="d-block">{u.direccion || 'Sin dirección'}</small>
                                                    <small className="text-muted">{u.comuna ? `${u.comuna}, ${u.region}` : 'Sin comuna'}</small>
                                                </td>
                                                <td className="text-end">
                                                    <button 
                                                        className="btn btn-sm btn-outline-primary me-2" 
                                                        onClick={() => handleEditar(u)}
                                                        title="Editar usuario"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger" 
                                                        onClick={() => handleEliminar(u)}
                                                        disabled={esPropio}
                                                        title={esPropio ? "No puedes eliminar tu propia sesión" : "Eliminar usuario"}
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}