import { BrowserRouter } from "react-router-dom";



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