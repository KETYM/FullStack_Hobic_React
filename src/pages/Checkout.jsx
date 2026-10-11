import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { DATOS_CHILE } from "../data/chile";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
    const { carrito, totalPlata, totalArticulos } = useCart();
    const { usuario } = useAuth();
    const navigate = useNavigate();

    //estado controlaso del formulario y precarga nombre si una sesión iniciada
    const [formulario, setFormulario] = useState({
        nombre: usuario?.nombre ?? '',
        telefono: '',
        direccion: '',
        region: '',
        comuna: '',
        medioPago: 'tarjeta',
    });

    const [errores, setErrores] = useState({});

    //comuna disp
    const comunas = formulario.region ? DATOS_CHILE[formulario.region] : [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario((prev) => ({
            ...prev,
            [name]: value,
            //al cambiar region, la comna anterior dej de ser valida
            ...(name === 'region' && { comuna: '' }),
        }));
    };

    //validacionde todos los campos anted de pagar
    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre = "El nombre es obligatorio.";
        }

        //num chileno
        const telefonoLimpio = formulario.telefono.replace(/[\s+]/g, '').replace(/^56/, '');
        if (!/^9\d{8}$/.test(telefonoLimpio)) {
            nuevosErrores.telefono = 'Formato inválido. Debe ser un número chileno de 9 dígitos.'
        }

        if (!formulario.direccion.trim()) {
            nuevosErrores.direccion = 'La dirección es obligatoria.';
        }
        if (!formulario.region) {
            nuevosErrores.region = 'Selecciona una región.';
        }
        if (!formulario.comuna) {
            nuevosErrores.comuna = 'Selecciona una comuna.';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        const transaccionExitosa = Math.random() > 0.2;
        if (!transaccionExitosa) {
            navigate('/pago-error');
            return;
        }
        //bolata generada se guarda en localStore
        const boleta = {
            numero: `#${new Date().getFullYear()}${String(Math.floor(1000 + Math.random() * 9000))}`,
            fecha: new Date().toLocaleString('es-CL'),
            cliente: {
                nombre: formulario.nombre,
                telefono: formulario.telefono,
                direccion: formulario.direccion,
                region: formulario.region,
                comuna: formulario.comuna,
            },
            medioPago: formulario.medioPago,
            productos: carrito,
            subtotal: totalPlata,
            total: totalPlata,
        };
        localStorage.setItem('ultimaBoleta', JSON.stringify(boleta));

        // Registramos el pedido para que el Vendedor lo vea en su panel
        const nuevoPedido = {
            id: boleta.numero,
            cliente: formulario.nombre,
            telefono: formulario.telefono,
            direccion: `${formulario.direccion}, ${formulario.comuna}, ${formulario.region}`,
            total: totalPlata,
            fecha: new Date().toISOString().split('T')[0],
            estado: 'Pendiente',
            productos: carrito.map(p => ({ id: p.id, nombre: p.nombre, cantidad: p.cantidad, precio: p.precio }))
        };

        try {
            const pedidosPrevios = JSON.parse(localStorage.getItem('pedidosHobic')) || [];
            localStorage.setItem('pedidosHobic', JSON.stringify([nuevoPedido, ...pedidosPrevios]));
        } catch {
            localStorage.setItem('pedidosHobic', JSON.stringify([nuevoPedido]));
        }

        // El vaciado del carrito lo hará PagoExitoso al montarse (PASO 3).
        navigate('/boleta');
    };

    if (carrito.length === 0) {
        return <Navigate to="/carrito" replace />;
    }

    return (
        <div className="container my-5">
            <h2 className="fw-bold mb-4">Finalizar Compra</h2>

            <form onSubmit={handleSubmit} className="row g-4" noValidate>
                {/* COLUMNA IZQUIERDA: Formulario */}
                <div className="col-lg-8">

                    {/* 1. Datos de envío */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">1. Datos de envío</h5>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">Nombre completo</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        className={`form-control shadow-none ${errores.nombre ? 'is-invalid' : ''}`}
                                        value={formulario.nombre}
                                        onChange={handleChange}
                                    />
                                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Teléfono de contacto</label>
                                    <input
                                        type="text"
                                        name="telefono"
                                        className={`form-control shadow-none ${errores.telefono ? 'is-invalid' : ''}`}
                                        placeholder="Ej: +56912345678"
                                        maxLength={12}
                                        value={formulario.telefono}
                                        onChange={handleChange}
                                    />
                                    {errores.telefono && <div className="invalid-feedback">{errores.telefono}</div>}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Dirección de envío</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        className={`form-control shadow-none ${errores.direccion ? 'is-invalid' : ''}`}
                                        placeholder="Ej: Av. Siempreviva 742"
                                        value={formulario.direccion}
                                        onChange={handleChange}
                                    />
                                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Región</label>
                                    <select
                                        name="region"
                                        className={`form-select shadow-none ${errores.region ? 'is-invalid' : ''}`}
                                        value={formulario.region}
                                        onChange={handleChange}
                                    >
                                        <option value="">Seleccione una región</option>
                                        {Object.keys(DATOS_CHILE).map((region) => (
                                            <option key={region} value={region}>{region}</option>
                                        ))}
                                    </select>
                                    {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Comuna</label>
                                    <select
                                        name="comuna"
                                        className={`form-select shadow-none ${errores.comuna ? 'is-invalid' : ''}`}
                                        value={formulario.comuna}
                                        onChange={handleChange}
                                        disabled={!formulario.region}
                                    >
                                        <option value="">
                                            {formulario.region ? 'Seleccione una comuna' : 'Seleccione primero una región'}
                                        </option>
                                        {comunas.map((comuna) => (
                                            <option key={comuna} value={comuna}>{comuna}</option>
                                        ))}
                                    </select>
                                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Medio de pago */}
                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">2. Medio de pago</h5>

                            <div className="form-check mb-3 p-3 border rounded">
                                <input
                                    className="form-check-input ms-1"
                                    type="radio"
                                    name="medioPago"
                                    id="pagoTarjeta"
                                    value="tarjeta"
                                    checked={formulario.medioPago === 'tarjeta'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2 fw-bold w-100" htmlFor="pagoTarjeta">
                                    Tarjeta de Crédito / Débito
                                    <div className="text-muted small fw-normal mt-1">Serás redirigido a Webpay Plus al confirmar.</div>
                                </label>
                            </div>

                            <div className="form-check mb-3 p-3 border rounded">
                                <input
                                    className="form-check-input ms-1"
                                    type="radio"
                                    name="medioPago"
                                    id="pagoTransferencia"
                                    value="transferencia"
                                    checked={formulario.medioPago === 'transferencia'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2 fw-bold w-100" htmlFor="pagoTransferencia">
                                    Transferencia Bancaria
                                    <div className="text-muted small fw-normal mt-1">Te mostraremos los datos de la cuenta al finalizar.</div>
                                </label>
                            </div>

                            <div className="form-check p-3 border rounded">
                                <input
                                    className="form-check-input ms-1"
                                    type="radio"
                                    name="medioPago"
                                    id="pagoMercadoPago"
                                    value="mercadopago"
                                    checked={formulario.medioPago === 'mercadopago'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2 fw-bold w-100" htmlFor="pagoMercadoPago">
                                    MercadoPago
                                    <div className="text-muted small fw-normal mt-1">Paga con saldo o tarjetas guardadas en tu cuenta.</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: Resumen y botón */}
                <div className="col-lg-4">
                    <div className="card shadow-sm border-0 position-sticky" style={{ top: '20px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4">Resumen</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted">Subtotal ({totalArticulos} artículos)</span>
                                <span>${totalPlata.toLocaleString('es-CL')}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-muted">Envío</span>
                                <span className="text-success fw-bold">Gratis</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <strong className="fs-5">Total a pagar</strong>
                                <strong className="fs-4 text-primary">${totalPlata.toLocaleString('es-CL')}</strong>
                            </div>

                            <p className="small text-muted mb-4">
                                Tus datos personales se utilizarán para procesar tu pedido y respaldar tu experiencia en este sitio web.
                            </p>

                            <button type="submit" className="btn btn-success w-100 py-3 fw-bold shadow-none" style={{ fontSize: '1.1rem' }}>
                                Confirmar y Pagar
                            </button>

                            <div className="text-center mt-3">
                                <Link to="/carrito" className="text-decoration-none text-muted small">Volver al carrito</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}