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
import { useEffect, useRef, useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import Input from "@components/Input";
import { MenuHeader } from "@components/MenuHeader";
import { useAppStore } from "store/appStore";
import * as yup from 'yup';
import InputMask from "react-input-mask";
import { formatCpf, formatPhoneNumber, formatRg } from "utils/formatFunctions";
import { SelectInput } from "@components/SelectInput";
import { FormStateType, GenderEnum, GenderEnumPost, MockGender, MockUf } from "./types";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ptBR } from 'date-fns/locale';
import { editPatient, persistPatient } from "@api/patient";
import toast from "react-hot-toast";

registerLocale("ptBR", ptBR);

export function CadastroPaciente() {
    const isFullScreen = useAppStore().isFullScreen;
    const SIZE_TITLE = isFullScreen ? 14 : 12;
    const PADDING_TOP = isFullScreen ? 50 : 20;

    const store = useAppStore();
    const data = store.selectedPatient;

    const [isMinor, setIsMinor] = useState(false);
    const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);

    const isNewRegistration = Object.keys(data).length < 1;

    const [formState, setFormState] = useState<FormStateType>({
        address: '',
        addressNumber: '',
        birthDate: new Date(),
        cpf: '',
        createdAt: new Date(),
        gender: '0',
        id: '',
        name: '',
        neighborhood: '',
        phoneNumber: '',
        profession: '',
        rg: '',
        cep: '',
        uf: '',
        guardianName: null,
        guardianCPF: null,
        guardianPhoneNumber: null
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [canBeOpenSelect, setCanBeOpenSelect] = useState(true);
    const [hasChanges, setHasChanges] = useState(true);

    const formRef = useRef<HTMLDivElement>(null);

    function handleSelectGender(gender: string) {
        setFormState(prev => ({ ...prev, gender: gender }));
    }

    console.log("GENDER", formState.gender);

    function handleOpenSelectOptions() {
        setCanBeOpenSelect(false);
        setTimeout(() => {
            setCanBeOpenSelect(true);
        }, 1000);
    }

    const handleCheckAgeOfMajority = () => {
        setIsMinor(prev => !prev);
    };

    const formSchema = yup.object().shape({
        name: yup.string().required('Informe o nome'),
        cpf: yup.string().required('Informe o CPF').length(11, 'CPF inválido'),
        address: yup.string().required('Informe o endereço'),
        addressNumber: yup.string().required('Informe o número'),
        neighborhood: yup.string().required('Informe o bairro'),
        phoneNumber: yup.string().required('Informe o telefone')
            .transform(value => value.replace(/[^\d]/g, ''))
            .length(11, "Telefone inválido"),
        profession: yup.string().required('Informe a profissão'),
        rg: yup.string()
            .transform(value => value.replace(/[^\d]/g, ''))
            .required('Informe o RG').length(8, 'RG inválido'),
        cep: yup.string().required('Informe o CEP')
            .transform(value => value.replace(/[^\d]/g, ''))
            .length(8, "CEP inválido"),
        guardianName: isMinor
            ? yup.string().required('Informe o nome do responsável')
            : yup.string().notRequired(),
        guardianCPF: isMinor
            ? yup.string().required('Informe o CPF do responsável').length(11, 'CPF inválido')
            : yup.string().notRequired(),
        guardianPhoneNumber: isMinor
            ? yup.string().required('Informe o telefone do responsável').length(11, 'Telefone inválido')
            : yup.string().notRequired()
    });

    async function handleSubmitForm() {
        const { birthDate, createdAt, gender, id, uf, ...fields } = formState;

        try {
            await formSchema.validate({ ...fields }, { abortEarly: false });
            setFormErrors({});

            console.log('Formulário válido:', formState);

            if (isNewRegistration) {
                const response = await persistPatient({
                    address: formState.address,
                    addressNumber: Number(formState.addressNumber),
                    birthDate: formState.birthDate.toISOString(),
                    cep: formState.cep,
                    cpf: formState.cpf,
                    createdAt: formState.createdAt.toISOString(),
                    gender: GenderEnumPost[formState.gender as keyof typeof GenderEnumPost],
                    guardianCPF: formState.guardianCPF,
                    guardianName: formState.guardianName,
                    guardianPhoneNumber: typeof formState.guardianPhoneNumber === "string" ? Number(formState.guardianPhoneNumber) : null,
                    medicalRecord: data.medicalRecord,
                    name: formState.name,
                    neighborhood: formState.neighborhood,
                    phoneNumber: Number(formState.phoneNumber),
                    profession: formState.profession,
                    rg: formState.rg,
                    treatments: data.treatments,
                    uf: formState.uf,
                    updatedAt: new Date().toISOString()
                });

                store.setIsValidPatientCache(false);

                if (response.ok) {
                    toast.success("Paciente criado com sucesso!", {
                        position: "bottom-right",
                        duration: 2000
                    })
                }

                if (!response.ok) {
                    toast.error("Não foi possível criar o paciente", {
                        position: "bottom-right",
                        duration: 2000
                    })
                }

            } else {
                const response = await editPatient({
                    address: formState.address,
                    addressNumber: Number(formState.addressNumber),
                    birthDate: formState.birthDate.toISOString(),
                    cep: formState.cep,
                    cpf: formState.cpf,
                    createdAt: formState.createdAt.toISOString(),
                    gender: GenderEnumPost[formState.gender as keyof typeof GenderEnumPost],
                    guardianCPF: formState.guardianCPF,
                    guardianName: formState.guardianName,
                    guardianPhoneNumber: typeof formState.guardianPhoneNumber === "string" ? Number(formState.guardianPhoneNumber) : null,
                    id: Number(formState.id),
                    medicalRecord: data.medicalRecord,
                    name: formState.name,
                    neighborhood: formState.neighborhood,
                    phoneNumber: Number(formState.phoneNumber),
                    profession: formState.profession,
                    rg: formState.rg,
                    treatments: data.treatments,
                    uf: formState.uf,
                    updatedAt: new Date().toISOString()
                });

                store.setIsValidPatientCache(false);

                if (response.ok) {
                    toast.success("Paciente editado com sucesso!", {
                        position: "bottom-right",
                        duration: 2000
                    })
                }

                if (!response.ok) {
                    toast.error("Não foi possivel editar", {
                        position: "bottom-right",
                        duration: 2000
                    })
                }
            }

        } catch (error) {
            if (error instanceof yup.ValidationError) {
                const errors: Record<string, string> = {};
                error.inner.forEach(err => {
                    if (err.path) {
                        errors[err.path] = err.message;
                    }
                });
                setFormErrors(errors);
                return;
            }

            console.log("ERRO persistMedicalRecord", error);
            toast.error("Erro desconhecido", {
                position: "bottom-right",
                duration: 2000
            })
        }
    }

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;

        let scrollTarget = 0;
        let currentScroll = 0;
        let isScrolling = false;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault(); // impede scroll nativo
            scrollTarget += e.deltaY * 0.5; // ← reduz sensibilidade (0.5 == 50%)
            scrollTarget = Math.max(0, Math.min(scrollTarget, form.scrollHeight));

            if (!isScrolling) {
                isScrolling = true;
                smoothScroll();
            }
        };

        const smoothScroll = () => {
            currentScroll += (scrollTarget - currentScroll) * 0.1; // velocidade de aproximação
            form.scrollTop = currentScroll;

            if (Math.abs(scrollTarget - currentScroll) > 0.5) {
                requestAnimationFrame(smoothScroll);
            } else {
                isScrolling = false;
            }
        };

        form.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            form.removeEventListener("wheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        if (!data) return;

        setFormState({
            address: data.address ? data.address : '',
            addressNumber: data.addressNumber ? data.addressNumber.toString() : '',
            birthDate: data.birthDate ? new Date(data.birthDate) : new Date(),
            cpf: data.cpf ? data.cpf : '',
            createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
            gender: data.gender ? data.gender : '',
            id: data.id ? data.id.toString() : '',
            name: data.name ? data.name : '',
            neighborhood: data.neighborhood ? data.neighborhood : '',
            phoneNumber: data.phoneNumber ? data.phoneNumber.toString() : '',
            profession: data.profession ? data.profession : '',
            rg: data.rg ? data.rg : '',
            cep: data.cep ? data.cep : '',
            uf: data.uf ? data.uf : '',
            guardianName: data.guardianName ? data.guardianName : '',
            guardianCPF: data.guardianCPF ? data.guardianCPF : '',
            guardianPhoneNumber: data.guardianPhoneNumber ? data.guardianPhoneNumber.toString() : '',
        });

        if (data.guardianName && data.guardianName.length > 0) {
            setIsMinor(true);
        }
    }, [data]);

    useEffect(() => {
        if (isMinor === false) {
            setFormState(prev => ({
                ...prev, guardianCPF: "", guardianName: "", guardianPhoneNumber: ""
            }));
        }

        if (isMinor && data.guardianName && data.guardianPhoneNumber && data.guardianCPF) {
            setFormState(prev => ({
                ...prev, guardianCPF: data.guardianCPF || "", guardianName: data.guardianName || "", guardianPhoneNumber: data.guardianPhoneNumber?.toString() || ""
            }));
        }
    }, [isMinor])

    useEffect(() => {
        if (data && !isNewRegistration) {
            const dataObj = {
                address: data.address ? data.address : '',
                addressNumber: data.addressNumber ? data.addressNumber.toString() : '',
                birthDate: data.birthDate ? new Date(data.birthDate) : new Date(),
                cpf: data.cpf ? data.cpf : '',
                createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
                gender: data.gender ? data.gender : '',
                id: data.id ? data.id.toString() : '',
                name: data.name ? data.name : '',
                neighborhood: data.neighborhood ? data.neighborhood : '',
                phoneNumber: data.phoneNumber ? data.phoneNumber.toString() : '',
                profession: data.profession ? data.profession : '',
                rg: data.rg ? data.rg : '',
                cep: data.cep ? data.cep : '',
                uf: data.uf ? data.uf : '',
                guardianName: data.guardianName ? data.guardianName : '',
                guardianCPF: data.guardianCPF ? data.guardianCPF : '',
                guardianPhoneNumber: data.guardianPhoneNumber ? data.guardianPhoneNumber.toString() : '',
            }

            const isNoChanges = JSON.stringify(dataObj) === JSON.stringify(formState);
            setHasChanges(!isNoChanges);
        }
    }, [formState])

    return (
        <Container>
            <GenericHeader />
            <MenuHeader
                firstSubScreen="cadastroPaciente"
                secondSubScreen="jornadaPaciente"
                thirdSubScreen="prontuarioPaciente"
                buttonTitle="Salvar"
                onPressButton={handleSubmitForm}
                buttonDisabled={!hasChanges}
            />

            <Form onScroll={handleOpenSelectOptions} style={{ paddingTop: PADDING_TOP }} ref={formRef}>
                <FormContentWrapper>
                    <FormTitleRowWrapper>
                        <Text color="TERTIARY" size={SIZE_TITLE} text="Informações Gerais" />
                        <Text color="TERTIARY" size={SIZE_TITLE} text="Informações do Responsável" />
                        <CheckBoxWrapper>
                            <CheckBox onClick={handleCheckAgeOfMajority}>
                                {isMinor ? (
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
                            {!isNewRegistration && (
                                <Input
                                    sizeType="G"
                                    label="ID Paciente"
                                    value={data.id}
                                    disabled
                                />
                            )}
                            <Input
                                sizeType="MG"
                                label="Data de registro" value={formState.createdAt ? formState.createdAt.toLocaleDateString() : new Date().toLocaleDateString()}
                                disabled
                            />
                        </ColunmLeftWrapper>

                        <ColunmRightWrapper>
                            <Input
                                sizeType="G"
                                label="Nome completo"
                                placeholder={isMinor ? "João Ribeiro dos Santos" : ""}
                                disabled={!isMinor}
                                value={formState.guardianName || ""}
                                onChange={e =>
                                    setFormState(prev => ({ ...prev, guardianName: e.target.value }))
                                }
                                errorMessage={formErrors.guardianName}
                            />

                            <StyleWrapper>
                                <WrapperInput>
                                    <InputMask
                                        mask="999.999.999-99"
                                        value={formState.guardianCPF || ""}
                                        disabled={!isMinor}
                                        onChange={e => {
                                            const maskedValue = e.target.value;
                                            const unmaskedValue = maskedValue.replace(/\D/g, '');
                                            setFormState(prev => ({ ...prev, guardianCPF: unmaskedValue }))
                                        }}
                                        alwaysShowMask={isMinor}
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="M"
                                                label="CPF"
                                                disabled={!isMinor}
                                                {...inputProps}
                                                errorMessage={formErrors.guardianCPF}
                                            />
                                        )}
                                    </InputMask>
                                </WrapperInput>

                                <WrapperInput style={{ marginLeft: '20%' }}>
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={formState.guardianPhoneNumber || ""}
                                        disabled={!isMinor}
                                        onChange={e => {
                                            const maskedValue = e.target.value;
                                            const unmaskedValue = maskedValue.replace(/\D/g, '');
                                            setFormState(prev => ({ ...prev, guardianPhoneNumber: unmaskedValue }))
                                        }}
                                        alwaysShowMask={isMinor}
                                    >
                                        {inputProps => (
                                            <Input
                                                sizeType="P"
                                                disabled={!isMinor}
                                                label="Celular"
                                                {...inputProps}
                                                errorMessage={formErrors.guardianPhoneNumber}
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
                                    onChange={e => {
                                        const maskedValue = e.target.value;
                                        const unmaskedValue = maskedValue.replace(/\D/g, '');
                                        setFormState(prev => ({ ...prev, cpf: unmaskedValue }))
                                    }}
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
                                        setFormState(prev => ({ ...prev, address: e.target.value }))
                                    }
                                    errorMessage={formErrors.address}
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '40%' }}>
                                <InputMask
                                    mask="99-999-999"
                                    value={formatRg(formState.rg)}
                                    onChange={e => {
                                        const maskedValue = e.target.value;
                                        const unmaskedValue = maskedValue.replace(/\D/g, '');
                                        setFormState(prev => ({ ...prev, rg: unmaskedValue }))
                                    }}
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
                                        setFormState(prev => ({ ...prev, addressNumber: e.target.value }))
                                    }
                                    errorMessage={formErrors.addressNumber}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <SelectInput
                                    elements={MockUf}
                                    selectedOption={formState.uf}
                                    sizeType={'P'}
                                    canByOpen={canBeOpenSelect}
                                    label="UF"
                                    onSelectOption={value => setFormState(prev => ({ ...prev, uf: value }))}
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>

                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper style={{ width: '30%' }}>
                                <DatePicker
                                    selected={formState.birthDate}
                                    onSelect={() => setIsVisibleDateModal(false)}
                                    locale="ptBR"
                                    showYearDropdown

                                    dropdownMode="select"
                                    onChange={(date) => {
                                        setIsVisibleDateModal(false)

                                        if (date)
                                            setFormState(prev => ({
                                                ...prev, birthDate: date
                                            }))
                                    }}
                                    onInputClick={() => setIsVisibleDateModal(prev => !prev)}
                                    open={isVisibleDateModal}
                                    dateFormat="dd/MM/yyyy"
                                    maxDate={new Date()}
                                    customInput={
                                        <Input
                                            sizeType="G"
                                            inputType="date"
                                            onVisibleDateMenu={() => setIsVisibleDateModal(prev => !prev)}
                                            label="Data nascimento"
                                            errorMessage={formErrors.birthDate}
                                        />
                                    }
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '20%' }}>
                                <SelectInput
                                    elements={MockGender}
                                    sizeType={"G"}
                                    selectedOption={GenderEnum[formState.gender as keyof typeof GenderEnum]}
                                    label="Sexo"
                                    canByOpen={canBeOpenSelect}
                                    onSelectOption={handleSelectGender}
                                />
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <InputMask
                                    mask="99999-999"
                                    value={formState.cep}
                                    onChange={e => {
                                        const maskedValue = e.target.value;
                                        const unmaskedValue = maskedValue.replace(/\D/g, '');
                                        setFormState(prev => ({ ...prev, cep: unmaskedValue }))
                                    }}
                                    alwaysShowMask
                                >
                                    {inputProps => (
                                        <Input
                                            sizeType="G"
                                            label="CEP"
                                            {...inputProps}
                                            errorMessage={formErrors.cep}
                                        />
                                    )}
                                </InputMask>
                            </VariableRowWrapper>

                            <VariableRowWrapper style={{ width: '25%' }}>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    value={formatPhoneNumber(formState.phoneNumber)}
                                    onChange={e => {
                                        const maskedValue = e.target.value;
                                        const unmaskedValue = maskedValue.replace(/\D/g, '');
                                        setFormState(prev => ({ ...prev, phoneNumber: unmaskedValue }))
                                    }}
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
                    </ColumnCenterWrapper>
                </FormContentWrapper>
            </Form>
        </Container>
    );
}
