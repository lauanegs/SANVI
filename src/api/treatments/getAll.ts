import { Treatment } from "lib/types";
import { API_URL } from "../connection";
import { TreatmentInterface } from "@api/patient/types";

export async function getAllTreatments() {
    try {
        const res = await fetch(`${API_URL}/treatment/dto`);
        console.log(res);
        if (!res.ok) throw new Error("Erro ao buscar tratamentos");

        const data: Treatment[] = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Erro ao buscar tratamentos:", error);
        return [];
    }
}
