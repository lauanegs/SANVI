export function formatCpf(cpf: string){
    return cpf.replace(/\D/, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatRg(rg: string){
    return rg.replace(/\D/, '').replace(/(\d{2})(\d{3})(\d{3})/, '$1-$2.$3');
}

export function formatPhoneNumber(phonenumber: string){
    if(phonenumber.length === 10)
        return phonenumber.replace(/\D/, '').replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    else
        return phonenumber.replace(/\D/, '').replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
}