import { useNavigate } from "react-router-dom";

export default function PagoError() {
    // useNavigate: hook para navegar por código (sin <Link>).
    // Lo usamos en el botón para volver al pago.
    const navigate = useNavigate();

    return (
        <div className="container my-5" style={{ maxWidth: '600px' }}>
            <div className="card p-4 shadow-lg text-center"
                style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}>

                {/* Encabezado con el logo de Hobic */}
                <div className="mb-4">
                    <span className="fs-2 fw-bold" style={{ color: 'var(--text-main)' }}>
                        HOBI<span style={{ color: '#e0006c' }}>C</span>
                    </span>
                    <h3 className="text-danger fw-bold mt-3">Transacción Fallida</h3>
                    <p className="text-muted small">No logramos procesar tu pago</p>
                    <hr className="border-secondary" />
                </div>
                {/*icono error*/}
                <div className="mb-4">
                    <span style={{ fontSize: '4rem' }}>⚠️</span>
                </div>

                {/* Mensaje explicativo */}
                <p className="mb-2" style={{ color: 'var(--text-main)' }}>
                    Tu transacción no pudo ser completada.
                </p>
                <p className="text-muted small mb-4">
                    No se realizó ningún cobro. Tus productos siguen en el carrito
                    para que puedas intentarlo nuevamente.
                </p>

                {/*boton para volver a relizar pago*/}
                <button
                    onClick={() => navigate('/pago')}
                    className="btn btn-danger px-4 py-2 fw-bold mb-3">
                    volver a realizar pago
                </button>

                {/*boton volver a carrito */}
                <div>
                    <button
                        onClick={() => navigate('/carrito')}
                        className="btn btn-outline-light px-4 py-2">
                        volver al carrito
                    </button>
                </div>
            </div>
        </div>
    );
}