import Card from "@components/Card";
import "./dashboard.css";

export default function DashboardTab() {
    const testeCards = [
        {
            titulo: "Recebido",
            conteudo: "R$ 15.500,00",
            textoInferior: {
                textoDestacado: "22%",
                cor: "azul",
                textoNormal: " em 30 dias",
            },
        },
        {
            titulo: "Despesas",
            conteudo: "R$ 4.200,00",
            textoInferior: {
                textoDestacado: "8%",
                cor: "vermelho",
                textoNormal: " a mais que o mês passado",
            },
        },
        {
            titulo: "Lucro",
            conteudo: "R$ 11.300,00",
            textoInferior: {
                textoDestacado: "14%",
                cor: "azul",
                textoNormal: " de aumento",
            },
        },
    ];

    return (
        <div className="dashboard_Container">
            <div className="header_container">
                {testeCards.map((item, index) => (
                    <Card
                        key={index}
                        titulo={item.titulo}
                        conteudo={item.conteudo}
                        textoInferior={item.textoInferior}
                    />
                ))}
            </div>
        </div>
    );
}
