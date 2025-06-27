import { Specialist } from "lib/types";
import { API_URL } from "../connection";

export async function getAllSpecialists(): Promise<Specialist[]> {
	try {
		const res = await fetch(`${API_URL}/specialist`);

		if (!res.ok) throw new Error("Erro ao buscar especialistas");

		const data = await res.json();
		console.log("re", data);

		return data;
	} catch (error) {
		console.error("Erro ao buscar especialistas:", error);
		return [];
	}
}
