import Card from "@components/Card";
import "./dashboard.css";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import CardAlerta from "@components/cardAlerta";
import { useState } from "react";

interface Alerta {
    id: number;
    titulo: string;
    conteudo: string;
}

export default function DashboardTab() {
    const data = [
        { mes: "Jan", recebido: 12000 },
        { mes: "Fev", recebido: 14200 },
        { mes: "Mar", recebido: 12800 },
        { mes: "Abr", recebido: 15500 },
        { mes: "Mai", recebido: 14900 },
        { mes: "Jun", recebido: 16100 },
    ];

    const [alertas, setAlertas] = useState<Alerta[]>([
        {
            id: 1,
            titulo: "Pagamento em atraso",
            conteudo: "João Alves dos Santos",
        },
        {
            id: 2,
            titulo: "Pagamento em atraso",
            conteudo: "João Alves dos Santos",
        },
    ]);

    const removerAlerta = (id: number) => {
        setAlertas((prev) => prev.filter((alerta) => alerta.id !== id));
    };

    return (
        <div className="dashboard_Container">
            <div className="header_container">
                <Card
                    titulo="Total Caixa"
                    conteudo="R$ 15.500,00"
                    positivo={true}
                />

                <Card
                    titulo="Recebido"
                    conteudo="R$ 4.200,00"
                    textoInferior={{
                        textoDestacado: "8%",
                        cor: "vermelho",
                        textoNormal: " a mais que o mês passado",
                    }}
                />

                <Card
                    titulo="Recebido"
                    conteudo="R$ 11.300,00"
                    textoInferior={{
                        textoDestacado: "14%",
                        cor: "azul",
                        textoNormal: " de aumento",
                    }}
                />
            </div>

            <div className="content_container">
                <ResponsiveContainer width="100%">
                    <LineChart
                        width={500}
                        height={500}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#737373"
                        />
                        <XAxis dataKey="mes" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="recebido"
                            stroke="#1e87f0"
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="footer_container">
                {alertas.map((alerta) => (
                    <CardAlerta
                        key={alerta.id}
                        id={alerta.id}
                        titulo={alerta.titulo}
                        conteudo={alerta.conteudo}
                        acao={() => removerAlerta(alerta.id)}
                    />
                ))}
            </div>
        </div>
    );
}
