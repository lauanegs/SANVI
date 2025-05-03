import { HeaderGeneric } from "@components/GenericHeader";
import "./styles.css";
import { useState } from "react";
import GenericButton from "@components/GenericButton";

enum Tab {
    DASHBOARD = "Dashboard",
    ENTRADAS = "Entradas",
    SAIDAS = "Saídas",
}

function Financas() {
    const [tabAtual, setTabAtual] = useState<Tab>(Tab.DASHBOARD);

    return (
        <div className="fin_AlterContainer">
            <HeaderGeneric></HeaderGeneric>

            <div className="fin_TabContainer">
                <nav>
                    <button onClick={() => setTabAtual(Tab.DASHBOARD)}>
                        Dashboard
                    </button>
                    <button onClick={() => setTabAtual(Tab.ENTRADAS)}>
                        Entradas
                    </button>
                    <button onClick={() => setTabAtual(Tab.SAIDAS)}>
                        Saídas
                    </button>
                </nav>
            </div>
            <main className="fin_ContentAlterContainer">
                {tabAtual === Tab.DASHBOARD && <div>Conteúdo do Dashboard</div>}
                {tabAtual === Tab.ENTRADAS && <div>Conteúdo de Entradas</div>}
                {tabAtual === Tab.SAIDAS && <div>Conteúdo de Saídas</div>}
            </main>
        </div>
    );
}

export default Financas;
