import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "@pages/Home/Home";
import Pacientes from "@pages/Pacientes";
import Login from "@pages/Login/Login";
import '@fontsource/inter'; 


function App() {
  return (
    <Router>
      <Routes>
      <Route index element={<Login />} />
        {/* Rotas dentro do layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />}/>
        </Route>       
        
      </Routes>
    </Router>
  );
}

export default App;
