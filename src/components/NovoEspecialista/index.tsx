import { forwardRef, useImperativeHandle, useState } from "react";
import "./NovoEspecialista.css";
import { createSpecialist } from "@api/specialist/create";
import generateSchedulesForToday from "lib/gerarSchedules";

export const NovoEspecialista = forwardRef((props, ref) => {
	const [formData, setFormData] = useState({
		fullName: "",
		profession: "DENTISTA",
		cpf: "",
		address: "",
		rg: "",
		neighborhood: "",
		number: "",
		state: "MG",
		birthDate: "",
		gender: "M",
		cep: "",
		mobile: "",
	});

	const [schedules, setSchedules] = useState(generateSchedulesForToday);

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleScheduleChange = (
		day: string,
		period: string,
		value: string
	) => {
		setSchedules((prev) => ({
			...prev,
			[day]: { ...prev[day], [period]: value },
		}));
	};

	const formatDateTime = (datetime: string) => {
		if (!datetime) return "";
		const date = new Date(datetime);
		return date.toLocaleString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleSave = async () => {
		const rawPhone = formData.mobile.replace(/\D/g, "");
		const phoneNumber = rawPhone.length > 0 ? parseInt(rawPhone, 10) : null;

		const payload = {
			name: formData.fullName,
			CPF: formData.cpf,
			birthDate: formData.birthDate,
			phoneNumber,
			address: formData.address,
			addressNumber: parseInt(formData.number),
			neighborhood: formData.neighborhood,
			gender: formData.gender === "M" ? 0 : 1,
			rg: formData.rg,
			specialistType: formData.profession,
		};

		try {
			await createSpecialist(payload, schedules);
			return true;
		} catch {
			alert("Erro ao cadastrar especialista");
			return false;
		}
	};

	useImperativeHandle(ref, () => ({
		handleSave,
	}));

	return (
		<div className="container">
			<div className="content">
				{/* Informações Gerais */}
				{/* <div className="section">
					<h2 className="section-title">Informações Gerais</h2>
					<div className="form-grid">
						<div className="form-row-two"></div>
					</div>
				</div> */}

				{/* Informações do Especialista */}
				<div className="section">
					<h2 className="section-title">
						Informações do Especialista
					</h2>
					<div className="form-grid">
						<div className="form-row-two">
							<div className="form-group">
								<label className="label">Nome Completo</label>
								<input
									className="input"
									value={formData.fullName}
									onChange={(e) =>
										handleInputChange(
											"fullName",
											e.target.value
										)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">Profissão</label>
								{/* <input
									className="input"
									value={formData.profession}
									onChange={(e) =>
										handleInputChange(
											"profession",
											e.target.value
										)
									}
								/> */}

								<select
									className="select"
									value={formData.profession}
									onChange={(e) =>
										handleInputChange(
											"profession",
											e.target.value
										)
									}
								>
									<option value="DENTISTA">Dentista</option>
									<option value="ASB">ASB</option>
									<option value="FUNCIONARIO">
										Funcionário
									</option>
								</select>
							</div>
						</div>

						<div className="form-row-two">
							<div className="form-group">
								<label className="label">CPF</label>
								<input
									className="input"
									value={formData.cpf}
									onChange={(e) =>
										handleInputChange("cpf", e.target.value)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">Logradouro</label>
								<input
									className="input"
									value={formData.address}
									onChange={(e) =>
										handleInputChange(
											"address",
											e.target.value
										)
									}
								/>
							</div>
						</div>

						<div className="form-row-four">
							<div className="form-group">
								<label className="label">RG</label>
								<input
									className="input"
									value={formData.rg}
									onChange={(e) =>
										handleInputChange("rg", e.target.value)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">Bairro</label>
								<input
									className="input"
									value={formData.neighborhood}
									onChange={(e) =>
										handleInputChange(
											"neighborhood",
											e.target.value
										)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">Número</label>
								<input
									className="input"
									value={formData.number}
									onChange={(e) =>
										handleInputChange(
											"number",
											e.target.value
										)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">UF</label>
								<select
									className="select"
									value={formData.state}
									onChange={(e) =>
										handleInputChange(
											"state",
											e.target.value
										)
									}
								>
									<option value="MG">MG</option>
									<option value="SP">SP</option>
									<option value="RJ">RJ</option>
									<option value="RS">RS</option>
									<option value="PR">PR</option>
									<option value="SC">SC</option>
									<option value="BA">BA</option>
									<option value="GO">GO</option>
									<option value="DF">DF</option>
								</select>
							</div>
						</div>

						<div className="form-row-four">
							<div className="form-group">
								<label className="label">
									Data de Nascimento
								</label>
								<input
									className="date-input"
									type="date"
									value={formData.birthDate}
									onChange={(e) =>
										handleInputChange(
											"birthDate",
											e.target.value
										)
									}
								/>
							</div>
							<div className="form-group">
								<label className="label">Gênero</label>
								<select
									className="select"
									value={formData.gender}
									onChange={(e) =>
										handleInputChange(
											"gender",
											e.target.value
										)
									}
								>
									<option value="M">Masculino</option>
									<option value="F">Feminino</option>
								</select>
							</div>
							<div className="form-group">
								<label className="label">CEP</label>
								<input
									className="input"
									value={formData.cep}
									onChange={(e) =>
										handleInputChange("cep", e.target.value)
									}
									placeholder="00000-000"
								/>
							</div>
							<div className="form-group">
								<label className="label">Celular</label>
								<input
									className="input"
									value={formData.mobile}
									onChange={(e) =>
										handleInputChange(
											"mobile",
											e.target.value
										)
									}
									placeholder="(00) 00000-0000"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Horários */}
				<div className="section">
					<h2 className="section-title">Horários</h2>
					<div className="schedule-note">
						💡 Cada horário é uma data e hora específica. Selecione
						a data e hora exata para cada período.
					</div>
					<div className="schedule-grid">
						<div className="schedule-header">
							<div></div>
							<div className="schedule-header-label">Início</div>
							<div className="schedule-header-label">
								Início Intervalo
							</div>
							<div className="schedule-header-label">
								Final Intervalo
							</div>
							<div className="schedule-header-label">Final</div>
						</div>

						{Object.entries(schedules).map(([day, times]) => (
							<div key={day} className="schedule-row">
								<div className="day-label">{day}</div>
								<div>
									<input
										className="datetime-input"
										type="datetime-local"
										value={times.inicio}
										onChange={(e) =>
											handleScheduleChange(
												day,
												"inicio",
												e.target.value
											)
										}
									/>
									<div className="datetime-preview">
										{formatDateTime(times.inicio)}
									</div>
								</div>
								<div>
									<input
										className="datetime-input"
										type="datetime-local"
										value={times.inicioInt}
										onChange={(e) =>
											handleScheduleChange(
												day,
												"inicioInt",
												e.target.value
											)
										}
									/>
									<div className="datetime-preview">
										{formatDateTime(times.inicioInt)}
									</div>
								</div>
								<div>
									<input
										className="datetime-input"
										type="datetime-local"
										value={times.finalInt}
										onChange={(e) =>
											handleScheduleChange(
												day,
												"finalInt",
												e.target.value
											)
										}
									/>
									<div className="datetime-preview">
										{formatDateTime(times.finalInt)}
									</div>
								</div>
								<div>
									<input
										className="datetime-input"
										type="datetime-local"
										value={times.final}
										onChange={(e) =>
											handleScheduleChange(
												day,
												"final",
												e.target.value
											)
										}
									/>
									<div className="datetime-preview">
										{formatDateTime(times.final)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
});
