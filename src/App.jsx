import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blog from './pages/Blog';
import Carrito from './pages/Carrito'; 
import Admin from './pages/Admin';
import InicioSesion from './pages/InicioSesion';
import AdminUsuarios from './pages/AdminUsuarios';
import Registro from './pages/Registro';
import Recuperar from './pages/Recuperar';
import AdminUsuarios from './pages/AdminUsuarios'; 
import PanelVendedor from './pages/PanelVendedor';
import Checkout from './pages/Checkout';
import PagoExitoso from './pages/PagoExitoso';
import PagoError from './pages/PagoError';
import DetalleProducto from './pages/DetalleProducto';
import Footer from "./components/Footer";
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import ChatVivo from './components/ChatEnVivo';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              {/* Rutas Públicas: Cualquier persona puede verlas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/inicioSesion" element={<InicioSesion />} />
              <Route path="/categoria/:slug" element={<Categorias />} />
              <Route path="/ofertas" element={<Ofertas />} />
            {/* Rutas Públicas: Cualquier persona puede verlas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/inicioSesion" element={<InicioSesion />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recuperar" element={<Recuperar />} />

              {/* Rutas de compra y producto */}
              <Route path="/pago" element={<Checkout />} />
              <Route path="/boleta" element={<PagoExitoso />} />
              <Route path="/pago-error" element={<PagoError />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />


              {/* Rutas Protegidas COMPARTIDAS: Pueden entrar Admins Y Vendedores */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'vendedor']} />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/ventas" element={<PanelVendedor />} />
              </Route>

              {/* Rutas Protegidas ESTRICTAS: SOLO puede entrar el Admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/adminUsuarios" element={<AdminUsuarios />} />
              </Route>
            </Routes>
          </main>
          <Footer />
          <Footer/>
          <ChatVivo /> 
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;