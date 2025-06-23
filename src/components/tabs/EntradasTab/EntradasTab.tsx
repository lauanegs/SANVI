import SearchInput from "@components/search";
import { useEffect, useState } from "react";
import "./entradas.css";
import GenericButton from "@components/GenericButton";
import Modal from "@components/Modal/Modal";
import DetalhesPagamento from "@components/DetalhesPagamento";
import { Patient, Treatment } from "lib/types";
import GerenciarCobranca from "@components/GerenciarCobranca";
import { PaymentEntry } from "lib/types";
import { getAllTreatments } from "@api/treatments/getAll";
import { PatientInterface, TreatmentInterface } from "@api/patient/types";
import { findPatient } from "@api/patient";
import { getPaymentsByTreatmentId } from "@api/treatments/getPaymentsByTreatmentId";

export default function EntradasTab() {
    const handleGenerate = (data: {
        patient: Patient;
        treatment: Treatment;
        value: number;
        installments: number;
    }) => {
        console.log("Gerando pagamento com dados:", data);
    };

    const [treatments, setTreatments] = useState<Treatment[]>([]);
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
        return treatment.patient?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase());
    });

    const abrirModal_PagamentoFixo = () => {
        setmodalPagamentoFixoOpen(true);
    };

    const [modalTreatment, setModalTreatment] = useState<Treatment>();

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
                            const payments = treatment.paymentEntries ?? [];
                            const firstPayment =
                                payments.length > 0 ? payments[0] : null;

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
                                            className={`status ${firstPayment?.status?.toLowerCase()}`}
                                        >
                                            {firstPayment?.status}
                                        </span>
                                    </div>
                                    <div className="card-body">
                                        <div className="paciente">
                                            <strong>Paciente:</strong>{" "}
                                            {treatment?.patient.name}
                                        </div>
                                        <div>
                                            <strong>Valor:</strong>{" "}
                                            {firstPayment?.value ?? "N/A"}
                                        </div>
                                        <div>
                                            <strong>Cobrança:</strong>{" "}
                                            {firstPayment?.billingPaid ?? 0}
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
                {/* <DetalhesPagamento
                    patients={[]}
                    treatments={treatments}
                    onGenerate={handleGenerate}
                /> */}

                <div></div>
            </Modal>

            <Modal
                isOpen={modalCombranca}
                onClose={() => setModalCombranca(false)}
                size="BIG"
            >
                <GerenciarCobranca treatment={modalTreatment} />
            </Modal>
        </div>
    );
}
