import { API_URL } from "@api/connection";
import { JourneyInterface, JourneyInterfaceDTO, JourneyInterfacePutDTO, MedicalRecordInterfaceDTO, MedicalRecordInterfacePutDTO, PatientInterface, PatientInterfaceDTO, PatientInterfacePutDTO, SpecialistInterface, TreatmentInterface, TreatmentInterfaceDTO } from "./types";

export async function findPatient(): Promise<PatientInterface[]> {
    try {
        const response = await fetch(`${API_URL}/patient`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function findSpecialist(): Promise<SpecialistInterface[]> {
    try {
        const response = await fetch(`${API_URL}/specialist`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function findTreatmentsByPatientId(patientId: number): Promise<TreatmentInterface[]> {
    try {
        const response = await fetch(`${API_URL}/patient/treatment/${patientId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function findJourneyEventByTreatmentId(treatmentId: number): Promise<JourneyInterface[]> {
    try {
        const response = await fetch(`${API_URL}/journey/treatment/${treatmentId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${response.statusText}`)
        }

        const data = await response.json();
        
        return data;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function editPatient(patient: PatientInterfacePutDTO): Promise<any> {
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

export async function editMedicalRecord(medicalRecord: MedicalRecordInterfacePutDTO): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/patient/medical-record`, {
            method: "PUT",
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

export async function persistPatient(patient: PatientInterfaceDTO): Promise<{ok: boolean, patient: PatientInterface}> {
    try {
        const response = await fetch(`${API_URL}/patient/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        })

        const ok = response.ok;
        const patientRes: PatientInterface = await response.json();
        return {
            ok: ok,
            patient: patientRes
        }
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function persistTreatment(treatment: TreatmentInterfaceDTO): Promise<any> {
    try {
        const response = await fetch(`${API_URL}/treatment/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(treatment)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function persistJourneyEvent(event: JourneyInterfaceDTO){
    try {
        const response = await fetch(`${API_URL}/journey/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function editJourneyEvent(event: JourneyInterfacePutDTO){
    try {
        const response = await fetch(`${API_URL}/journey`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event)
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}

export async function deleteJourneyEvent(eventId: number){
    try {
        const response = await fetch(`${API_URL}/journey/${eventId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        })

        return response;
    } catch (error) {
        throw new Error(`Erro ${error}`);
    }
}