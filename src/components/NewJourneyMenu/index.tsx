import Icon from "@components/Icon";
import { ButtonsWrapper, CleanWrapper, CloseButton, Container, ContentContainer, HeaderLine, IconFolderWrapper, InputWrapper, SaveButtonWrapper } from "./styles";
import theme from "theme";
import { Text } from "@components/Text";
import Input from "@components/Input";
import { SelectInput } from "@components/SelectInput";
import { useEffect, useState } from "react";
import { FormStateType, NewJourneyMenuProps } from "./types";
import DatePicker from "react-datepicker";
import GenericButton from "@components/GenericButton";
import * as yup from 'yup';
import { editJourneyEvent, findSpecialist, persistJourneyEvent } from "@api/patient";
import { useAppStore } from "store/appStore";
import toast from "react-hot-toast";
import { queryKeys } from "utils/query-keys";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function NewJourneyMenu({ onCloseModal, selectedTreatment, selectedJourneyEvent, onClearSelection }: NewJourneyMenuProps) {

    const [specialistOptions, setSpecialistOptions] = useState<string[]>([]);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);

    const store = useAppStore();

    const queryClient = useQueryClient();
    const { data: dataSpecialists = [], isPending: isPendingSpecialists } = useQuery({
        queryKey: queryKeys.ALL_SPECIALISTS,
        queryFn: findSpecialist,
        staleTime: 1000 * 60 * 5
    })


    const [formState, setFormState] = useState<FormStateType>({
        date: new Date(),
        description: '',
        professional: dataSpecialists[0].name
    });

    const formSchema = yup.object().shape({
        description: yup.string().required('Informe a descrição').max(255, 'A descrição deve ter no máximo 255 caracteres'),
        professional: yup.string().required('Informe o especialista'),
    })

    function handleSelectProfessional(professional: string) {
        setFormState(prev => ({
            ...prev, professional: professional
        }))
    }

    function handleSelectDate(date: Date) {
        setFormState(prev => ({
            ...prev, date: date
        }))
    }

    async function handleSubmitForm() {
        try {
            await formSchema.validate({ ...formState }, { abortEarly: false });
            setFormErrors({});

            if (!selectedJourneyEvent) {
                const response = await persistJourneyEvent({
                    date: formState.date.toISOString(),
                    description: formState.description,
                    specialistId: dataSpecialists.find(item => item.name === formState.professional)?.id || 0,
                    treatmentId: selectedTreatment.id
                });

                if (response.ok) {
                    toast.success("Jornada cadastrada com sucesso!", {
                        position: "bottom-right",
                        duration: 2000
                    })

                    queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENT_TREATMENTS });
                    queryClient.invalidateQueries({ queryKey: queryKeys.ALL_TREATMENT_JOURNEYS });

                    setFormState({
                        date: new Date(),
                        description: '',
                        professional: dataSpecialists[0].name
                    });
                }

                if (!response.ok) {
                    toast.error("Não foi possivel cadastrar", {
                        position: "bottom-right",
                        duration: 2000
                    })
                }
            } else {
                if (!selectedJourneyEvent) return;

                const response = await editJourneyEvent({
                    id: selectedJourneyEvent.id,
                    date: formState.date.toISOString(),
                    description: formState.description,
                    specialistId: dataSpecialists.find(item => item.name === formState.professional)?.id || 0,
                    treatmentId: selectedTreatment.id
                });

                if (response.ok) {
                    toast.success("Jornada editada com sucesso!", {
                        position: "bottom-right",
                        duration: 2000
                    })

                    queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENT_TREATMENTS });
                    queryClient.invalidateQueries({ queryKey: queryKeys.ALL_TREATMENT_JOURNEYS });

                    onClearSelection();
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
        }
    }

    useEffect(() => {
        const options = dataSpecialists.map(item => item.name);
        setSpecialistOptions(options);
    }, []);

    useEffect(() => {
        if (selectedJourneyEvent) {
            setFormState({
                date: new Date(selectedJourneyEvent.date),
                description: selectedJourneyEvent.description,
                professional: selectedJourneyEvent.specialist.name
            })
            return;
        }

        setFormState({
            date: new Date(),
            description: '',
            professional: dataSpecialists[0].name
        })
    }, [selectedJourneyEvent]);

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
                    text="Nova Jornada"
                />
                <HeaderLine />
                <InputWrapper>
                    <Input
                        label="Descrição"
                        sizeType="G"
                        value={formState.description}
                        onChange={(e) => {
                            const isOutLength = e.target.value.length > 255;

                            if (isOutLength) return;

                            setFormState(prev => ({
                                ...prev, description: e.target.value
                            }))
                        }}
                        errorMessage={formErrors.description}
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
                                label="Data"
                            />
                        }
                    />
                </InputWrapper>
                <InputWrapper>
                    {specialistOptions.length > 0 &&
                        <SelectInput
                            elements={specialistOptions}
                            selectedOption={formState.professional}
                            onSelectOption={handleSelectProfessional}
                            sizeType="G"
                            label="Profissional"
                            errorMessage={formErrors.professional}
                        />}
                </InputWrapper>
                <IconFolderWrapper>
                    <Icon
                        iconLibName="hi2"
                        icon="HiOutlineFolderOpen"
                        color={theme.COLORS.CINZA_ESCURO}
                        fill={theme.COLORS.BRANCO}
                        size={20}
                    />

                </IconFolderWrapper>

                <ButtonsWrapper>
                    <SaveButtonWrapper>
                        <GenericButton
                            title="Salvar"
                            color="PRIMARY"
                            onClick={handleSubmitForm}
                        />
                    </SaveButtonWrapper>
                    {selectedJourneyEvent &&
                        <CleanWrapper
                            onClick={onClearSelection}
                        >
                            <Icon
                                iconLibName='io5'
                                icon='IoClose'
                                color={theme.COLORS.AZUL_DA_FRANCA}
                                size={25}
                            />
                        </CleanWrapper>}
                </ButtonsWrapper>
            </ContentContainer>
        </Container >
    );
}