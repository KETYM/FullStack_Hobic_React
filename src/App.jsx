import { BrowserRouter } from "react-router-dom";
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Admin from './pages/Admin';
import Header from './components/Header';



function App() {
  return(
    <BrowserRouter>
    <Headers />
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/catalogo" element={<Catalogo/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;