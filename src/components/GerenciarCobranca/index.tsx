import { useEffect, useState } from "react";
import styles from "./GerenciarCobranca.module.css";
import { TreatmentDTO } from "@api/treatments/getAll";
import { PaymentMethod, PaymentStatus } from "lib/types";
import toast from "react-hot-toast";
import { payPaymentEntryById } from "@api/payments/payPaymentEntryById"; // ajuste o caminho conforme necessário

interface GerenciarCobrancaProps {
	treatmentProp: TreatmentDTO;
}

export function GerenciarCobranca({ treatmentProp }: GerenciarCobrancaProps) {
	const [treatment, setTreatment] = useState<TreatmentDTO>(treatmentProp);
	const [installmentCount, setInstallmentCount] = useState(0);

	const [totalPaid, setTotalPaid] = useState(0);
	const [selectedPayment, setSelectedPayment] = useState<
		(typeof treatment.paymentEntries)[0] | null
	>(null);
	const [paymentDate, setPaymentDate] = useState<string>(
		() => new Date().toISOString().split("T")[0]
	);

	const [status, setStatus] = useState<PaymentStatus>("Pendente");
	const [valorParcela, setValorParcela] = useState<number>(0);

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

		if (treatment?.paymentEntries) {
			setInstallmentCount(treatment.paymentEntries.length);
		}
	}, [treatment]);

	const handlePaySelected = async () => {
		if (!selectedPayment || !paymentDate) {
			toast.error("Selecione uma parcela e defina a data de pagamento.");
			return;
		}

		const toastId = toast.loading("Processando pagamento...");

		const success = await payPaymentEntryById(
			selectedPayment.id,
			paymentDate
		);

		if (success) {
			// Atualiza a parcela paga
			const updatedEntries = treatment.paymentEntries.map((entry) =>
				entry.id === selectedPayment.id
					? { ...entry, paymentDate } // atualiza somente essa parcela
					: entry
			);

			// Atualiza o treatment local
			setTreatment((prev) => ({
				...prev,
				paymentEntries: updatedEntries,
			}));

			// Recalcula total pago
			const totalPaid = updatedEntries.reduce(
				(sum, entry) => sum + (entry.paymentDate ? entry.value : 0),
				0
			);
			setTotalPaid(totalPaid);

			toast.success("Parcela paga com sucesso!", {
				id: toastId,
				position: "bottom-right",
				duration: 2000,
			});

			window.location.reload();
		} else {
			toast.error("Falha ao processar o pagamento.", {
				id: toastId,
				position: "bottom-right",
				duration: 2000,
			});
		}
	};

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
								type="number"
								value={
									selectedPayment
										? `${selectedPayment.value.toFixed(2)}`
										: "Selecione uma parcela"
								}
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>
								Data do pagamento
							</label>
							<input
								className={styles.input}
								type="date"
								value={paymentDate}
								onChange={(e) => setPaymentDate(e.target.value)}
								disabled={!selectedPayment}
							/>
						</div>

						<div className={styles.formGroup}>
							<label className={styles.label}>Status</label>
							<select
								className={styles.select}
								value={
									selectedPayment?.paymentDate
										? "Pago"
										: "Pendente"
								}
								disabled
							>
								<option value="Pago">Pago</option>
								<option value="Pendente">Pendente</option>
							</select>
						</div>

						<div className={styles.fileSection}>
							<button
								className={`${styles.button} ${styles.buttonCheck}`}
								onClick={handlePaySelected}
							>
								✓
							</button>
							{/* <button
								className={`${styles.button} ${styles.buttonDelete}`}
							>
								🗑
							</button> */}
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

						{treatment.totalInstallments ? (
							<div className={styles.detailItem}>
								<label className={styles.label}>
									Parcelas Esperadas
								</label>
								<div className={styles.detailValue}>
									{treatment.totalInstallments ?? 0}
								</div>
							</div>
						) : undefined}

						<div className={styles.detailItem}>
							<label className={styles.label}>
								Parcelas Totais
							</label>
							<div className={styles.detailValue}>
								{installmentCount ?? 0}
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
								onClick={() => {
									if (!entry.paymentDate) {
										setSelectedPayment(entry);
									}
								}}
							>
								<div className={styles.parcelaTitle}>
									<div>
										{entry.installmentNumber}ª parcela
									</div>
								</div>
								<div className={styles.parcelaDetails}>
									<div>
										Valor: R$ {entry.value.toFixed(2)}
									</div>
									<div>
										Status:{" "}
										{entry.paymentDate
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
