import {
    CheckBox,
    CheckBoxWrapper,
    ColumnCenterRowWrapper,
    ColumnCenterWrapper,
    ColunmLeftWrapper,
    ColunmRightWrapper,
    ColunmsWrapper,
    Container,
    Form,
    FormContentWrapper,
    FormTitleRowWrapper,
    StyleWrapper,
    VariableRowWrapper,
    WrapperInput
} from "./styles";
import { GenericHeader } from "@components/GenericHeader";
import { Text } from "@components/Text";
import { useEffect, useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import Input from "@components/Input";
import { MenuHeader } from "@components/MenuHeader";
import { useAppStore } from "store/appStore";
import * as yup from 'yup';
import InputMask from "react-input-mask";
import { formatCpf, formatPhoneNumber, formatRg } from "utils/formatFunctions";
import { SelectInput } from "@components/SelectInput";
import { GenderEnum, MockGender } from "./types";

export function CadastroPaciente() {
    const isFullScreen = useAppStore().isFullScreen;
    const SIZE_TITLE = isFullScreen ? 14 : 12;
    const PADDING_TOP = isFullScreen ? 50 : 20;

    const data = useAppStore().selectedPatient;

    const [isAgeOfMajority, setIsAgeOfMajority] = useState(true);

    const [formState, setFormState] = useState({
        address: '',
        addressNumber: '',
        birthDate: '',
        cpf: '',
        createdAt: '',
        gender: '0',
        id: '',
        name: '',
        neighborhood: '',
        phoneNumber: '',
        profession: '',
        rg: '',
        updatedAt: '',
        cep: '',
        uf: '',
        guardianName: '',
        guardiancpf: '',
        guardianPhoneNumber: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [canBeOpenSelect, setCanBeOpenSelect] = useState(true);

    function handleSelectGender(gender: string) {
        const genderValue = GenderEnum[gender as keyof typeof GenderEnum];
        setFormState(prev => ({ ...prev, gender: genderValue }));
    }

    function handleOpenSelectOptions() {
        setCanBeOpenSelect(false);
        setTimeout(() => {
            setCanBeOpenSelect(true);
        }, 1000);
    }

    const handleCheckAgeOfMajority = () => {
        setIsAgeOfMajority(prev => !prev);
    };

    function formatDate(dateString: string) {
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}/${month}/${year}`;
    }

    const formSchema = yup.object().shape({
        name: yup.string().required('Informe o nome'),
        cpf: yup.string().required('Informe o CPF').min(11, 'CPF inválido'),
        adress: yup.string().required('Informe o endereço'),
        adressNumber: yup.string().required('Informe o número'),
        neighborhood: yup.string().required('Informe o bairro'),
        phoneNumber: yup.string().required('Informe o telefone').min(11, "Telefone inválido"),
        profession: yup.string().required('Informe a profissão'),
        rg: yup.string().required('Informe o RG').min(8, 'RG inválido'),
        cep: yup.string().required('Informe o CEP'),
        guardianName: isAgeOfMajority
            ? yup.string().notRequired()
            : yup.string().required('Informe o nome do responsável'),
        guardiancpf: isAgeOfMajority
            ? yup.string().notRequired()
            : yup.string().required('Informe o CPF do responsável').min(11, 'CPF inválido'),
        guardianPhoneNumber: isAgeOfMajority
            ? yup.string().notRequired()
            : yup.string().required('Informe o telefone do responsável').min(11, 'Telefone inválido')
    });

    async function handleSubmitForm() {
        const { birthDate, createdAt, updatedAt, gender, id, ...rest } = formState;

        try {
            await formSchema.validate({ ...rest, birthDate }, { abortEarly: false });
            setFormErrors({});
            console.log('Formulário válido:', formState);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errors: Record<string, string> = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setFormErrors(errors);
            }
        }
    }

    useEffect(() => {
        console.log('DATA ATUAL', data);
        if (!data) return;

        setFormState({
            address: data.address || '',
            addressNumber: `${data.addressNumber}` || '',
            birthDate: data.birthDate || '',
            cpf: data.cpf || '',
            createdAt: data.createdAt || '',
            gender: data.gender || '0',
            id: data.id != null ? `${data.id}` : '',
            name: data.name || '',
            neighborhood: data.neighborhood || '',
            phoneNumber: data.phoneNumber != null ? `${data.phoneNumber}` : '',
            profession: data.profession || '',
            rg: data.rg || '',
            updatedAt: data.updatedAt || '',
            cep: data.cep || '',
            uf: data.uf || '',
            guardianName: data.guardianName || '',
            guardiancpf: data.guardiancpf || '',
            guardianPhoneNumber: data.guardianPhoneNumber != null
                ? `${data.guardianPhoneNumber}`
                : ''
        });
    }, [data]);

    console.log("FORMSTATE", formState);

    return (
        <Container>
            <GenericHeader />
            <MenuHeader
                firstSubScreen="cadastroPaciente"
                secondSubScreen="jornadaPaciente"
                thirdSubScreen="prontuarioPaciente"
                buttonTitle="Salvar"
                onPressButton={handleSubmitForm}
            />

            <Form onScroll={handleOpenSelectOptions} style={{ paddingTop: PADDING_TOP }}>
                <FormContentWrapper>
                    <FormTitleRowWrapper>
                        <Text color="TERTIARY" size={SIZE_TITLE} text="Informações Gerais" />
                        <Text color="TERTIARY" size={SIZE_TITLE} text="Informações do Responsável" />
                        <CheckBoxWrapper>
                            <CheckBox onClick={handleCheckAgeOfMajority}>
                                {isAgeOfMajority ? (
                                    <Icon iconLibName="md" icon="MdCheckBox" color={theme.COLORS.AZUL_DA_FRANCA} size={15} />
                                ) : (
                                    <Icon iconLibName="md" icon="MdCheckBoxOutlineBlank" color={theme.COLORS.AZUL_DA_FRANCA} size={15} />
                                )}
                            </CheckBox>
                            <Text color="TERTIARY" size={SIZE_TITLE} text="Declaro que o Paciente é menor de idade" />
                        </CheckBoxWrapper>
                    </FormTitleRowWrapper>

                    <ColunmsWrapper>
                        <ColunmLeftWrapper>
                            {data?.id != null && (
                                <Input
                                    sizeType="G"
                                    placeholder="123456"
                                    label="ID Paciente"
                                    value={data.id.toString()}
                                    disabled
                                />
                            )}
                            <Input
                                sizeType="MG"
                                label="Data de registro"
                                value={formState.createdAt ? formatDate(formState.createdAt) : new Date().toLocaleDateString()}
                                disabled
                            />
                        </ColunmLeftWrapper>

                        <ColunmRightWrapper>
                            <Input
                                sizeType="G"
                                label="Nome completo"
                                placeholder="João Ribeiro dos Santos"
                                value={formState.name}
                                onChange={e =>
                                    setFormState(prev => ({ ...prev, name: e.target.value }))
                                }
                                errorMessage={formErrors.name}
                            />

                            <StyleWrapper>
                                <WrapperInput>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={formState.cpf}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, cpf: e.target.value }))
                                        }
                                        alwaysShowMask
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="M"
                                                label="CPF"
                                                {...inputProps}
                                                errorMessage={formErrors.cpf}
                                            />
                                        )}
                                    </InputMask>
                                </WrapperInput>

                                <WrapperInput style={{ marginLeft: '20%' }}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={formState.phoneNumber}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, phoneNumber: e.target.value }))
                                        }
                                        alwaysShowMask
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="P"
                                                label="Celular"
                                                {...inputProps}
                                                errorMessage={formErrors.phoneNumber}
                                            />
                                        )}
                                    </InputMask>
                                </WrapperInput>
                            </StyleWrapper>
                        </ColunmRightWrapper>
                    </ColunmsWrapper>

                    <FormTitleRowWrapper>
                        <Text color="TERTIARY" size={SIZE_TITLE} text="Informações do paciente" />
                    </FormTitleRowWrapper>

                    <ColumnCenterWrapper>
                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '60%' }}>
                                <Input
                                    sizeType="G"
                                    label="Nome completo"
                                    placeholder="João Ribeiro dos Santos"
                                    value={formState.name}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, name: e.target.value }))
                                    }
                                    errorMessage={formErrors.name}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '40%' }}>
                                <Input
                                    sizeType="MG"
                                    label="Profissão"
                                    placeholder="Professor"
                                    value={formState.profession}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, profession: e.target.value }))
                                    }
                                    errorMessage={formErrors.profession}
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '30%' }}>
                                <InputMask
                                    mask="999.999.999-99"
                                    value={formatCpf(formState.cpf)}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, cpf: e.target.value }))
                                    }
                                    alwaysShowMask
                                >
                                    {inputProps => (
                                        <Input
                                            sizeType="G"
                                            label="CPF"
                                            {...inputProps}
                                            errorMessage={formErrors.cpf}
                                        />
                                    )}
                                </InputMask>
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '70%' }}>
                                <Input
                                    sizeType="G"
                                    label="Logradouro"
                                    placeholder="Rua José de Santana"
                                    value={formState.address}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, adress: e.target.value }))
                                    }
                                    errorMessage={formErrors.adress}
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '40%' }}>
                                <InputMask
                                    mask="99-999-999"
                                    value={formatRg(formState.rg)}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, rg: e.target.value }))
                                    }
                                    alwaysShowMask
                                >
                                    {inputProps => (
                                        <Input
                                            sizeType="G"
                                            label="RG"
                                            {...inputProps}
                                            errorMessage={formErrors.rg}
                                        />
                                    )}
                                </InputMask>
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <Input
                                    sizeType="G"
                                    label="Bairro"
                                    placeholder="Belo Horizonte"
                                    value={formState.neighborhood}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, neighborhood: e.target.value }))
                                    }
                                    errorMessage={formErrors.neighborhood}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '15%' }}>
                                <Input
                                    sizeType="G"
                                    label="Número"
                                    placeholder="145"
                                    value={formState.addressNumber}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, adressNumber: e.target.value }))
                                    }
                                    errorMessage={formErrors.adressNumber}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <SelectInput
                                    elements={['MG', 'SP']}
                                    sizeType={'P'}
                                    canByOpen={canBeOpenSelect}
                                    label="UF"
                                    onSelectOption={value => setFormState(prev => ({ ...prev, uf: value }))}
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '30%' }}>
                                <Input
                                    sizeType="G"
                                    inputType="date"
                                    label="Data nascimento"
                                    value={formState.birthDate}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, birthDate: e.target.value }))
                                    }
                                    errorMessage={formErrors.birthDate}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '20%' }}>
                                <SelectInput
                                    elements={MockGender}
                                    sizeType={"G"}
                                    label="Sexo"
                                    canByOpen={canBeOpenSelect}
                                    onSelectOption={handleSelectGender}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <InputMask
                                    mask="99999-999"
                                    value={formState.cep}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, cep: e.target.value }))
                                    }
                                    alwaysShowMask
                                >
                                    {inputProps => (
                                        <Input
                                            sizeType="G"
                                            label="CEP"
                                            placeholder="38780000"
                                            {...inputProps}
                                            errorMessage={formErrors.cep}
                                        />
                                    )}
                                </InputMask>
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <InputMask
                                    mask="(99) 9999-9999"
                                    value={formatPhoneNumber(formState.phoneNumber)}
                                    onChange={e =>
                                        setFormState(prev => ({ ...prev, phoneNumber: e.target.value }))
                                    }
                                    alwaysShowMask
                                >
                                    {inputProps => (
                                        <Input
                                            sizeType="G"
                                            label="Celular"
                                            {...inputProps}
                                            errorMessage={formErrors.phoneNumber}
                                        />
                                    )}
                                </InputMask>
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        {/* ↓↓↓ Campos do Responsável ↓↓↓ */}
                        {!isAgeOfMajority && (
                            <ColumnCenterRowWrapper>
                                <VariableRowWrapper style={{ width: '60%' }}>
                                    <Input
                                        sizeType="G"
                                        label="Nome do Responsável"
                                        placeholder="Maria Silva"
                                        value={formState.guardianName}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, guardianName: e.target.value }))
                                        }
                                        errorMessage={formErrors.guardianName}
                                    />
                                </VariableRowWrapper>

                                <VariableRowWrapper style={{ width: '40%' }}>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={formState.guardiancpf}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, guardiancpf: e.target.value }))
                                        }
                                        alwaysShowMask
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="MG"
                                                label="CPF do Responsável"
                                                {...inputProps}
                                                errorMessage={formErrors.guardiancpf}
                                            />
                                        )}
                                    </InputMask>
                                </VariableRowWrapper>
                            </ColumnCenterRowWrapper>
                        )}

                        {!isAgeOfMajority && (
                            <ColumnCenterRowWrapper>
                                <VariableRowWrapper style={{ width: '40%' }}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={formState.guardianPhoneNumber}
                                        onChange={e =>
                                            setFormState(prev => ({ ...prev, guardianPhoneNumber: e.target.value }))
                                        }
                                        alwaysShowMask
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="G"
                                                label="Celular do Responsável"
                                                {...inputProps}
                                                errorMessage={formErrors.guardianPhoneNumber}
                                            />
                                        )}
                                    </InputMask>
                                </VariableRowWrapper>
                            </ColumnCenterRowWrapper>
                        )}
                        {/* ↑↑↑ Fim Campos do Responsável ↑↑↑ */}
                    </ColumnCenterWrapper>
                </FormContentWrapper>
            </Form>
        </Container>
    );
}
