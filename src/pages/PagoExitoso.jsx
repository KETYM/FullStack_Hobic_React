// src/pages/PagoExitoso.jsx
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, Navigate } from "react-router-dom";

const NOMBRE_PAGO = {
    tarjeta: 'Tarjeta de Crédito/Débito',
    transferencia: 'Transferencia Bancaria',
    mercadopago: 'MercadoPago',
};

export default function PagoExitoso() {
    const { vaciarCarrito } = useCart();

    const [boleta] = useState(() => {
        try {
            const datos = localStorage.getItem('ultimaBoleta');
            return datos ? JSON.parse(datos) : null;
        } catch {
            return null;
        }
    });

    // Al montar, vacía el carrito: la compra ya se pagó.
    useEffect(() => {
        if (boleta) {
            vaciarCarrito();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- vaciar una sola vez al montar
    }, []);

    // Sin boleta: no hay nada que mostrar.
    if (!boleta) {
        return <Navigate to="/" replace />;
    }

    // Todo el JSX va AQUÍ, como return del componente (fuera del useEffect).
    return (
        <div className="container my-5" style={{ maxWidth: '600px' }}>
            <div
                className="card p-4 shadow-lg"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}
            >
                {/* encabezado con logo */}
                <div className="text-center mb-4">
                    <Link to="/" className="d-inline-block mb-3 text-decoration-none">
                        <span className="fs-2 fw-bold" style={{ color: 'var(--text-main)' }}>
                            HOBI<span style={{ color: '#e0006c' }}>C</span>
                        </span>
                    </Link>
                    <h3 className="text-success fw-bold">¡Compra Exitosa!</h3>
                    <p className="text-muted small">Comprobante de transacción electrónica</p>
                    <hr className="border-secondary" />
                </div>

                {/* datos generales de la orden */}
                <div className="mb-3">
                    <p className="mb-1 fs-5"><strong>Orden:</strong> {boleta.numero}</p>
                    <p className="mb-1"><strong>Fecha:</strong> {boleta.fecha}</p>
                    <p className="mb-1">
                        <strong>Estado:</strong> <span className="badge bg-success">Pagado / Aprobado</span>
                    </p>
                    <p className="mb-0">
                        <strong>Medio de pago:</strong> {NOMBRE_PAGO[boleta.medioPago] ?? boleta.medioPago}
                    </p>
                </div>

                {/* datos de despacho */}
                <h6 className="fw-bold mt-3 mb-2">Datos de despacho:</h6>
                <div className="mb-4 small" style={{ color: 'var(--text-muted)' }}>
                    <p className="mb-1">{boleta.cliente.nombre}</p>
                    <p className="mb-1">{boleta.cliente.direccion}</p>
                    <p className="mb-1">{boleta.cliente.comuna}, {boleta.cliente.region}</p>
                    <p className="mb-0">Tel: {boleta.cliente.telefono}</p>
                </div>

                {/* detalle de los productos */}
                <h5 className="fw-bold mt-3 mb-2">Detalle de los productos:</h5>
                <ul className="list-group list-group-flush mb-4 rounded bg-transparent">
                    {boleta.productos.map((prod) => (
                        <li
                            key={prod.id}
                            className="list-group-item bg-transparent text-white d-flex justify-content-between align-items-center border-secondary py-3"
                        >
                            <div className="d-flex align-items-center gap-3">
                                <img
                                    src={prod.imagen}
                                    alt={prod.nombre}
                                    style={{
                                        width: '45px',
                                        height: '55px',
                                        objectFit: 'contain',
                                        borderRadius: '4px',
                                        background: 'rgba(255,255,255,0.05)',
                                        padding: '2px',
                                    }}
                                />
                                <div>
                                    <span className="fw-bold d-block">{prod.nombre}</span>
                                    <small className="text-muted">Cantidad: {prod.cantidad}</small>
                                </div>
                            </div>
                            <span className="fw-semibold">
                                ${(prod.precio * prod.cantidad).toLocaleString('es-CL')}
                            </span>
                        </li>
                    ))}
                </ul>

                {/* total pagado */}
                <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3 mb-4">
                    <h4 className="fw-bold mb-0">Total Pagado:</h4>
                    <h4 className="text-success fw-bold mb-0">
                        ${boleta.total.toLocaleString('es-CL')}
                    </h4>
                </div>

                <div className="text-center">
                    <Link to="/" className="btn btn-primary px-4 fw-bold">Volver al Inicio</Link>
                </div>
            </div>
        </div>
    );
}