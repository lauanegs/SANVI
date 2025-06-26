import { PaymentEntry } from "lib/types";
import { API_URL } from "../connection";

export async function getPaymentsByTreatmentId(
    treatmentId: number
): Promise<PaymentEntry[]> {
    try {
        const res = await fetch(`${API_URL}/treatment/${treatmentId}/payments`);
        if (!res.ok) throw new Error("Erro ao buscar pagamentos do tratamento");

        const data: PaymentEntry[] = await res.json();
        return data;
    } catch (error) {
        console.error(
            `Erro ao buscar pagamentos do tratamento ${treatmentId}:`,
            error
        );
        return [];
    }
}
