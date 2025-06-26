export type Gender = "H" | "M";

export interface Person {
    id?: number;
    name: string;
    CPF: string;
    birthDate: Date;
    phoneNumber: number;
    address: string;
    addressNumber: number;
    neighborhood: string;
    gender: Gender;
    rg: string;
}

export interface Patient extends Person {
    profession: string;
    treatments?: Treatment[];
}

export enum SpecialistType {
    DENTISTA = "Dentista",
    ASB = "ASB",
    FUNCIONARIO = "Funcionário",
}

export interface Specialist extends Person {
    specialistType: SpecialistType;
}

export interface Treatment {
    id: number;
    title: string;
    startedAt: Date;
    endedAt?: Date;
    patient: Patient;
    paymentEntries: PaymentEntry[];
    events: JourneyEvent[];
}

export type PaymentStatus = "Pendente" | "Pago" | "Parcial" | "Atrasado";

export type PaymentMethod = "Dinheiro" | "Cartão" | "PIX";

// export interface PaymentEntry {
//     id?: number; // Opcional, pois pode ser gerado pelo backend
//     patient: Patient;
//     value: number; // BigDecimal -> number
//     status: PaymentStatus;
//     treatment?: Treatment | null;
//     billingPaid: number;
//     billingLeft: number;
// }

export interface PaymentEntry {
    id: number | undefined;
    billingLeft: number;
    billingPaid: number;
    status: PaymentStatus;
    value: number;
    patientId: number;
    treatmentId: number;
}

export interface JourneyEvent {
    id?: number;
    date: string; // LocalDate pode ser representado como string no formato ISO (ex: "2025-05-31")
    description: string;
    specialist: Specialist[];
    treatment: Treatment;
}
