import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import "./NovoEspecialista.css";
import generateSchedulesForToday from "lib/gerarSchedules";
import { API_URL } from "@api/connection";

interface EditarEspecialistaProps {
	specialistId: number;
}

export const EditarEspecialista = forwardRef(
	({ specialistId }: EditarEspecialistaProps, ref) => {
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

		useEffect(() => {
			async function fetchSpecialist() {
				const res = await fetch(
					`${API_URL}/specialist/${specialistId}/with-schedules`
				);
				const data = await res.json();

				setFormData({
					fullName: data.name || "",
					profession: data.specialistType || "DENTISTA",
					cpf: data.cpf || "",
					address: data.address || "",
					rg: data.rg || "",
					neighborhood: data.neighborhood || "",
					number: String(data.addressNumber || ""),
					state: data.uf || "MG",
					birthDate: data.birthDate?.split(" ")[0] || "",
					gender:
						data.gender === "M" || data.gender === "H" ? "M" : "F",
					cep: data.cep || "",
					mobile: String(data.phoneNumber || ""),
				});

				const updatedSchedules = { ...generateSchedulesForToday };
				data.schedules?.forEach((sch: any) => {
					const map: Record<number, string> = {
						1: "Segunda-feira",
						2: "Terça-feira",
						3: "Quarta-feira",
						4: "Quinta-feira",
						5: "Sexta-feira",
						6: "Sábado",
						7: "Domingo",
					};
					const dia = map[sch.weekDay];
					if (dia) {
						updatedSchedules[dia] = {
							inicio: `2025-06-27T${sch.startTime}`,
							inicioInt: `2025-06-27T${sch.startInterval}`,
							finalInt: `2025-06-27T${sch.endInterval}`,
							final: `2025-06-27T${sch.endTime}`,
						};
					}
				});
				setSchedules(updatedSchedules);
			}

			fetchSpecialist();
		}, [specialistId]);

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

		useImperativeHandle(ref, () => ({
			handleSave: async () => {
				console.log(
					"Salvar especialista editado:",
					formData,
					schedules
				);
				return true;
			},
		}));

		return (
			<div className="container">
				<div className="content">
					<div className="section">
						<h2 className="section-title">
							Informações do Especialista
						</h2>
						<div className="form-grid">
							<div className="form-row-two">
								<div className="form-group">
									<label className="label">
										Nome Completo
									</label>
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
										<option value="DENTISTA">
											Dentista
										</option>
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
											handleInputChange(
												"cpf",
												e.target.value
											)
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
											handleInputChange(
												"rg",
												e.target.value
											)
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
										type="date"
										className="date-input"
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
											handleInputChange(
												"cep",
												e.target.value
											)
										}
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
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="section">
						<h2 className="section-title">Horários</h2>
						<div className="schedule-grid">
							<div className="schedule-header">
								<div></div>
								<div className="schedule-header-label">
									Início
								</div>
								<div className="schedule-header-label">
									Início Intervalo
								</div>
								<div className="schedule-header-label">
									Final Intervalo
								</div>
								<div className="schedule-header-label">
									Final
								</div>
							</div>

							{Object.entries(schedules).map(([day, times]) => (
								<div key={day} className="schedule-row">
									<div className="day-label">{day}</div>
									{[
										"inicio",
										"inicioInt",
										"finalInt",
										"final",
									].map((period) => (
										<div key={period}>
											<input
												type="datetime-local"
												className="datetime-input"
												value={times[period]}
												onChange={(e) =>
													handleScheduleChange(
														day,
														period,
														e.target.value
													)
												}
											/>
											<div className="datetime-preview">
												{formatDateTime(times[period])}
											</div>
										</div>
									))}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
);
