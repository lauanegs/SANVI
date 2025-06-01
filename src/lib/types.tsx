export type Gender = "MASC" | "FEM";

export interface Person {
    id?: number;
    name: string;
    CPF: string;
    birthDate: Date; // ou Date
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
    Dentista = "Dentista",
    ASB = "ASB",
    Funcionario = "Funcionário",
}

export interface Specialist extends Person {
    specialistType: SpecialistType;
}

export interface Treatment {
    id?: number;
    title: string;
    startedAt: Date; // ou Date, dependendo de como for usado no frontend
    endedAt?: Date; // ou Date, e opcional (nullable em Java)
    patients: Patient[];
    paymentEntries: PaymentEntry[];
    events: JourneyEvent[];
}

export type PaymentStatus = "PENDENTE" | "PAGO";

export type PaymentMethod = "Dinheiro" | "Cartão" | "PIX";

export interface PaymentEntry {
    id?: number;
    patient: Patient;
    value: number; // Agora é number
    status: PaymentStatus;
    treatment?: Treatment;
    billingPaid: number;
    billingLeft: number;
    paymentMethod: PaymentMethod;
    installments: number; // ← Número de parcelas
}

export interface JourneyEvent {
    id?: number;
    date: string; // LocalDate pode ser representado como string no formato ISO (ex: "2025-05-31")
    description: string;
    specialist: Specialist[];
    treatment: Treatment;
}
