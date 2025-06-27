import { API_URL } from "../connection";

export async function editSpecialist(specialistData: any, schedules: any) {
	try {
		// 1. Enviar especialista
		const res = await fetch(`${API_URL}/specialist/create`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(specialistData),
		});

		if (!res.ok) throw new Error("Erro ao criar especialista");
		const savedSpecialist = await res.json();

		// 2. Converter horários
		const weekDayMap: Record<string, number> = {
			Domingo: 7,
			"Segunda-feira": 1,
			"Terça-feira": 2,
			"Quarta-feira": 3,
			"Quinta-feira": 4,
			"Sexta-feira": 5,
			Sábado: 6,
		};

		const scheduleList = Object.entries(schedules).map(
			([day, values]: any) => ({
				specialist: { id: savedSpecialist.id },
				weekDay: weekDayMap[day],
				startTime: values.inicio?.split("T")[1],
				startInterval: values.inicioInt?.split("T")[1],
				endInterval: values.finalInt?.split("T")[1],
				endTime: values.final?.split("T")[1],
			})
		);

		// 3. Enviar os horários
		await Promise.all(
			scheduleList.map((s) =>
				fetch(`${API_URL}/specialist-schedule/create`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(s),
				})
			)
		);

		return savedSpecialist;
	} catch (err) {
		console.error("Erro ao salvar especialista:", err);
		throw err;
	}
}
