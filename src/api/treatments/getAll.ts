import { PaymentStatus, Treatment } from "lib/types";
import { API_URL } from "../connection";
import { TreatmentInterface } from "@api/patient/types";

export interface PaymentEntryDTO {
	id: number;
	value: number;
	installmentNumber: number;
	dueDate: string; // ISO 8601 string, exemplo: '2025-06-25'
	paymentDate?: string; // pode ser null ou undefined se ainda não pago
}

export interface PatientDTO {
	id: number;
	name: string;
	cpf: string;
	birthDate: string;
	phoneNumber: string;
	address: string;
	addressNumber: string;
	neighborhood: string;
	gender: "MALE" | "FEMALE" | "OTHER"; // Ajuste conforme enum
	rg: string;
	profession: string;
}

export interface TreatmentDTO {
	id: number;
	title: string;
	startedAt: string;
	endedAt: string;
	totalValue: number;
	amountPaid: number;
	paymentStatus: PaymentStatus;
	totalInstallments: number;
	paymentEntries: PaymentEntryDTO[];
	patient: PatientDTO;
	overdue: boolean;
}

export async function getAllTreatments() {
	try {
		const res = await fetch(`${API_URL}/treatment/dto`);
		console.log("res: ", res);
		if (!res.ok) throw new Error("Erro ao buscar tratamentos");

		const data: TreatmentDTO[] = await res.json();
		console.log("data: ", data);
		return data;
	} catch (error) {
		console.error("Erro ao buscar tratamentos:", error);
		return [];
	}
}
