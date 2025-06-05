const generateSchedulesForToday = () => {
	const baseDate = new Date();
	const format = (hour: number, minute: number) => {
		const d = new Date(baseDate);
		d.setHours(hour, minute, 0, 0);
		return d.toISOString().slice(0, 16); // formato para input type="datetime-local"
	};

	return {
		"Segunda-feira": {
			inicio: format(9, 0),
			inicioInt: format(12, 0),
			finalInt: format(13, 0),
			final: format(17, 0),
		},
		"Terça-feira": {
			inicio: format(8, 30),
			inicioInt: format(12, 0),
			finalInt: format(13, 0),
			final: format(16, 30),
		},
		"Quarta-feira": {
			inicio: format(9, 0),
			inicioInt: format(12, 0),
			finalInt: format(13, 0),
			final: format(17, 0),
		},
		"Quinta-feira": {
			inicio: format(10, 0),
			inicioInt: format(12, 0),
			finalInt: format(13, 0),
			final: format(18, 0),
		},
		"Sexta-feira": {
			inicio: format(9, 0),
			inicioInt: format(12, 0),
			finalInt: format(13, 0),
			final: format(17, 0),
		},
		Sábado: {
			inicio: format(8, 0),
			inicioInt: format(10, 0),
			finalInt: format(10, 30),
			final: format(12, 0),
		},
		Domingo: {
			inicio: format(0, 0),
			inicioInt: format(0, 0),
			finalInt: format(0, 0),
			final: format(0, 0),
		},
	};
};

export default generateSchedulesForToday;
