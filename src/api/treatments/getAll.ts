import { Treatment } from "lib/types";
import { API_URL } from "../connection";

export async function getAllTreatments(): Promise<Treatment[]> {
    try {
        const res = await fetch(`${API_URL}/treatment`);
        if (!res.ok) throw new Error("Erro ao buscar tratamentos");

        const data: Treatment[] = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar tratamentos:", error);
        return [];
    }
}
