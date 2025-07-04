import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "@pages/Home/Home";
import Pacientes from "@pages/Pacientes";
import Especialistas from "@pages/Especialistas/Especialistas";
import Login from "@pages/Login/Login";
import "@fontsource/inter";
import Financas from "@pages/Financas/Financas";
import { CadastroPaciente } from "@pages/Pacientes/CadastroPacientes";
import Calendario from "@pages/Agendamentos/Agendamentos";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TratamentoPacientes } from "@pages/Pacientes/TratamentoPacientes";
import { ProntuarioPaciente } from "@pages/Pacientes/ProntuarioPaciente";
import { Toaster } from "react-hot-toast";

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
						<Route path="/agendamentos" element={<Calendario />} />
						<Route path="/agendamentos" element={<Calendario />} />
						<Route path="/pacientes" element={<Pacientes />} />
						<Route
							path="/especialistas"
							element={<Especialistas />}
						/>
						<Route path="/financas" element={<Financas />} />
						<Route
							path="/cadastroPaciente"
							element={<CadastroPaciente />}
						/>
						<Route
							path="/jornadaPaciente"
							element={<TratamentoPacientes />}
						/>
						<Route
							path="/prontuarioPaciente"
							element={<ProntuarioPaciente />}
						/>
					</Route>
				</Routes>
			</Router>
			<Toaster position="bottom-right" />
		</QueryClientProvider>
	);
}

export default App;
