import { useState } from 'react';
import { obtenerProductos } from '../data/mockData';

export default function Admin() {
    // Lazy initializer: lee localStorage o carga productos base
    const [inventario, setInventario] = useState(() => {
        try {
            return obtenerProductos();
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(false);
    const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });

    const estadoInicialForm = {
        id: '',
        nombre: '',
        precio: '',
        imagen: '',
        categoria: '',
        descuento: 0,
        stock: 10,
        stockCritico: 5,
        descripcion: ''
    };
    const [formData, setFormData] = useState(estadoInicialForm);
    const [modoEdicion, setModoEdicion] = useState(false);

    // 2. Manejo seguro de inputs (Previene tipos de datos incorrectos)
    const handleChange = (e) => {
        const { name, value } = e.target;
        const camposNumericos = ['precio', 'descuento', 'stock', 'stockCritico'];
        setFormData({
            ...formData,
            [name]: camposNumericos.includes(name) ? Number(value) : value
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
                // Preservar id y detalles existentes si los hay
                const inventarioActualizado = inventario.map(prod => 
                    prod.id === formData.id ? { ...prod, ...formData } : prod
                );
                setInventario(inventarioActualizado);
                localStorage.setItem("inventarioHobic", JSON.stringify(inventarioActualizado));
                mostrarAlerta('success', 'Producto actualizado correctamente');
            } else {
                const nuevoProducto = { 
                    ...formData, 
                    id: crypto.randomUUID(),
                    detalles: formData.detalles || {} 
                };
                const nuevoInventario = [...inventario, nuevoProducto];
                setInventario(nuevoInventario);
                localStorage.setItem("inventarioHobic", JSON.stringify(nuevoInventario));
                mostrarAlerta('success', 'Producto agregado correctamente');
            }
            setFormData(estadoInicialForm);
            setModoEdicion(false);
        } catch {
            mostrarAlerta('danger', 'Error al procesar la solicitud.');
        } finally {
            setLoading(false);
        }
    };

    const editarProducto = (producto) => {
        setFormData({
            id: producto.id || '',
            nombre: producto.nombre || '',
            precio: producto.precio || 0,
            imagen: producto.imagen || '',
            categoria: producto.categoria || '',
            descuento: producto.descuento || 0,
            stock: producto.stock ?? 10,
            stockCritico: producto.stockCritico ?? 5,
            descripcion: producto.descripcion || '',
            detalles: producto.detalles || {}
        });
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
            } catch {
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
                                    <option value="libros">Libros</option>
                                    <option value="mangas">Mangas</option>
                                    <option value="series">Series</option>
                                    <option value="videojuegos">Videojuegos</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Stock</label>
                                    <input type="number" className="form-control" name="stock" value={formData.stock} onChange={handleChange} min="0" required />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Stock Crítico</label>
                                    <input type="number" className="form-control" name="stockCritico" value={formData.stockCritico} onChange={handleChange} min="0" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">URL de Imagen</label>
                                <input type="text" className="form-control" name="imagen" value={formData.imagen} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descuento (%) (Opcional)</label>
                                <input type="number" className="form-control" name="descuento" value={formData.descuento} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción (Opcional)</label>
                                <textarea className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} rows="2" />
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