import { API_URL } from "../connection";
export async function payPaymentEntryById(
	id: number,
	date: string
): Promise<boolean> {
	try {
		const res = await fetch(`${API_URL}/payments/${id}/pay?date=${date}`, {
			method: "PUT",
		});

		if (!res.ok) throw new Error("Erro ao pagar a parcela");

		return true;
	} catch (error) {
		console.error(`Erro ao pagar parcela ${id}:`, error);
		return false;
	}
}
