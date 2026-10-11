import { useState } from 'react';

export default function Contacto() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        correo: '',
        motivo: '',
        comentario: ''
    });

    const [errores, setErrores] = useState({});
    const [enviadoExitoso, setEnviadoExitoso] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario(prev => ({ ...prev, [name]: value }));
        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validar = () => {
        const errs = {};

        if (!formulario.nombre.trim()) {
            errs.nombre = 'Por favor, ingresa tu nombre completo.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formulario.correo.trim()) {
            errs.correo = 'El correo electrónico es obligatorio.';
        } else if (!emailRegex.test(formulario.correo.trim())) {
            errs.correo = 'Formato de correo inválido (ej: usuario@correo.com).';
        }

        if (!formulario.motivo) {
            errs.motivo = 'Debes seleccionar un motivo.';
        }

        if (!formulario.comentario.trim()) {
            errs.comentario = 'El comentario no puede estar vacío.';
        }

        setErrores(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validar()) return;

        setEnviadoExitoso(true);
        setFormulario({
            nombre: '',
            correo: '',
            motivo: '',
            comentario: ''
        });

        setTimeout(() => {
            setEnviadoExitoso(false);
        }, 6000);
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-sm border-0 p-4 p-md-5 rounded-4 bg-white" style={{ borderTop: '5px solid #043b7a !important' }}>
                        <div className="text-center mb-4">
                            <h2 className="fw-bold mb-2">Contacto Hobic</h2>
                            <p className="text-muted small">
                                ¿Tienes dudas, sugerencias o consultas sobre tu pedido? Completa el formulario y nos comunicaremos contigo a la brevedad.
                            </p>
                        </div>

                        {enviadoExitoso && (
                            <div className="alert alert-success fw-bold text-center py-3 mb-4" role="alert">
                                ✓ ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label className="form-label text-muted small fw-bold">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    className={`form-control shadow-none ${errores.nombre ? 'is-invalid' : ''}`}
                                    placeholder="Tu nombre completo"
                                    value={formulario.nombre}
                                    onChange={handleChange}
                                />
                                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-muted small fw-bold">Correo Electrónico</label>
                                <input
                                    type="email"
                                    name="correo"
                                    className={`form-control shadow-none ${errores.correo ? 'is-invalid' : ''}`}
                                    placeholder="ejemplo@correo.com"
                                    value={formulario.correo}
                                    onChange={handleChange}
                                />
                                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label text-muted small fw-bold">Motivo</label>
                                <select
                                    name="motivo"
                                    className={`form-select shadow-none ${errores.motivo ? 'is-invalid' : ''}`}
                                    value={formulario.motivo}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecciona un motivo...</option>
                                    <option value="consulta">Consulta de producto</option>
                                    <option value="pedido">Estado de pedido</option>
                                    <option value="reclamo">Reclamo / Garantía</option>
                                    <option value="sugerencia">Sugerencia</option>
                                    <option value="otro">Otro</option>
                                </select>
                                {errores.motivo && <div className="invalid-feedback">{errores.motivo}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label text-muted small fw-bold">Comentario o Mensaje</label>
                                <textarea
                                    name="comentario"
                                    rows="4"
                                    className={`form-control shadow-none ${errores.comentario ? 'is-invalid' : ''}`}
                                    placeholder="Escribe tu mensaje o consulta aquí..."
                                    value={formulario.comentario}
                                    onChange={handleChange}
                                />
                                {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn w-100 fw-bold py-2 text-white rounded-3 shadow-sm"
                                style={{ backgroundColor: '#043b7a', border: 'none' }}
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
