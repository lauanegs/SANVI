import { useState } from "react";
import styles from "./GerenciarCobranca.module.css";

export function GerenciarCobranca() {
    const [paymentMethod, setPaymentMethod] = useState("Dinheiro");
    const [status, setStatus] = useState("pago");
    const [collections, setCollections] = useState("4");

    const totalCobranca = parseInt(collections) * 200;
    const totalPago = 500; // Esse valor pode vir de um estado se quiser depois
    const statusFormatado =
        status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {/* Left Section - Realizar pagamento */}
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
                                    setPaymentMethod(e.target.value)
                                }
                            >
                                <option value="Dinheiro">Dinheiro</option>
                                <option value="Cartão">Cartão</option>
                                <option value="PIX">PIX</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Valor</label>
                            <input
                                className={styles.input}
                                defaultValue="200,00"
                            />
                        </div>

                        <div className={styles.gridTwo}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Total pago
                                </label>
                                <div className={styles.totalPago}>
                                    R$ {totalPago.toFixed(2)}
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>
                                    Cobranças
                                </label>
                                <select
                                    className={styles.select}
                                    value={collections}
                                    onChange={(e) =>
                                        setCollections(e.target.value)
                                    }
                                >
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
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
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="pago">pago</option>
                                <option value="pendente">pendente</option>
                                <option value="cancelado">cancelado</option>
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

                {/* Middle Section - Detalhes do pagamento */}
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
                                João Santos
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Tratamento</label>
                            <div className={styles.detailValue}>
                                001/Desvinculado
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Parcelas</label>
                            <div className={styles.detailValue}>
                                {collections}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>
                                Total da cobrança
                            </label>
                            <div className={styles.detailValue}>
                                R$ {totalCobranca.toFixed(2)}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Total pago</label>
                            <div className={styles.detailValue}>
                                R$ {totalPago.toFixed(2)}
                            </div>
                        </div>

                        <div className={styles.detailItem}>
                            <label className={styles.label}>Status</label>
                            <div className={styles.detailValue}>
                                {statusFormatado}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Parcelas */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Parcelas</h2>
                    </div>
                    <div className={styles.cardContent}>
                        {/* Parcela 1 */}
                        <div
                            className={`${styles.parcela} ${styles.parcelaActive}`}
                        >
                            <div className={styles.parcelaTitle}>1 parcela</div>
                            <div className={styles.parcelaDetails}>
                                <div>Valor: R$200,00</div>
                                <div>Método de pagamento: {paymentMethod}</div>
                            </div>
                        </div>

                        {/* Parcela 2 */}
                        <div
                            className={`${styles.parcela} ${styles.parcelaActive}`}
                        >
                            <div className={styles.parcelaTitle}>2 parcela</div>
                            <div className={styles.parcelaDetails}>
                                <div>Valor: R$200,00</div>
                                <div>Método de pagamento: {paymentMethod}</div>
                            </div>
                        </div>

                        {/* Parcela 3 */}
                        <div
                            className={`${styles.parcela} ${styles.parcelaInactive}`}
                        >
                            <div className={styles.parcelaTitle}>3 parcela</div>
                            <div className={styles.parcelaDetails}>
                                <div>Valor: R$200,00</div>
                                <button>s</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GerenciarCobranca;
