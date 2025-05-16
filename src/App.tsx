import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "@pages/Home/Home";
import Pacientes from "@pages/Pacientes";
import Especialistas from "@pages/Especialistas/Especialistas";
import Login from "@pages/Login/Login";
import "@fontsource/inter";
import Financas from "@pages/Financas/Financas";
import Calendario from "@pages/Agendamentos/Agendamentos";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


import '@fontsource/inter';

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


const queryClient = new QueryClient({});


function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
          <Route index element={<Login />} />
            {/* Rotas dentro do layout */}
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/pacientes" element={<Pacientes />}/>
              <Route path="/especialistas" element={<Especialistas />}/>
              <Route path="/financas" element={<Financas />} />
            </Route>

          </Routes>
        </Router>
      </QueryClientProvider>
  );

}

export default App;
