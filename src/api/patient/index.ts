import { API_URL } from "@api/connection";
import { PatientInterface } from "./types";

export async function findPatient(): Promise<PatientInterface[]> {
    const response = await fetch(`${API_URL}/patient`);

    if(!response.ok){
        throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json();
    console.log("data", data);

    return data;
}

export async function findPatientById(id: number){
    try {
        const patient = await fetch(`${API_URL}/patient/${id}`);

        const data: PatientInterface = await patient.json();
        return data;
    } catch (error) {
        
    }
}