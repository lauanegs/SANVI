export function convertSchedulesToForm(schedules: any[]) {
	const weekdayLabels: Record<number, string> = {
		1: "Segunda-feira",
		2: "Terça-feira",
		3: "Quarta-feira",
		4: "Quinta-feira",
		5: "Sexta-feira",
		6: "Sábado",
		7: "Domingo",
	};

	const scheduleMap: any = {};

	for (const s of schedules) {
		const label = weekdayLabels[s.weekDay];
		scheduleMap[label] = {
			inicio: `2025-06-27T${s.startTime}`,
			inicioInt: `2025-06-27T${s.startInterval}`,
			finalInt: `2025-06-27T${s.endInterval}`,
			final: `2025-06-27T${s.endTime}`,
		};
	}

	return scheduleMap;
}
