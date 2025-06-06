export type FormStateTypeMedicalRecord = {
    createdAt: Date,
    updatedAt: Date,
    id: string,
    hasHealthProblem: boolean,
    hasMedicalTreatment: boolean,
    isPregnant: boolean
    medicalRecordData: MedicalRecordDataType
}

export type MedicalRecordDataType = {
    diseaseHistory: string,
    mainComplaint: string,
    medicalTreatment: string,
    pastMedicalHistory: string,
    healthProblem: string,
    familyMedicalHistory: string
}