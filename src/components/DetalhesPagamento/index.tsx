import { useEffect, useState } from "react";
import styles from "./DetalhesPagamento.module.css";
import {
	PatientDTO,
	TreatmentDTO,
	PaymentEntryDTO,
	getAllTreatments,
} from "@api/treatments/getAll";
import { API_URL } from "@api/connection";
import { PatientInterface } from "@api/patient/types";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";
import { createFixedPayment } from "@api/treatments/createFixedPayment";

interface DetalhesPagamentoProps {
	patients: PatientInterface[];
	onClose: () => void;
}

export function DetalhesPagamento({
	patients,
	onClose,
}: DetalhesPagamentoProps) {
	const [selectedPatient, setSelectedPatient] =
		useState<PatientInterface | null>(null);
	const [treatmentsList, setTreatmentsList] = useState<TreatmentDTO[]>([]);
	const [selectedTreatment, setSelectedTreatment] =
		useState<TreatmentDTO | null>(null);
	const [totalValue, setTotalValue] = useState<number>(0);
	const [installments, setInstallments] = useState<number>(1);
	const [paymentEntries, setPaymentEntries] = useState<PaymentEntryDTO[]>([]);

	useEffect(() => {
		if (!selectedPatient) return;

		let isCurrent = true;

		async function fetchTreatments() {
			// try {
			// 	if (!selectedPatient) return;
			// 	const res = await fetch(
			// 		`${API_URL}/patient/${selectedPatient.id}/treatment`
			// 	);
			// 	if (!res.ok)
			// 		throw new Error(`HTTP error! status: ${res.status}`);
			// 	const data = await res.json();
			// 	if (isCurrent)
			// 		setTreatmentsList(Array.isArray(data) ? data : []);
			// 	console.log()
			// } catch (err) {
			// 	if (isCurrent) {
			// 		console.error("Erro ao buscar tratamentos:", err);
			// 		setTreatmentsList([]);
			// 	}
			// }

			let listaTratamentos = await getAllTreatments();

			const filtered = listaTratamentos.filter(
				(treatment) =>
					!treatment.paymentEntries ||
					(treatment.paymentEntries.length === 0 &&
						treatment.patient.id === selectedPatient?.id)
			);
			setTreatmentsList(filtered);
		}

		fetchTreatments();
		return () => {
			isCurrent = false;
		};
	}, [selectedPatient]);

	const handleGenerate = async () => {
		if (
			!selectedPatient ||
			!selectedTreatment ||
			totalValue <= 0 ||
			installments <= 0
		) {
			alert("Preencha todos os campos corretamente!");
			return;
		}

		const today = new Date();

		const generatedEntries: PaymentEntryDTO[] = Array.from({
			length: installments,
		}).map((_, i) => {
			const dueDate = new Date(today);
			dueDate.setMonth(today.getMonth() + i);
			const formattedDate = dueDate.toISOString().split("T")[0];

			return {
				id: 0,
				value: Number((totalValue / installments).toFixed(2)),
				installmentNumber: i + 1,
				dueDate: formattedDate,
				paymentDate: undefined,
			};
		});

		setPaymentEntries(generatedEntries);

		const treatmentDTO: TreatmentDTO = {
			...selectedTreatment,
			paymentEntries: generatedEntries,
			totalValue: totalValue,
			amountPaid: 0,
			paymentStatus: "Pendente",
			totalInstallments: installments,
			overdue: false,
		};

		const toastId = toast.loading("Salvando pagamento...");

		const success = await createFixedPayment(treatmentDTO);

		if (success) {
			toast.success("Pagamento gerado com sucesso!", { id: toastId });
			onClose();
		} else {
			toast.error("Erro ao gerar pagamento", { id: toastId });
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.header}>
					<h2 className={styles.title}>Novo pagamento fixo</h2>
				</div>

				<div className={styles.content}>
					<div className={styles.formGroup}>
						<label className={styles.label}>Paciente</label>
						<select
							className={styles.select}
							value={selectedPatient?.id ?? ""}
							onChange={(e) => {
								const id = parseInt(e.target.value);
								const patient =
									patients.find((p) => p.id === id) || null;
								setSelectedPatient(patient);
								setSelectedTreatment(null);
								setPaymentEntries([]);
							}}
						>
							<option value="">Selecione um paciente</option>
							{patients.map((p) => (
								<option key={p.id} value={p.id}>
									{p.name}
								</option>
							))}
						</select>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Tratamento</label>
						<select
							className={styles.select}
							value={selectedTreatment?.id ?? ""}
							onChange={(e) => {
								const id = parseInt(e.target.value);
								const treatment =
									treatmentsList.find((t) => t.id === id) ||
									null;
								setSelectedTreatment(treatment);
							}}
							disabled={!selectedPatient}
						>
							<option value="">Selecione um tratamento</option>
							{treatmentsList.map((t) => (
								<option key={t.id} value={t.id}>
									{t.title}
								</option>
							))}
						</select>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Valor Total (R$)</label>

						<NumericFormat
							value={totalValue}
							onValueChange={(values) =>
								setTotalValue(Number(values.value))
							}
							thousandSeparator="."
							decimalSeparator=","
							decimalScale={2}
							fixedDecimalScale
							prefix="R$ "
							placeholder="Ex: R$ 2000"
							className={styles.input}
						/>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>
							Número de parcelas
						</label>
						<input
							className={styles.input}
							type="number"
							min={1}
							value={installments}
							onChange={(e) =>
								setInstallments(Number(e.target.value))
							}
						/>
					</div>

					<button className={styles.button} onClick={handleGenerate}>
						Gerar Pagamento
					</button>
				</div>
			</div>
		</div>
	);
}

export default DetalhesPagamento;
