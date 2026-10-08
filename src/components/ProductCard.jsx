import { useCart } from '../context/CartContext';

export default function ProductCard({ id, nombre, precio, imagen, categoria, descuento }) {
    const { agregarAlCarrito } = useCart(); 
    // Agrupamos los datos de la tarjeta en un solo objeto para enviarlo al carrito
    const handleAgregar = () => {
        agregarAlCarrito({ id, nombre, precio, imagen, categoria, descuento });
    };

    return(
        <div className="card h-100 shadow-sm border-light position-relative">
            <div className="bg-light d-flex justify-content-center align-items-center p-3" style={{height: '200px'}}>
                <img src={imagen} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} alt={nombre}/>
            </div>
            <div className="card-body d-flex flex-column pb-5"> 
                <small className="fw-bold text-primary">{categoria.toUpperCase()}</small>
                <h6 className="card-title text-secondary mt-2 mb-3 flex-grow-1">{nombre}</h6>
                <div className="d-flex align-items-center gap-2">
                    <span className="fs-5 fw-bold text-dark">${precio.toLocaleString('es-CL')}</span>
                    {descuento && <span className="badge" style={{backgroundColor: '#e0006c'}}>-{descuento}%</span>}
                </div>
            </div>
            <button 
                onClick={handleAgregar} 
                className="btn btn-dark rounded-circle position-absolute" 
                style={{bottom: '15px', right: '15px', width:'40px', height:'40px'}}
            >
                +
            </button>
        </div>
    );
}