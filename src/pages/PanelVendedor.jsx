import { useState, useEffect } from 'react';

export default function PanelVendedor() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const mockPedidos = [
            { id: 'PED-001', cliente: 'Juan Pérez', total: 25000, fecha: '2026-10-07', estado: 'Pendiente' },
            { id: 'PED-002', cliente: 'María Silva', total: 42000, fecha: '2026-10-06', estado: 'Preparando' },
            { id: 'PED-003', cliente: 'Carlos López', total: 15000, fecha: '2026-10-05', estado: 'Enviado' }
        ];
        setPedidos(mockPedidos);
    }, []);

    const actualizarEstado = (id, nuevoEstado) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
        ));
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center">Panel de Ventas y Despachos</h2>
            
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Ventas del Día</h5>
                            <h3 className="card-text">$25.000</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-warning shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pedidos Pendientes</h5>
                            <h3 className="card-text">{pedidos.filter(p => p.estado === 'Pendiente').length}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title">Pedidos Enviados</h5>
                            <h3 className="card-text">{pedidos.filter(p => p.estado === 'Enviado').length}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm p-4 table-responsive">
                <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>N° Pedido</th>
                            <th>Cliente</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map(pedido => (
                            <tr key={pedido.id}>
                                <td className="fw-bold">{pedido.id}</td>
                                <td>{pedido.cliente}</td>
                                <td>{pedido.fecha}</td>
                                <td>${pedido.total.toLocaleString('es-CL')}</td>
                                <td>
                                    <span className={`badge ${
                                        pedido.estado === 'Pendiente' ? 'bg-danger' : 
                                        pedido.estado === 'Preparando' ? 'bg-warning text-dark' : 'bg-success'
                                    }`}>
                                        {pedido.estado}
                                    </span>
                                </td>
                                <td>
                                    <select 
                                        className="form-select form-select-sm d-inline-block w-auto"
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}