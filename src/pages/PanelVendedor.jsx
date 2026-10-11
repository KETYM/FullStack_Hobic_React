import { useState } from 'react';

const PEDIDOS_SEED = [
    { id: '#20261001', cliente: 'Juan Pérez', total: 25990, fecha: '2026-10-07', direccion: 'Providencia, Santiago', estado: 'Pendiente' },
    { id: '#20261002', cliente: 'María Silva', total: 42000, fecha: '2026-10-06', direccion: 'Viña del Mar, Valparaíso', estado: 'Preparando' },
    { id: '#20261003', cliente: 'Carlos López', total: 15990, fecha: '2026-10-05', direccion: 'Concepción, Biobío', estado: 'Enviado' }
];

function leerPedidosDeStorage() {
    try {
        const datos = localStorage.getItem('pedidosHobic');
        if (datos) {
            const parsed = JSON.parse(datos);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
        localStorage.setItem('pedidosHobic', JSON.stringify(PEDIDOS_SEED));
        return PEDIDOS_SEED;
    } catch {
        return PEDIDOS_SEED;
    }
}

export default function PanelVendedor() {
    const [pedidos, setPedidos] = useState(() => leerPedidosDeStorage());
    const [filtroEstado, setFiltroEstado] = useState('todos');

    const actualizarEstado = (id, nuevoEstado) => {
        const actualizados = pedidos.map(p =>
            p.id === id ? { ...p, estado: nuevoEstado } : p
        );
        setPedidos(actualizados);
        localStorage.setItem('pedidosHobic', JSON.stringify(actualizados));
    };

    const totalVentas = pedidos.reduce((acc, p) => acc + (p.total || 0), 0);
    const totalPendientes = pedidos.filter(p => p.estado === 'Pendiente').length;
    const totalEnviados = pedidos.filter(p => p.estado === 'Enviado' || p.estado === 'Entregado').length;

    const pedidosFiltrados = filtroEstado === 'todos' 
        ? pedidos 
        : pedidos.filter(p => p.estado.toLowerCase() === filtroEstado.toLowerCase());

    return (
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                    <h2 className="fw-bold mb-1">Panel de Ventas y Despachos</h2>
                    <p className="text-muted small mb-0">Gestión de órdenes en tiempo real</p>
                </div>
                <div className="d-flex gap-2">
                    <button 
                        className={`btn btn-sm ${filtroEstado === 'todos' ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => setFiltroEstado('todos')}
                    >
                        Todos ({pedidos.length})
                    </button>
                    <button 
                        className={`btn btn-sm ${filtroEstado === 'pendiente' ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={() => setFiltroEstado('pendiente')}
                    >
                        Pendientes ({totalPendientes})
                    </button>
                </div>
            </div>

            {/* KPIs Métricas Rápidas */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow-sm h-100 rounded-4 border-0 p-3">
                        <div className="card-body">
                            <span className="small text-uppercase opacity-75 fw-semibold">Ingresos Totales</span>
                            <h3 className="card-text fw-bold mt-2">${totalVentas.toLocaleString('es-CL')}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-dark bg-warning shadow-sm h-100 rounded-4 border-0 p-3">
                        <div className="card-body">
                            <span className="small text-uppercase opacity-75 fw-semibold">Pedidos Pendientes</span>
                            <h3 className="card-text fw-bold mt-2">{totalPendientes}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow-sm h-100 rounded-4 border-0 p-3">
                        <div className="card-body">
                            <span className="small text-uppercase opacity-75 fw-semibold">Enviados / Entregados</span>
                            <h3 className="card-text fw-bold mt-2">{totalEnviados}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de Pedidos */}
            <div className="card shadow-sm p-3 rounded-4 border-0 bg-white table-responsive">
                <table className="table table-hover align-middle text-center mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>N° Orden</th>
                            <th>Cliente</th>
                            <th>Dirección / Destino</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Cambiar Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidosFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-muted py-4">No hay pedidos registrados en este estado.</td>
                            </tr>
                        ) : (
                            pedidosFiltrados.map(pedido => (
                                <tr key={pedido.id}>
                                    <td className="fw-bold text-primary">{pedido.id}</td>
                                    <td>
                                        <div className="fw-semibold">{pedido.cliente}</div>
                                        {pedido.telefono && <small className="text-muted">{pedido.telefono}</small>}
                                    </td>
                                    <td>
                                        <small className="text-secondary">{pedido.direccion || 'Envío a domicilio'}</small>
                                    </td>
                                    <td><small>{pedido.fecha}</small></td>
                                    <td className="fw-bold">${(pedido.total || 0).toLocaleString('es-CL')}</td>
                                    <td>
                                        <span className={`badge ${
                                            pedido.estado === 'Pendiente' ? 'bg-danger' :
                                            pedido.estado === 'Preparando' ? 'bg-warning text-dark' :
                                            pedido.estado === 'Enviado' ? 'bg-info text-dark' :
                                            'bg-success'
                                        }`}>
                                            {pedido.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm d-inline-block w-auto fw-semibold shadow-none"
                                            value={pedido.estado}
                                            onChange={(e) => actualizarEstado(pedido.id, e.target.value)}
                                        >
                                            <option value="Pendiente">Pendiente</option>
                                            <option value="Preparando">Preparando</option>
                                            <option value="Enviado">Enviado</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}