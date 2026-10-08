import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Carrito from './pages/Carrito'; // <-- Faltaba importar esta vista
import Admin from './pages/Admin';
import InicioSesion from './pages/InicioSesion';
import AdminUsuarios from './pages/AdminUsuarios'; 
import PanelVendedor from './pages/PanelVendedor';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            {/* Rutas Públicas: Cualquier persona puede verlas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/inicioSesion" element={<InicioSesion />} />

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
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;