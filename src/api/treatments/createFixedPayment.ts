import { TreatmentDTO } from "./getAll";
import { API_URL } from "../connection";

export async function createFixedPayment(
	treatment: TreatmentDTO
): Promise<boolean> {
	console.log("createFixedPayment", treatment);
	try {
		const response = await fetch(`${API_URL}/treatment/fixed`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(treatment),
		});

		if (!response.ok) {
			throw new Error("Erro ao salvar tratamento com pagamentos");
		}

		return true;
	} catch (error) {
		console.error("Erro ao criar tratamento fixo:", error);
		return false;
	}
}
