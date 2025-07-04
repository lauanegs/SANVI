import { GenericHeader } from "@components/GenericHeader";
import "./styles.css";
import { useState } from "react";
import GenericButton from "@components/GenericButton";
import DashboardTab from "@components/tabs/dashboardTab/DashboardTab";
import SaidasTab from "@components/tabs/SaidasTab/SaidasTab";
import EntradasTab from "@components/tabs/EntradasTab/EntradasTab";

enum Tab {
	DASHBOARD = "Dashboard",
	ENTRADAS = "Entradas",
	SAIDAS = "Saídas",
}

function Financas() {
	const [tabAtual, setTabAtual] = useState<Tab>(Tab.DASHBOARD);

	return (
		<div className="fin_AlterContainer">
			<GenericHeader></GenericHeader>

			<div className="fin_TabContainer">
				<nav>
					<div className="fin_tabs">
						<button
							className={`fin_tabButton ${
								tabAtual === Tab.DASHBOARD ? "ativo" : ""
							}`}
							onClick={() => setTabAtual(Tab.DASHBOARD)}
						>
							Dashboard
						</button>
						<button
							className={`fin_tabButton ${
								tabAtual === Tab.ENTRADAS ? "ativo" : ""
							}`}
							onClick={() => setTabAtual(Tab.ENTRADAS)}
						>
							Entradas
						</button>
						{/* <button
							className={`fin_tabButton ${
								tabAtual === Tab.SAIDAS ? "ativo" : ""
							}`}
							onClick={() => setTabAtual(Tab.SAIDAS)}
						>
							Saídas
						</button> */}
					</div>

					<div className="fin_tabs"></div>
				</nav>
			</div>
			<main className="fin_ContentAlterContainer">
				{tabAtual === Tab.DASHBOARD && <DashboardTab></DashboardTab>}
				{tabAtual === Tab.ENTRADAS && <EntradasTab></EntradasTab>}
			</main>
		</div>
	);
}

export default Financas;
