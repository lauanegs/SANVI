import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Pacientes from "./pages/Pacientes";
import '@fontsource/inter'; 


function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas dentro do layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />}/>
        </Route>       
        
      </Routes>
    </Router>
  );
}

export default App;
