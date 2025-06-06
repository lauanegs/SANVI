import { API_URL } from "@api/connection";
import { MedicalRecordDataInterfaceDTO, PatientInterface, PatientInterfaceDTO } from "./types";

export async function findPatient(): Promise<PatientInterface[]> {
    try {
        const response = await fetch(`${API_URL}/patient`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        console.log("DATA AAA", data)
        return data;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }

}

export async function editPatient(patient: PatientInterface): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/patient`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function persistPatient(patient: PatientInterfaceDTO): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/patient/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function persistMedicalRecord(medicalRecord: MedicalRecordDataInterfaceDTO){
    try {
        const response = await fetch(`${API_URL}/patient/medical_record`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicalRecord)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}



export async function findPatientById(id: number) {
    try {
        const patient = await fetch(`${API_URL}/patient/${id}`);

        const data: PatientInterface = await patient.json();
        return data;
    } catch (error) {

    }
}