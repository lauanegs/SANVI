import { useEffect, useState } from "react";
import styles from "./GerenciarCobranca.module.css";
import { TreatmentDTO } from "@api/treatments/getAll";
import { PaymentMethod, PaymentStatus } from "lib/types";

interface GerenciarCobrancaProps {
	treatment?: TreatmentDTO;
}

export function GerenciarCobranca({ treatment }: GerenciarCobrancaProps) {
	const [totalPaid, setTotalPaid] = useState(0);
	// const [installments, setInstallments] = useState(0);
	const [status, setStatus] = useState<PaymentStatus>("Pendente");

	const paymentOptions: { label: string; value: PaymentMethod }[] = [
		{ label: "Dinheiro", value: "Dinheiro" },
		{ label: "Cartão", value: "Cartão" },
		{ label: "PIX", value: "PIX" },
	];

	useEffect(() => {
		if (treatment?.paymentEntries) {
			const total = treatment.paymentEntries.reduce(
				(sum, entry) => sum + (entry.value || 0),
				0
			);
			setTotalPaid(total);
		}

		if (treatment?.paymentStatus) {
			setStatus(treatment.paymentStatus);
		}
	}, [treatment]);

	if (!treatment) {
		return <p>Tratamento sem pagamentos registrados.</p>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				{/* Seção Esquerda */}
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2 className={styles.cardTitle}>Realizar pagamento</h2>
					</div>
					<div className={styles.cardContent}>
						<div className={styles.formGroup}>
							<label className={styles.label}>Valor</label>
							<input
								className={styles.input}
								defaultValue={`R$ ${treatment.totalValue.toFixed(
									2
								)}`}
								readOnly
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>
								Data do pagamento
							</label>
							<input
								className={styles.input}
								defaultValue="26/02/2024"
								type="text"
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>Status</label>
							<select
								className={styles.select}
								value={status}
								onChange={(e) =>
									setStatus(e.target.value as PaymentStatus)
								}
							>
								<option value="Pago">Pago</option>
								<option value="Pendente">Pendente</option>
								<option value="Parcial">Parcial</option>
								<option value="Atrasado">Atrasado</option>
							</select>
						</div>

						<div className={styles.fileSection}>
							<span className={styles.fileName}>
								📎 arquivo.zip
							</span>
							<button
								className={`${styles.button} ${styles.buttonCheck}`}
							>
								✓
							</button>
							<button
								className={`${styles.button} ${styles.buttonDelete}`}
							>
								🗑
							</button>
						</div>
					</div>
				</div>

				{/* Seção do meio */}
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2 className={styles.cardTitle}>
							Detalhes do pagamento
						</h2>
					</div>
					<div className={styles.cardContent}>
						<div className={styles.detailItem}>
							<label className={styles.label}>Paciente</label>
							<div className={styles.detailValue}>
								{treatment.patient.name}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>Tratamento</label>
							<div className={styles.detailValue}>
								{treatment.title}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>Parcelas</label>
							<div className={styles.detailValue}>
								{treatment.totalInstallments ?? 0}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>
								Total da cobrança
							</label>
							<div className={styles.detailValue}>
								R$ {treatment.totalValue?.toFixed(2)}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>Total pago</label>
							<div className={styles.detailValue}>
								R${" "}
								{treatment.amountPaid?.toFixed(2) ??
									totalPaid.toFixed(2)}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>Status</label>
							<div className={styles.detailValue}>
								{treatment.paymentStatus}
							</div>
						</div>

						<div className={styles.detailItem}>
							<label className={styles.label}>Em atraso?</label>
							<div className={styles.detailValue}>
								{treatment.overdue ? "Sim" : "Não"}
							</div>
						</div>
					</div>
				</div>

				{/* Seção Direita - Parcelas */}
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<h2 className={styles.cardTitle}>Parcelas</h2>
					</div>
					<div className={styles.cardContent}>
						{treatment.paymentEntries.map((entry, index) => (
							<div
								key={entry.id}
								className={`${styles.parcela} ${
									entry.paymentDate != null
										? styles.parcelaActive
										: styles.parcelaInactive
								}`}
							>
								<div className={styles.parcelaTitle}>
									{entry.installmentNumber}ª parcela
								</div>
								<div className={styles.parcelaDetails}>
									<div>
										Valor: R$ {entry.value.toFixed(2)}
									</div>
									<div>
										Status:{" "}
										{entry.paymentDate != null
											? "Pago"
											: "Pendente"}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default GerenciarCobranca;
