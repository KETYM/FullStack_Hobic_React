// src/pages/DetalleProducto.jsx
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { obtenerProductoPorId } from '../data/mockData';

export default function DetalleProducto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { agregarAlCarrito } = useCart();
    const { usuario } = useAuth();

    const producto = obtenerProductoPorId(id);
    const [cantidad, setCantidad] = useState(1);

    // --- Estado para el Chat específico de este producto ---
    const storageKey = `hobic_chat_${id}`;
    
    const [mensajes, setMensajes] = useState(() => {
        const mensajeBienvenida = producto 
            ? `Bienvenido al chat en vivo de ${producto.nombre}` 
            : 'Bienvenido al chat en vivo';

        try {
            const guardado = localStorage.getItem(storageKey);
            if (guardado) {
                let parsed = JSON.parse(guardado);
                
                // Filtrar basura antigua
                parsed = parsed.filter(msj => !msj.texto.includes('Gracias por tu pregunta sobre este artículo') && !msj.texto.includes('Un vendedor te responderá'));

                if (parsed.length > 0) {
                    if (parsed[0].remitente === 'sistema') {
                        parsed[0].texto = mensajeBienvenida;
                    }
                } else {
                    parsed = [{ id: 1, texto: mensajeBienvenida, remitente: 'sistema' }];
                }
                return parsed;
            }
        } catch {
            // Ignorar
        }

        return [
            { 
                id: 1, 
                texto: mensajeBienvenida, 
                remitente: 'sistema' 
            }
        ];
    });

    const [nuevoMensaje, setNuevoMensaje] = useState('');
    const chatScrollRef = useRef(null);

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(mensajes));
        } catch {
            // Ignorar
        }
        if (chatScrollRef.current) {
            chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
    }, [mensajes, storageKey]);

    const manejarEnvioChat = (e) => {
        e.preventDefault();
        if (!nuevoMensaje.trim()) return;

        // Extraemos solo el primer nombre o 'Visitante'
        const nombreRemitente = usuario?.nombre ? usuario.nombre.split(' ')[0] : 'Visitante';

        const mensajeUsuario = {
            id: Date.now(),
            remitente: 'usuario',
            autor: nombreRemitente, // Guardamos el autor por separado
            texto: nuevoMensaje.trim()
        };

        setMensajes(prev => [...prev, mensajeUsuario]);
        setNuevoMensaje('');
    };

    // Función para vaciar/limpiar el historial de prueba de este producto
    const limpiarHistorial = () => {
        const mensajeBienvenida = producto 
            ? `Bienvenido al chat en vivo de ${producto.nombre}` 
            : 'Bienvenido al chat en vivo';
        
        const limpio = [{ id: Date.now(), texto: mensajeBienvenida, remitente: 'sistema' }];
        setMensajes(limpio);
        localStorage.setItem(storageKey, JSON.stringify(limpio));
    };

    if (!producto) {
        return <Navigate to="/catalogo" replace />;
    }

    const stock = producto.stock ?? 10;
    const stockCritico = producto.stockCritico ?? 5;
    const stockBajo = stock <= stockCritico;

    const handleAgregar = () => {
        agregarAlCarrito(producto, cantidad);
    };

    const handleComprarAhora = () => {
        agregarAlCarrito(producto, cantidad);
        navigate('/pago');
    };

    return (
        <div className="container my-5">
            <div className="row">

                {/* COLUMNA IZQUIERDA: Imagen, Características y Descripción */}
                <div className="col-lg-8 pe-lg-5">

                    {/* Imagen del Producto */}
                    <div
                        className="d-flex justify-content-center p-4 mb-4 rounded border"
                        style={{ backgroundColor: 'var(--bg-surface)' }}
                    >
                        <img
                            src={producto.imagen}
                            alt={producto.nombre}
                            className="img-fluid"
                            style={{ maxHeight: '500px', objectFit: 'contain' }}
                        />
                    </div>

                    <hr className="my-5 border-secondary" />

                    {/* Características */}
                    {producto.detalles && Object.keys(producto.detalles).length > 0 && (
                        <>
                            <h3 className="fs-4 mb-4">Características del producto</h3>
                            <div className="row g-4 mb-4">
                                {Object.entries(producto.detalles).map(([clave, detalle]) => {
                                    const etiqueta = (typeof detalle === 'object' && detalle !== null) ? detalle.etiqueta : clave;
                                    const valor = (typeof detalle === 'object' && detalle !== null) ? detalle.valor : detalle;
                                    return (
                                        <div key={etiqueta || clave} className="col-md-6 d-flex align-items-center gap-3">
                                            <div
                                                className="p-3 rounded-circle d-flex align-items-center justify-content-center"
                                                style={{ width: '50px', height: '50px', backgroundColor: 'var(--bg-surface-elevated, #f8f9fa)' }}
                                            >
                                                <span className="fw-bold fs-5" style={{ color: 'var(--text-muted, #6c757d)' }}>•</span>
                                            </div>
                                            <div>
                                                <span className="d-block text-muted" style={{ fontSize: '14px' }}>{etiqueta}</span>
                                                <span className="fw-bold">{valor}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <hr className="my-5 border-secondary" />
                        </>
                    )}

                    {/* Descripción */}
                    <h3 className="fs-4 mb-3">Descripción</h3>
                    <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '16px' }}>
                        {producto.descripcion || 'Sin descripción disponible para este producto.'}
                    </p>
                </div>

                {/* COLUMNA DERECHA: Caja de Compra (Buy Box) + Chat Integrado */}
                <div className="col-lg-4">
                    <div
                        className="rounded p-4 shadow-sm mb-4"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}
                    >
                        <p className="text-muted small mb-2">{(producto.categoria || 'PRODUCTO').toUpperCase()} | Hobic</p>
                        <h1 className="fs-4 fw-bold mb-3">{producto.nombre}</h1>

                        {/* Precio con descuento */}
                        {producto.descuento > 0 && (
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span className="text-decoration-line-through text-muted" style={{ fontSize: '15px' }}>
                                    ${(producto.precioAnterior || Math.round(producto.precio * 1.2)).toLocaleString('es-CL')}
                                </span>
                                <span className="badge" style={{ backgroundColor: '#e0006c' }}>
                                    -{producto.descuento}%
                                </span>
                            </div>
                        )}
                        <h2 className="display-6 fw-normal mb-3">
                            ${producto.precio.toLocaleString('es-CL')}
                        </h2>

                        {/* Envío */}
                        <div className="mb-4">
                            <p className="text-success fw-bold mb-1">Llega gratis mañana</p>
                            <p className="text-muted small ms-4 mb-0">Solo en Santiago</p>
                        </div>

                        {/* Stock y Cantidad */}
                        {stockBajo ? (
                            <p className="fw-bold mb-2" style={{ color: '#e0006c' }}>
                                ¡Últimas unidades! Solo quedan {stock}
                            </p>
                        ) : (
                            <p className="text-success fw-bold mb-2">¡Stock disponible!</p>
                        )}
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <span className="text-muted small">Cantidad:</span>
                            <select
                                className="form-select form-select-sm w-auto fw-bold"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                            >
                                {Array.from({ length: stock > 0 ? stock : 1 }, (_, i) => i + 1).map((num) => (
                                    <option key={num} value={num}>
                                        {num} unidad{num > 1 ? 'es' : ''}
                                    </option>
                                ))}
                            </select>
                            <span className="text-muted small">({stock} disponibles)</span>
                        </div>

                        {/* Botones de Acción */}
                        <div className="d-flex flex-column gap-2">
                            <button
                                onClick={handleComprarAhora}
                                className="btn text-white py-2 fw-bold"
                                style={{ backgroundColor: '#3483fa' }}
                            >
                                Comprar ahora
                            </button>
                            <button
                                onClick={handleAgregar}
                                className="btn py-2 fw-bold"
                                style={{ backgroundColor: '#e3edfb', color: '#3483fa' }}
                            >
                                Agregar al carrito
                            </button>
                        </div>

                        {/* Info extra */}
                        <div className="mt-4 pt-3 border-top border-secondary">
                            <p className="text-muted small mb-1">Retira gratis a partir de mañana en sucursales.</p>
                            <p className="text-muted small mb-0">Devolución gratis. Tienes 30 días desde que lo recibes.</p>
                        </div>
                    </div>

                    {/* --- CAJA DE CHAT ESTILIZADA Y CON BOTÓN DE LIMPIAR --- */}
                    <div 
                        className="rounded p-3 shadow-sm"
                        style={{ backgroundColor: 'var(--bg-surface-elevated)', border: '1px solid var(--border-subtle)' }}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold text-white mb-0 d-flex align-items-center gap-2">
                                <span>💬</span> Chat en Vivo {producto.nombre}
                            </h6>
                            <button 
                                onClick={limpiarHistorial} 
                                className="btn btn-sm btn-outline-danger py-0 px-2" 
                                style={{ fontSize: '11px' }}
                                title="Borrar historial de prueba"
                            >
                                Limpiar chat
                            </button>
                        </div>
                        
                        {/* Historial de mensajes */}
                        <div 
                            ref={chatScrollRef}
                            className="p-2 mb-3 rounded border border-secondary"
                            style={{ height: '220px', overflowY: 'auto', backgroundColor: '#0a0f1d' }}
                        >
                            {mensajes.map((msj) => (
                                <div
                                    key={msj.id}
                                    className={`p-2 mb-2 rounded small ${
                                        msj.remitente === 'usuario' 
                                            ? 'ms-auto text-white' 
                                            : 'me-auto text-dark'
                                    }`}
                                    style={{ 
                                        maxWidth: '85%', 
                                        backgroundColor: msj.remitente === 'usuario' ? '#6366f1' : '#e2e8f0' 
                                    }}
                                >
                                    {/* Si el mensaje es del usuario, mostramos el nombre arriba en negrita de forma elegante */}
                                    {msj.remitente === 'usuario' && msj.autor && (
                                        <div className="fw-bold text-warning" style={{ fontSize: '11px', marginBottom: '2px' }}>
                                            {msj.autor}
                                        </div>
                                    )}
                                    <div>{msj.texto}</div>
                                </div>
                            ))}
                        </div>

                        {/* Formulario de envío del chat */}
                        <form onSubmit={manejarEnvioChat} className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control form-control-sm bg-dark text-white border-secondary shadow-none"
                                placeholder="Escribe tu mensaje..."
                                value={nuevoMensaje}
                                onChange={(e) => setNuevoMensaje(e.target.value)}
                            />
                            <button type="submit" className="btn btn-sm btn-primary fw-bold text-nowrap">
                                Enviar
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}