import { MedicalRecordInterface } from "@api/patient/types";

export type PatientFormTypes = {
    name: string,
    cpf: string,
    adress: string,
    adressNumber: number,
    birthDate: string,
    gender: number,
    neighborhood: string,
    phoneNumber: number,
    rg: string,
}

export type FormStateType = {
    address: string;
    addressNumber: string;
    birthDate: Date;
    cpf: string;
    createdAt: Date;
    gender: string;
    id: string;
    name: string;
    neighborhood: string;
    phoneNumber: string;
    profession: string;
    rg: string;
    cep: string;
    uf: string;
    guardianName: string | null;
    guardianCPF: string | null;
    guardianPhoneNumber: string | null;
    medicalRecord: {
        createdAt: Date;
        updatedAt: Date | null;
        id: string; 
        hasHealthProblem: boolean;
        hasMedicalTreatment: boolean;
        isPregnant: boolean;
        medicalRecordData: {
            diseaseHistory: string;
            mainComplaint: string;
            medicalTreatment: string;
            pastMedicalHistory: string;
            healthProblem: string;
            familyMedicalHistory: string;
        };
    };
};


export const mockStateAbbreviations: string[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export enum StateEnum {
    AC = "AC",
    AL = "AL",
    AP = "AP",
    AM = "AM",
    BA = "BA",
    CE = "CE",
    DF = "DF",
    ES = "ES",
    GO = "GO",
    MA = "MA",
    MT = "MT",
    MS = "MS",
    MG = "MG",
    PA = "PA",
    PB = "PB",
    PR = "PR",
    PE = "PE",
    PI = "PI",
    RJ = "RJ",
    RN = "RN",
    RS = "RS",
    RO = "RO",
    RR = "RR",
    SC = "SC",
    SP = "SP",
    SE = "SE",
    TO = "TO"
}

export const mockGender = [
    'Masculino',
    'Feminino'
]

export enum GenderEnumPost {
    Masculino = "H",
    Feminino = "M"
}

export enum GenderEnum {
    H = "Masculino",
    M = "Feminino"
}