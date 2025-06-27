import SearchInput from "@components/search";
import { useEffect, useState } from "react";
import "./entradas.css";
import GenericButton from "@components/GenericButton";
import Modal from "@components/Modal/Modal";
import DetalhesPagamento from "@components/DetalhesPagamento";
import GerenciarCobranca from "@components/GerenciarCobranca";
import { PaymentEntry } from "lib/types";
import { getAllTreatments, TreatmentDTO } from "@api/treatments/getAll";
import { PatientInterface, TreatmentInterface } from "@api/patient/types";
import { findPatient } from "@api/patient";

export default function EntradasTab() {
	const [treatments, setTreatments] = useState<TreatmentDTO[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [patients, setPatients] = useState<PatientInterface[]>([]);
	const [treatmentPayments, setTreatmentPayments] = useState<
		Record<number, PaymentEntry[]>
	>({});

	const [modalPagamentoFixoOpen, setmodalPagamentoFixoOpen] = useState(false);
	const [modalCombranca, setModalCombranca] = useState(false);

	useEffect(() => {
		getAllTreatments().then(setTreatments);
		findPatient().then(setPatients);
	}, []);

	const filteredDados = treatments.filter((treatment) => {
		return (
			treatment.paymentEntries !== null &&
			treatment.patient?.name
				?.toLowerCase()
				.includes(searchTerm.toLowerCase())
		);
	});
	const abrirModal_PagamentoFixo = () => {
		setmodalPagamentoFixoOpen(true);
	};

	const [modalTreatment, setModalTreatment] = useState<TreatmentDTO>();

	const abrirModal_Cobranca = (treatmentId: number | undefined) => {
		if (treatmentId === undefined) return;
		const treatment = treatments.find((t) => t.id === treatmentId);
		if (treatment) {
			setModalTreatment(treatment);
			setModalCombranca(true);
		}
	};

	return (
		<div className="entradasPageContainer">
			<div className="ent_header">
				<SearchInput
					Label="Paciente: "
					labelHorizontal={true}
					onChange={(value) => setSearchTerm(value)}
					value={searchTerm}
					placeholder="Digite o nome do paciente"
				/>
				<GenericButton
					color="PRIMARY"
					title="Pagamento Fixo"
					onClick={abrirModal_PagamentoFixo}
				/>
			</div>

			<div className="ent_content">
				<div className="cards-container">
					{filteredDados.length > 0 ? (
						filteredDados.map((treatment) => {
							return (
								<div
									key={treatment.id}
									className="card-item"
									onClick={() =>
										abrirModal_Cobranca(treatment.id)
									}
								>
									<div className="card-header">
										<h3>{treatment.title}</h3>
										<span
											className={`status ${
												treatment?.paymentStatus ==
													"Pago" ||
												(treatment?.totalValue > 0 &&
													treatment?.totalValue <=
														treatment?.amountPaid)
													? "pago"
													: "pendente"
											}`}
										>
											{treatment?.paymentStatus == "Pago"
												? "pago"
												: "pendente"}
										</span>
									</div>
									<div className="card-body">
										<div className="paciente">
											<strong>Paciente:</strong>{" "}
											{treatment?.patient.name}
										</div>
										<div>
											<strong>Valor:</strong>{" "}
											{treatment?.totalValue ?? "N/A"}
										</div>
										<div>
											<strong>Cobrança:</strong>{" "}
											{treatment?.paymentEntries[0]
												? treatment?.paymentEntries[0]
														.value
												: 0}
										</div>
									</div>
								</div>
							);
						})
					) : (
						<p>Nenhum tratamento encontrado.</p>
					)}
				</div>
			</div>

			<Modal
				isOpen={modalPagamentoFixoOpen}
				onClose={() => setmodalPagamentoFixoOpen(false)}
				size="SMALL"
			>
				<DetalhesPagamento
					patients={patients}
					onClose={() => setmodalPagamentoFixoOpen(false)}
				/>
			</Modal>

			<Modal
				isOpen={modalCombranca}
				onClose={() => setModalCombranca(false)}
				size="BIG"
			>
				{modalTreatment ? (
					<GerenciarCobranca treatmentProp={modalTreatment} />
				) : (
					<div></div>
				)}
			</Modal>
		</div>
	);
}
