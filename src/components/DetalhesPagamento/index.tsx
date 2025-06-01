import { useState } from "react";
import { Patient, Treatment } from "lib/types";
import classNames from "./DetalhesPagamento.module.css";

// Supondo que você ainda vai passar pacientes e tratamentos disponíveis como props
interface DetalhesPagamentoProps {
    patients: Patient[];
    treatments: Treatment[];
    onGenerate: (data: {
        patient: Patient;
        treatment: Treatment;
        value: number;
        installments: number;
    }) => void;
}

export function DetalhesPagamento({
    patients,
    treatments,
    onGenerate,
}: DetalhesPagamentoProps) {
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(
        null
    );
    const [selectedTreatment, setSelectedTreatment] =
        useState<Treatment | null>(null);
    const [totalValue, setTotalValue] = useState<number | undefined>(undefined);
    const [installments, setInstallments] = useState("1");

    const handleGenerate = () => {
        if (!selectedPatient || !selectedTreatment || !totalValue) {
            alert("Preencha todos os campos!");
            return;
        }

        onGenerate({
            patient: selectedPatient,
            treatment: selectedTreatment,
            value: totalValue,
            installments: parseInt(installments),
        });
    };

    return (
        <div className={classNames.container}>
            <div className={classNames.card}>
                <div className={classNames.header}>
                    <h2 className={classNames.title}>Novo pagamento</h2>
                </div>

                <div className={classNames.content}>
                    <div className={classNames.formGroup}>
                        <label className={classNames.label}>Paciente</label>
                        <select
                            className={classNames.select}
                            value={selectedPatient?.id ?? ""}
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                const found = patients.find((p) => p.id === id);
                                setSelectedPatient(found ?? null);
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

                    <div className={classNames.formGroup}>
                        <label className={classNames.label}>Tratamento</label>
                        <select
                            className={classNames.select}
                            value={selectedTreatment?.id ?? ""}
                            onChange={(e) => {
                                const id = parseInt(e.target.value);
                                const found = treatments.find(
                                    (t) => t.id === id
                                );
                                setSelectedTreatment(found ?? null);
                            }}
                        >
                            <option value="">Selecione um tratamento</option>
                            {treatments.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={classNames.formGroup}>
                        <label className={classNames.label}>
                            Valor Total (R$)
                        </label>
                        <input
                            type="number"
                            className={classNames.input}
                            value={totalValue}
                            // onChange={(e) =>
                            //     setTotalValue(parseFloat(e.target.value) || 0)
                            // }
                            onChange={(e) =>
                                setTotalValue(
                                    e.target.value === ""
                                        ? undefined
                                        : Number(e.target.value)
                                )
                            }
                            placeholder="Ex: 2000"
                            min="0"
                            step="10.0"
                        />
                    </div>

                    <div className={classNames.formGroup}>
                        <label className={classNames.label}>Parcelas</label>
                        <select
                            className={classNames.select}
                            value={installments}
                            onChange={(e) => setInstallments(e.target.value)}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="12">12</option>
                        </select>
                    </div>

                    <button
                        className={classNames.button}
                        onClick={handleGenerate}
                    >
                        Gerar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DetalhesPagamento;
