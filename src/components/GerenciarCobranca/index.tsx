import { useState } from "react";
import styles from "./GerenciarCobranca.module.css";

import { PaymentEntry, PaymentMethod, PaymentStatus } from "lib/types";

interface GerenciarCobrancaProps {
    payment: PaymentEntry;
}

export function GerenciarCobranca({ payment }: GerenciarCobrancaProps) {
    const [paymentMethod, setPaymentMethod] = useState(payment.paymentMethod);
    const paymentOptions: { label: string; value: PaymentMethod }[] = [
        { label: "Dinheiro", value: "Dinheiro" },
        { label: "Cartão", value: "Cartão" },
        { label: "PIX", value: "PIX" },
    ];
    const [status, setStatus] = useState<PaymentStatus>(payment.status);
    const [installments, setInstallments] = useState<number>(
        payment.installments
    );

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
                            <label className={styles.label}>
                                Método de pagamento
                            </label>
                            <select
                                className={styles.select}
                                value={paymentMethod}
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value as PaymentMethod
                                    )
                                }
                            >
                                {paymentOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Valor</label>
                            <input
                                className={styles.input}
                                defaultValue={`R$ ${payment.value}`}
                                readOnly
                            />
                        </div>

                        <div className={styles.gridTwo}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Total pago
                                </label>
                                <div className={styles.totalPago}>
                                    R$ {payment.billingPaid.toFixed(2)}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Cobranças
                                </label>
                                <select
                                    className={styles.select}
                                    value={installments}
                                    onChange={(e) =>
                                        setInstallments(Number(e.target.value))
                                    } // Converte para número aqui
                                >
                                    <option value={4}>4</option>
                                    <option value={3}>3</option>
                                    <option value={2}>2</option>
                                    <option value={1}>1</option>
                                </select>
                            </div>
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

                {/* Seção do meio - Detalhes */}
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
                                {payment.patient.name}
                            </div>
                        </div>

                        {payment.treatment && (
                            <div className={styles.detailItem}>
                                <label className={styles.label}>
                                    Tratamento
                                </label>
                                <div className={styles.detailValue}>
                                    {payment.treatment.title}
                                </div>
                            </div>
                        )}

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Parcelas</label>
                            <div className={styles.detailValue}>4</div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>
                                Total da cobrança
                            </label>
                            <div className={styles.detailValue}>
                                R${" "}
                                {(
                                    payment.billingPaid + payment.billingLeft
                                ).toFixed(2)}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Total pago</label>
                            <div className={styles.detailValue}>
                                R$ {payment.billingPaid.toFixed(2)}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Status</label>
                            <div className={styles.detailValue}>
                                {payment.status}
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
                        {/* Exemplo de parcelas fictícias */}
                        {[1, 2, 3, 4].map((parcela) => (
                            <div
                                key={parcela}
                                className={`${styles.parcela} ${
                                    parcela <= 2
                                        ? styles.parcelaActive
                                        : styles.parcelaInactive
                                }`}
                            >
                                <div className={styles.parcelaTitle}>
                                    {parcela}ª parcela
                                </div>
                                <div className={styles.parcelaDetails}>
                                    <div>Valor: R$200,00</div>
                                    <div>
                                        Método de pagamento: {paymentMethod}
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
