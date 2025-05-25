import SearchInput from "@components/search";
import { useState } from "react";
import "./entradas.css";
import GenericButton from "@components/GenericButton";
import Modal from "@components/Modal/Modal";

export default function EntradasTab() {
    const dadosPlaceholder = [
        {
            id: 1,
            tratamento: "Clareamento",
            paciente: "João Silva",
            valor: "R$ 400,00",
            cobranca: "Cartão",
            status: "Pago",
        },
        {
            id: 2,
            tratamento: "Limpeza",
            paciente: "Maria Oliveira",
            valor: "R$ 200,00",
            cobranca: "PIX",
            status: "Pendente",
        },
        {
            id: 3,
            tratamento: "Canal",
            paciente: "Carlos Souza",
            valor: "R$ 900,00",
            cobranca: "Dinheiro",
            status: "Pago",
        },
        {
            id: 4,
            tratamento: "Canal",
            paciente: "Gabriel Lucas",
            valor: "R$ 200000,00",
            cobranca: "Pix",
            status: "Pago",
        },
        {
            id: 5,
            tratamento: "Canal",
            paciente: "Gabriel Lucas Pereira Silva",
            valor: "R$ 200000,25",
            cobranca: "Dinheiro",
            status: "Pendente",
        },
        {
            id: 6,
            tratamento: "Canal",
            paciente: "Carlos Souza",
            valor: "R$ 900,00",
            cobranca: "Dinheiro",
            status: "Pago",
        },
        {
            id: 7,
            tratamento: "Canal",
            paciente: "Gabriel Lucas",
            valor: "R$ 200000,00",
            cobranca: "Pix",
            status: "Pago",
        },
        {
            id: 8,
            tratamento: "Canal",
            paciente: "Gabriel Lucas Pereira Silva",
            valor: "R$ 200000,25",
            cobranca: "Dinheiro",
            status: "Pendente",
        },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [modalPagamentoOpen, setmodalPagamentoOpen] = useState(false);
    // Filtra os dados pelo paciente que contenha o texto do searchTerm (ignore case)
    const filteredDados = dadosPlaceholder.filter((item) =>
        item.paciente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="entradasPageContainer">
            <div className="ent_header">
                <SearchInput
                    Label="Paciente: "
                    labelHorizontal={true}
                    onChange={(value) => setSearchTerm(value)}
                    value={searchTerm}
                />
                <GenericButton color="PRIMARY" title="Pagamento Fixo" />
            </div>

            <div className="ent_content">
                <div className="cards-container">
                    {filteredDados.length > 0 ? (
                        filteredDados.map((item) => (
                            <div
                                key={item.id}
                                className="card-item"
                                onClick={() => setmodalPagamentoOpen(true)}
                            >
                                <div className="card-header">
                                    <h3>{item.tratamento}</h3>
                                    <span
                                        className={`status ${item.status.toLowerCase()}`}
                                    >
                                        {item.status}
                                    </span>
                                </div>

                                <div className="card-body">
                                    <div className="paciente">
                                        <strong>Paciente:</strong>{" "}
                                        {item.paciente}
                                    </div>
                                    <div>
                                        <strong>Valor:</strong> {item.valor}
                                    </div>
                                    <div>
                                        <strong>Cobrança:</strong>{" "}
                                        {item.cobranca}
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
                isOpen={modalPagamentoOpen}
                onClose={() => setmodalPagamentoOpen(false)}
            >
                <p>Aqui vai o conteúdo do modal.</p>
                <button onClick={() => alert("Ação qualquer")}>
                    Fazer algo
                </button>
            </Modal>
        </div>
    );
}
