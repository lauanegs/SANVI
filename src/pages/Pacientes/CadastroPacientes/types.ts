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

export type StateOptionType = {
    readonly value: string;
    readonly label: string;
};

export type FormStateType = {
    address: string;
    addressNumber: string;
    birthDate: Date;
    cpf: string;
    createdAt: Date;
    gender: string; // você usou "0", então presumo string
    id: string;
    name: string;
    neighborhood: string;
    phoneNumber: string;
    profession: string;
    rg: string;
    cep: string;
    uf: StateOptionType;
    guardianName: string | null;
    guardianCPF: string | null;
    guardianPhoneNumber: string | null;
};

export const StateOptions: readonly StateOptionType[] = [
    { value: "AC", label: "AC" },
    { value: "AL", label: "AL" },
    { value: "AP", label: "AP" },
    { value: "AM", label: "AM" },
    { value: "BA", label: "BA" },
    { value: "CE", label: "CE" },
    { value: "DF", label: "DF" },
    { value: "ES", label: "ES" },
    { value: "GO", label: "GO" },
    { value: "MA", label: "MA" },
    { value: "MT", label: "MT" },
    { value: "MS", label: "MS" },
    { value: "MG", label: "MG" },
    { value: "PA", label: "PA" },
    { value: "PB", label: "PB" },
    { value: "PR", label: "PR" },
    { value: "PE", label: "PE" },
    { value: "PI", label: "PI" },
    { value: "RJ", label: "RJ" },
    { value: "RN", label: "RN" },
    { value: "RS", label: "RS" },
    { value: "RO", label: "RO" },
    { value: "RR", label: "RR" },
    { value: "SC", label: "SC" },
    { value: "SP", label: "SP" },
    { value: "SE", label: "SE" },
    { value: "TO", label: "TO" }
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