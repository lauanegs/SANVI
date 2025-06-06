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

export const MockUf = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO"
];


export const MockGender = [
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

export type FormStateType = {
        address: string,
        addressNumber: string,
        birthDate: Date,
        cpf: string,
        createdAt: Date,
        gender: string,
        id: string,
        name: string,
        neighborhood: string,
        phoneNumber: string,
        profession: string,
        rg: string,
        cep: string,
        uf: string,
        guardianName: string | null,
        guardianCPF: string | null,
        guardianPhoneNumber: string | null
}