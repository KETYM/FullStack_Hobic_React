import { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext'; // Descomenta esto para registrar qué admin hace los cambios

export default function Admin() {
    const [inventario, setInventario] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
    
    const estadoInicialForm = { id: '', nombre: '', precio: '', imagen: '', categoria: '', descuento: '' };
    const [formData, setFormData] = useState(estadoInicialForm);
    const [modoEdicion, setModoEdicion] = useState(false);

    // 1. Carga inicial asíncrona (Preparado para API REST)
    useEffect(() => {
        cargarInventario();
    }, []);

    const cargarInventario = async () => {
        setLoading(true);
        try {
            // 🔗 CIBERSEGURIDAD: Aquí irá tu llamada GET a Spring Boot:
            // const response = await fetch('https://api.hobic.cl/v1/productos', {
            //     headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token_seguro')}` }
            // });
            // const data = await response.json();
            
            // Simulación temporal mientras construyes el backend:
            const inventarioGuardado = JSON.parse(localStorage.getItem("inventarioHobic")) || [];
            setInventario(inventarioGuardado);
        } catch (error) {
            mostrarAlerta('danger', 'Error de conexión al cargar el inventario.');
        } finally {
            setLoading(false);
        }
    };

    // 2. Manejo seguro de inputs (Previene tipos de datos incorrectos)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: (name === 'precio' || name === 'descuento') ? Number(value) : value
        });
    };

    const mostrarAlerta = (tipo, mensaje) => {
        setAlerta({ tipo, mensaje });
        setTimeout(() => setAlerta({ tipo: '', mensaje: '' }), 4000);
    };

    // 3. Validación de Integridad antes de enviar
    const validarFormulario = () => {
        if (formData.precio <= 0) {
            mostrarAlerta('warning', 'El precio debe ser mayor a 0.');
            return false;
        }
        if (formData.descuento && (formData.descuento < 0 || formData.descuento > 100)) {
            mostrarAlerta('warning', 'El descuento debe estar entre 0 y 100.');
            return false;
        }
        // Validación básica de URL para mitigar XSS a través de src de imágenes
        if (!formData.imagen.startsWith('http') && !formData.imagen.startsWith('/')) {
             mostrarAlerta('warning', 'La URL de la imagen no es válida.');
             return false;
        }
        return true;
    };

    // 4. Guardar o Actualizar (Preparado para POST/PUT)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validarFormulario()) return;

        setLoading(true);
        try {
            if (modoEdicion) {
                // 🔗 CIBERSEGURIDAD: Aquí irá tu llamada PUT a Spring Boot
                const inventarioActualizado = inventario.map(prod => prod.id === formData.id ? formData : prod);
                setInventario(inventarioActualizado);
                localStorage.setItem("inventarioHobic", JSON.stringify(inventarioActualizado)); // Temporal
                mostrarAlerta('success', 'Producto actualizado correctamente');
            } else {
                // 🔗 CIBERSEGURIDAD: Aquí irá tu llamada POST a Spring Boot
                // El backend debe ser quien asigne el ID seguro (UUID), no el frontend con Date.now()
                const nuevoProducto = { ...formData, id: crypto.randomUUID() }; 
                const nuevoInventario = [...inventario, nuevoProducto];
                setInventario(nuevoInventario);
                localStorage.setItem("inventarioHobic", JSON.stringify(nuevoInventario)); // Temporal
                mostrarAlerta('success', 'Producto agregado correctamente');
            }
            setFormData(estadoInicialForm);
            setModoEdicion(false);
        } catch (error) {
            mostrarAlerta('danger', 'Error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    const editarProducto = (producto) => {
        setFormData(producto);
        setModoEdicion(true);
        window.scrollTo(0, 0); // Mejora de UX: llevar al admin al formulario
    };

    // 5. Eliminación (Preparado para DELETE)
    const eliminarProducto = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este producto? Esta acción es irreversible.")) {
            setLoading(true);
            try {
                // 🔗 CIBERSEGURIDAD: Aquí irá tu llamada DELETE a Spring Boot
                const inventarioFiltrado = inventario.filter(prod => prod.id !== id);
                setInventario(inventarioFiltrado);
                localStorage.setItem("inventarioHobic", JSON.stringify(inventarioFiltrado)); // Temporal
                mostrarAlerta('success', 'Producto eliminado.');
            } catch (error) {
                mostrarAlerta('danger', 'Error al eliminar el producto.');
            } finally {
                setLoading(false);
            }
        }
    };

    const cancelarEdicion = () => {
        setFormData(estadoInicialForm);
        setModoEdicion(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Administración de Inventario</h2>
            
            {/* Sistema de Alertas Dinámico */}
            {alerta.mensaje && (
                <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
                    {alerta.mensaje}
                </div>
            )}

            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm p-4">
                        <h4>{modoEdicion ? 'Editar Producto' : 'Nuevo Producto'}</h4>
                        <form onSubmit={handleSubmit}>
                            {/* ... (Tus inputs HTML se mantienen exactamente iguales aquí) ... */}
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Precio ($)</label>
                                <input type="number" className="form-control" name="precio" value={formData.precio} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoría</label>
                                <select className="form-select" name="categoria" value={formData.categoria} onChange={handleChange} required>
                                    <option value="">Seleccione...</option>
                                    <option value="manga">Manga</option>
                                    <option value="juegos">Juegos</option>
                                    <option value="figuras">Figuras</option>
                                    <option value="accesorios">Accesorios</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">URL de Imagen</label>
                                <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descuento (%) (Opcional)</label>
                                <input type="number" className="form-control" name="descuento" value={formData.descuento} onChange={handleChange} />
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className={`btn ${modoEdicion ? 'btn-warning' : 'btn-success'}`} disabled={loading}>
                                    {loading ? 'Procesando...' : (modoEdicion ? 'Actualizar Producto' : 'Guardar Producto')}
                                </button>
                                {modoEdicion && (
                                    <button type="button" className="btn btn-secondary" onClick={cancelarEdicion} disabled={loading}>
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card shadow-sm p-3 table-responsive">
                        {loading && inventario.length === 0 ? (
                            <div className="text-center py-4">Cargando inventario seguro...</div>
                        ) : (
                            <table className="table table-hover align-middle">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inventario.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center">No hay productos en el inventario.</td>
                                        </tr>
                                    ) : (
                                        inventario.map(producto => (
                                            <tr key={producto.id}>
                                                <td>
                                                    <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'contain' }} loading="lazy" />
                                                </td>
                                                <td>{producto.nombre}</td>
                                                <td><span className="badge bg-secondary">{producto.categoria.toUpperCase()}</span></td>
                                                <td>${producto.precio.toLocaleString('es-CL')}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => editarProducto(producto)} disabled={loading}>
                                                        ✏️
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={() => eliminarProducto(producto.id)} disabled={loading}>
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}