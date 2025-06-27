import { useEffect, useState } from "react";
import Card from "@components/Card";
import CardAlerta from "@components/cardAlerta";
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
import "./dashboard.css";
import { API_URL } from "@api/connection";

interface Alerta {
	id: number;
	titulo: string;
	conteudo: string;
}

interface MonthlyPayment {
	month: string; // ex: "01/2025"
	total: number;
}

interface ChartData {
	mes: string; // "Jan", "Fev", ...
	recebido: number;
}

interface DashboardSummary {
	totalCaixa: number;
	recebidoMesAtual: number;
	recebidoMesAnterior: number;
}

interface Alerta {
	id: number;
	titulo: string;
	conteudo: string;
}

export default function DashboardTab() {
	const [alertas, setAlertas] = useState<Alerta[]>([]);
	const [data, setData] = useState<ChartData[]>([]);
	const [resumo, setResumo] = useState<DashboardSummary | null>(null);

	const removerAlerta = (id: number) => {
		setAlertas((prev) => prev.filter((alerta) => alerta.id !== id));
	};

	const formatMonth = (month: string): string => {
		const [mm] = month.split("/");
		const nomes = [
			"Jan",
			"Fev",
			"Mar",
			"Abr",
			"Mai",
			"Jun",
			"Jul",
			"Ago",
			"Set",
			"Out",
			"Nov",
			"Dez",
		];
		return nomes[parseInt(mm, 10) - 1] ?? month;
	};

	useEffect(() => {
		// Buscar resumo financeiro
		fetch(`${API_URL}/payments/dashboard-summary`)
			.then((res) => res.json())
			.then((json: DashboardSummary) => setResumo(json))
			.catch((err) => console.error("Erro ao buscar resumo:", err));

		// Buscar gráfico mensal
		fetch(`${API_URL}/payments/monthly`)
			.then((res) => res.json())
			.then((json: MonthlyPayment[]) => {
				const formatted = json.map((entry) => ({
					mes: formatMonth(entry.month),
					recebido: Number(entry.total),
				}));
				setData(formatted);
			})
			.catch((err) =>
				console.error("Erro ao buscar pagamentos mensais:", err)
			);

		// Buscar alertas
		fetch(`${API_URL}/payments/alerts`)
			.then((res) => res.json())
			.then((json: Alerta[]) => {
				setAlertas(json);
			})
			.catch((err) => console.error("Erro ao buscar alertas:", err));
	}, []);

	return (
		<div className="dashboard_Container">
			<div className="header_container">
				<Card
					titulo="Total Caixa"
					conteudo={
						resumo
							? `R$ ${resumo.totalCaixa.toLocaleString("pt-BR", {
									minimumFractionDigits: 2,
							  })}`
							: "R$ 0,00"
					}
					positivo={true}
				/>

				<Card
					titulo="Recebido"
					conteudo={
						resumo
							? `R$ ${resumo.recebidoMesAtual.toLocaleString(
									"pt-BR",
									{
										minimumFractionDigits: 2,
									}
							  )}`
							: "R$ 0,00"
					}
					textoInferior={
						resumo && resumo.recebidoMesAnterior !== 0
							? (() => {
									const percentual =
										((resumo.recebidoMesAtual -
											resumo.recebidoMesAnterior) /
											resumo.recebidoMesAnterior) *
										100;

									return {
										textoDestacado: `${Math.abs(
											percentual
										).toFixed(1)}%`,
										cor:
											resumo.recebidoMesAtual >=
											resumo.recebidoMesAnterior
												? "azul"
												: "vermelho",
										textoNormal:
											resumo.recebidoMesAtual >=
											resumo.recebidoMesAnterior
												? " de aumento"
												: " a menos que o mês passado",
									};
							  })()
							: undefined
					}
				/>

				<Card
					titulo="Recebido Mês Anterior"
					conteudo={
						resumo
							? `R$ ${resumo.recebidoMesAnterior.toLocaleString(
									"pt-BR",
									{
										minimumFractionDigits: 2,
									}
							  )}`
							: "R$ 0,00"
					}
				/>
			</div>

			<div className="content_container">
				<ResponsiveContainer width="100%" height={400}>
					<LineChart
						data={data}
						margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
