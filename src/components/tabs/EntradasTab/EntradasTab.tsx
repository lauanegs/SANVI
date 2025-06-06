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

export default function EntradasTab() {
    const handleGenerate = (data: {
        patient: Patient;
        treatment: Treatment;
        value: number;
        installments: number;
    }) => {
        console.log("Gerando pagamento com dados:", data);
    };

    // const dadosPlaceholder: Treatment[] = [
    //     {
    //         id: 201,
    //         title: "Clareamento",
    //         startedAt: new Date(),
    //         endedAt: new Date(),
    //         patients: [
    //             {
    //                 id: 101,
    //                 name: "João Silva",
    //                 CPF: "12345678901",
    //                 birthDate: new Date("1980-05-20"),
    //                 phoneNumber: 11999999999,
    //                 address: "Rua A",
    //                 addressNumber: 123,
    //                 neighborhood: "Centro",
    //                 gender: "H",
    //                 rg: "12345678-9",
    //                 profession: "Engenheiro",
    //                 treatments: [],
    //             },
    //         ],
    //         paymentEntries: [
    //             {
    //                 id: 1,
    //                 patient: {} as Patient,
    //                 value: 400.53,
    //                 status: "Pendente",
    //                 treatment: {} as Treatment,
    //                 billingPaid: 400,
    //                 billingLeft: 0,
    //             },
    //         ],
    //         events: [],
    //     },
    //     {
    //         id: 202,
    //         title: "Limpeza",
    //         startedAt: new Date(),
    //         endedAt: new Date(),
    //         patients: [
    //             {
    //                 id: 102,
    //                 name: "Maria Oliveira",
    //                 CPF: "10987654321",
    //                 birthDate: new Date("1990-10-10"),
    //                 phoneNumber: 11988888888,
    //                 address: "Rua B",
    //                 addressNumber: 456,
    //                 neighborhood: "Jardim",
    //                 gender: "M",
    //                 rg: "98765432-1",
    //                 profession: "Professora",
    //                 treatments: [],
    //             },
    //         ],
    //         paymentEntries: [
    //             {
    //                 id: 2,
    //                 patient: {} as Patient,
    //                 value: 200.0,
    //                 status: "Pendente",
    //                 treatment: {} as Treatment,
    //                 billingPaid: 50,
    //                 billingLeft: 150,
    //             },
    //         ],
    //         events: [],
    //     },
    // ];
    const [treatments, setTreatments] = useState<Treatment[]>([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [modalPagamentoFixoOpen, setmodalPagamentoFixoOpen] = useState(false);
    const [modalCombranca, setModalCombranca] = useState(false);

    useEffect(() => {
        getAllTreatments().then(setTreatments);
    }, []);

    const filteredDados = treatments.filter((treatment) =>
        treatment.patients.some((patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

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
                            const firstPatient = treatment.patients[0];
                            const firstPayment = treatment.paymentEntries[0];
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
                                            {firstPatient.name}
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
                <DetalhesPagamento
                    patients={[]}
                    treatments={treatments}
                    onGenerate={handleGenerate}
                />
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
