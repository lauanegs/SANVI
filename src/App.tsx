import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "@pages/Home/Home";
import Pacientes from "@pages/Pacientes";
import Especialistas from "@pages/Especialistas/Especialistas";
import Login from "@pages/Login/Login";
import '@fontsource/inter'; 
import { CadastroPaciente } from "@pages/Pacientes/CadastroPacientes";


function App() {
  return (
    <Router>
      <Routes>
      <Route index element={<Login />} />
        {/* Rotas dentro do layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />}/>
          <Route path="/especialistas" element={<Especialistas />}/>
        </Route>       
        
      </Routes>
    </Router>
  );
}

export default App;
