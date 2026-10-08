import { useState, useEffect } from 'react';

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // solicitando la lista de usuarios. Por ahora, simulamos una pequeña base de datos.
        const mockUsuarios = [
            { id: 'u1', nombre: 'Admin Principal', correo: 'admin@hobic.cl', rol: 'admin', fecha: '2026-10-01' },
            { id: 'u2', nombre: 'Juan Pérez', correo: 'juan@gmail.com', rol: 'cliente', fecha: '2026-10-05' },
            { id: 'u3', nombre: 'María Silva', correo: 'maria@hotmail.com', rol: 'cliente', fecha: '2026-10-06' }
        ];
        setUsuarios(mockUsuarios);
    }, []);

    const eliminarUsuario = (id) => {
        if (window.confirm("¿Estás seguro de que deseas revocar el acceso a este usuario?")) {
            setUsuarios(usuarios.filter(user => user.id !== id));
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="mb-4 text-center">Gestión de Usuarios</h2>
            
            <div className="card shadow-sm p-4 table-responsive">
                <table className="table table-hover align-middle text-center">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Correo Electrónico</th>
                            <th>Rol</th>
                            <th>Fecha de Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>
                                    <span className={`badge ${user.rol === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                                        {user.rol.toUpperCase()}
                                    </span>
                                </td>
                                <td>{user.fecha}</td>
                                <td>
                                    <button 
                                        className="btn btn-sm btn-outline-danger" 
                                        onClick={() => eliminarUsuario(user.id)}
                                        disabled={user.rol === 'admin'} // Evita que el admin se borre a sí mismo
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}