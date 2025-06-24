import { Text } from "@components/Text";
import { CloseButton, Container, ContentContainer, HeaderLine, InputWrapper, SaveButtonWrapper } from "./styles";
import Input from "@components/Input";
import { useState } from "react";
import { FormStateType, NewTreatmentMenuProps } from "./types";
import DatePicker from "react-datepicker";
import Icon from "@components/Icon";
import theme from "theme";
import GenericButton from "@components/GenericButton";
import * as yup from 'yup';
import { persistTreatment } from "@api/patient";
import { useAppStore } from "store/appStore";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "utils/query-keys";

export function NewTreatmentMenu({ onCloseModal }: NewTreatmentMenuProps) {
    const store = useAppStore();
    const patient = useAppStore().selectedPatient;
    const [formState, setFormState] = useState<FormStateType>({
        date: new Date(),
        title: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);

    const queryClient = useQueryClient();

    const formSchema = yup.object().shape({
        title: yup.string().required('Informe o título')
    });

    async function handleSubmitForm() {
        try {
            await formSchema.validate({ ...formState }, { abortEarly: false });
            setFormErrors({});

            const response = await persistTreatment({
                endedAt: null,
                patientId: patient.id,
                title: formState.title,
                startedAt: formState.date.toISOString()
            });

            if (response.ok) {
                toast.success("Tratamento cadastrado com sucesso!", {
                    position: "bottom-right",
                    duration: 2000
                })

                queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENT_TREATMENTS });

                setFormState({
                    date: new Date(),
                    title: ''
                });
            }

            if (!response.ok) {
                toast.error("Não foi possivel cadastrar", {
                    position: "bottom-right",
                    duration: 2000
                })
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
        }
    }

    function handleSelectDate(date: Date) {
        setFormState(prev => ({
            ...prev, date: date
        }))
    }

    return (
        <Container>
            <ContentContainer>
                <CloseButton
                    onClick={onCloseModal}
                >
                    <Icon
                        iconLibName="cg"
                        icon="CgClose"
                        size={26}
                        color={theme.COLORS.AZUL_DA_FRANCA}
                    />
                </CloseButton>
                <Text
                    color="TERTIARY"
                    size={16}
                    text="Novo Tratamento"
                />
                <HeaderLine />
                <InputWrapper>
                    <Input
                        sizeType="G"
                        label="Título"
                        value={formState.title}
                        onChange={(e) => setFormState(prev => ({
                            ...prev, title: e.target.value
                        }))}
                        errorMessage={formErrors.title}
                    />
                </InputWrapper>
                <InputWrapper>
                    <DatePicker
                        selected={formState.date}
                        onSelect={() => setIsVisibleDateModal(false)}
                        locale="ptBR"
                        showYearDropdown
                        dropdownMode="select"
                        onChange={(date) => {
                            setIsVisibleDateModal(false)
                            if (date)
                                handleSelectDate(date);
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
                                label="Data de início"
                            />
                        }
                    />
                </InputWrapper>
                <SaveButtonWrapper>
                    <GenericButton
                        title="Salvar"
                        color="PRIMARY"
                        onClick={handleSubmitForm}
                    />
                </SaveButtonWrapper>
            </ContentContainer>
        </Container>
    );
}