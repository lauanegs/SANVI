
export interface PatientInterface {
    name: string,
    address: string,
    addressNumber: number,
    birthDate: string,
    cpf: string,
    gender: string,
    id: number,
    neighborhood: string,
    phoneNumber: number,
    rg: string,
    updatedAt: string | null,
    createdAt: string,
    profession: string,
    cep: string,
    uf: string,
    guardianCPF: string | null,
    guardianName: string | null,
    guardianPhoneNumber: number | null,
    medicalRecord: MedicalRecordInterface | null,
    treatments: Array<any>
}

export interface MedicalRecordInterface {
    createdAt: Date,
    updatedAt: Date | null,
    id: number,
    hasHealthProblem: boolean,
    hasMedicalTreatment: boolean,
    isPregnant: boolean
    medicalRecordData: MedicalRecordDataInterface
}

export interface MedicalRecordDataInterface {
    diseaseHistory: string,
    mainComplaint: string,
    medicalTreatment: string,
    pastMedicalHistory: string,
    healthProblem: string,
    familyMedicalHistory: string
}

export interface PatientInterfaceDTO {
    name: string,
    address: string,
    addressNumber: number,
    birthDate: string,
    cpf: string,
    gender: string,
    neighborhood: string,
    phoneNumber: number,
    rg: string,
    updatedAt: string | null,
    createdAt: string,
    profession: string,
    cep: string,
    uf: string,
    guardianCPF: string | null,
    guardianName: string | null,
    guardianPhoneNumber: number | null,
    medicalRecord: MedicalRecordInterface | null,
    treatments: Array<any>
}

export interface TreatmentInterface {
    id: number,
    endedAt: string,
    startedAt: string,
    title: string,
    patientId: number,
    events: any[],
}
export interface TreatmentInterfaceDTO {
    endedAt: string | null,
    startedAt: string,
    title: string,
    patient: PatientInterface
}

export interface MedicalRecordDataInterfaceDTO {
    patientId: number;
    isPregnant: boolean,
    hasHealthProblem: boolean,
    hasMedicalTreatment: boolean,
    data: MedicalRecordDataInterface
}

export interface SpecialistInterface {
    id: number,
    name: string
}

export interface JourneyInterface {
    id: number,
    description: string,
    date: string,
    specialist: { id: number, name: string }
}
export interface JourneyInterfaceDTO {
    description: string,
    date: string,
    specialistId: number,
    treatmentId: number
}
export interface JourneyInterfacePutDTO {
    id: number,
    description: string,
    date: string,
    specialistId: number,
    treatmentId: number
}


