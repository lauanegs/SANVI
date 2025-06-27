
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
    medicalRecord: MedicalRecordInterface,
    treatments: Array<any>
}

export interface MedicalRecordInterface {
    createdAt: Date,
    updatedAt: Date | null,
    id: number,
    hasHealthProblem: boolean,
    data: MedicalRecordDataInterface,
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

export interface MedicalRecordInterfaceDTO {
    isPregnant: boolean,
    hasHealthProblem: boolean,
    hasMedicalTreatment: boolean,
    medicalRecordData: MedicalRecordDataInterface,
    createdAt: Date,
    updatedAt: Date | null,
}
export interface MedicalRecordInterfacePutDTO {
    patientId: number,
    isPregnant: boolean,
    hasHealthProblem: boolean,
    hasMedicalTreatment: boolean,
    medicalRecordData: MedicalRecordDataInterface,
    updatedAt: Date | null,
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
    medicalRecord: MedicalRecordInterfaceDTO,
    treatments: Array<any>
}
export interface PatientInterfacePutDTO {
    name: string,
    address: string,
    id: number,
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
    medicalRecord: MedicalRecordInterfacePutDTO,
}

export interface TreatmentInterface {
    id: number,
    endedAt: string,
    startedAt: string,
    title: string,
    patientId: number,
}
export interface TreatmentInterfaceDTO {
    endedAt: string | null,
    startedAt: string,
    title: string,
    patientId: number
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


