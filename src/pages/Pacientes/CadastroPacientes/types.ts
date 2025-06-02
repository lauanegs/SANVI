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

export enum GenderEnum {
    Masculino="0",
    Feminino="1"
}

export const MockGender = [
    'Masculino',
    'Feminino'
]