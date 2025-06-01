import SearchInput from "@components/search";
import { useState } from "react";
import "./entradas.css";
import GenericButton from "@components/GenericButton";
import Modal from "@components/Modal/Modal";
import DetalhesPagamento from "@components/DetalhesPagamento";
import { Patient, PaymentEntry, Treatment } from "lib/types";
import GerenciarCobranca from "@components/GerenciarCobranca";

export default function EntradasTab() {
    const handleGenerate = (data: {
        patient: Patient;
        treatment: Treatment;
        value: number;
        installments: number;
    }) => {
        // Aqui você pode fazer a lógica de salvar, mostrar mensagem, etc.
        console.log("Gerando pagamento com dados:", data);
    };

    const dadosPlaceholder: PaymentEntry[] = [
        {
            id: 1,
            patient: {
                id: 101,
                name: "João Silva",
                CPF: "12345678901",
                birthDate: new Date("1980-05-20"),
                phoneNumber: 11999999999,
                address: "Rua A",
                addressNumber: 123,
                neighborhood: "Centro",
                gender: "H", // Assumindo que Gender é string "M" | "F" ou similar
                rg: "12345678-9",
                profession: "Engenheiro",
                treatments: [],
            },
            value: 400.53,
            status: "Pago",
            paymentMethod: "Cartão",
            installments: 1,
            treatment: {
                id: 201,
                title: "Clareamento",
                startedAt: new Date("2023-04-01"),
                endedAt: undefined,
                patients: [], // lista de pacientes que pode estar vazia aqui
                paymentEntries: [],
                events: [],
            },
            billingPaid: 400,
            billingLeft: 0,
        },
        {
            id: 2,
            patient: {
                id: 102,
                name: "Maria Oliveira",
                CPF: "10987654321",
                birthDate: new Date("1990-10-10"),
                phoneNumber: 11988888888,
                address: "Rua B",
                addressNumber: 456,
                neighborhood: "Jardim",
                gender: "M",
                rg: "98765432-1",
                profession: "Professora",
                treatments: [],
            },
            value: 200.0,
            status: "Pendente",
            paymentMethod: "Dinheiro",
            installments: 2,
            treatment: {
                id: 202,
                title: "Limpeza",
                startedAt: new Date("2023-05-01"),
                endedAt: undefined,
                patients: [],
                paymentEntries: [],
                events: [],
            },
            billingPaid: 50,
            billingLeft: 150,
        },
        {
            id: 3,
            patient: {
                id: 103,
                name: "Carlos Souza",
                CPF: "11223344556",
                birthDate: new Date("1975-07-15"),
                phoneNumber: 11977777777,
                address: "Rua C",
                addressNumber: 789,
                neighborhood: "Vila Nova",
                gender: "H",
                rg: "11223344-5",
                profession: "Médico",
                treatments: [],
            },
            value: 900.0,
            status: "Pago",
            paymentMethod: "PIX",
            installments: 4,
            treatment: {
                id: 203,
                title: "Canal",
                startedAt: new Date("2023-06-01"),
                endedAt: undefined,
                patients: [],
                paymentEntries: [],
                events: [],
            },
            billingPaid: 900,
            billingLeft: 0,
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [modalPagamentoFixoOpen, setmodalPagamentoFixoOpen] = useState(false);
    const [modalCombranca, setModalCombranca] = useState(false);

    const [modalPaymentEntry, setModalPaymentEntry] = useState<PaymentEntry>(
        dadosPlaceholder[1]
    );

    // Filtra os dados pelo paciente que contenha o texto do searchTerm (ignore case)
    const filteredDados = dadosPlaceholder.filter((item) =>
        item.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const abrirModal_PagamentoFixo = () => {
        setmodalPagamentoFixoOpen(true);
    };

    const abrirModal_Cobranca = (paymentId: number | undefined) => {
        if (paymentId === undefined) return;

        const payment =
            dadosPlaceholder.find((p) => p.id === paymentId) ?? null;

        if (payment) {
            setModalPaymentEntry(payment);
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
                />
                <GenericButton
                    color="PRIMARY"
                    title="Pagamento Fixo"
                    onClick={() => abrirModal_PagamentoFixo()}
                />
            </div>

            <div className="ent_content">
                <div className="cards-container">
                    {filteredDados.length > 0 ? (
                        filteredDados.map((item) => (
                            <div
                                key={item.id}
                                className="card-item"
                                onClick={() => abrirModal_Cobranca(item.id)}
                            >
                                <div className="card-header">
                                    <h3>{item.treatment?.title}</h3>
                                    <span
                                        className={`status ${item.status.toLowerCase()}`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="paciente">
                                        <strong>Paciente:</strong>{" "}
                                        {item.patient.name}
                                    </div>
                                    <div>
                                        <strong>Valor:</strong> {item.value}
                                    </div>
                                    <div>
                                        <strong>Cobrança:</strong>{" "}
                                        {item.billingPaid}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum paciente encontrado.</p>
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
                    treatments={[]}
                    onGenerate={handleGenerate}
                ></DetalhesPagamento>
            </Modal>

            <Modal
                isOpen={modalCombranca}
                onClose={() => setModalCombranca(false)}
                size="BIG"
            >
                <GerenciarCobranca
                    payment={modalPaymentEntry}
                ></GerenciarCobranca>
            </Modal>
        </div>
    );
}
