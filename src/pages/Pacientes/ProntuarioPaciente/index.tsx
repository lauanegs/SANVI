import { GenericHeader } from "@components/GenericHeader";
import { MenuHeader } from "@components/MenuHeader";
import { Container, ContainerAnamneseCard, ContainerInfo, FirstSelectStyleWrapper, Form, FormContent, FormTitleRowWrapper, SelectStyleWrapper, VariableRowWrapper, VerticalWrapper } from "./styles";
import Input from "@components/Input";
import { Text } from "@components/Text";
import { AnamneseCard } from "@components/AnamneseCard";
import { SimpleSelect } from "@components/SimpleSelect";
import { useEffect, useRef, useState } from "react";

import { useAppStore } from "store/appStore";
import { FormStateTypeMedicalRecord } from "./types";
import { editMedicalRecord } from "@api/patient";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "utils/query-keys";


export function ProntuarioPaciente() {
    const store = useAppStore();
    const isFullScreen = store.isFullScreen;

    const data = useAppStore().selectedPatient.medicalRecord;

    const SIZE_TITLE = isFullScreen ? 14 : 12;

    const queryCliente = useQueryClient();

    const [formState, setFormState] = useState<FormStateTypeMedicalRecord>({
        id: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        hasHealthProblem: false,
        hasMedicalTreatment: false,
        isPregnant: false,
        medicalRecordData: {
            diseaseHistory: '',
            mainComplaint: '',
            medicalTreatment: '',
            pastMedicalHistory: '',
            healthProblem: '',
            familyMedicalHistory: ''
        }
    });

    const formRef = useRef<HTMLDivElement>(null);

    async function handleSubmitForm() {
        try {
            const response = await editMedicalRecord({
                patientId: Number(formState.id),
                hasHealthProblem: formState.hasHealthProblem,
                hasMedicalTreatment: formState.hasMedicalTreatment,
                isPregnant: formState.isPregnant,
                medicalRecordData: formState.medicalRecordData,
                updatedAt: formState.updatedAt,

            })


            if (response.ok) {
                toast.success("Prontuário do paciente editado com sucesso!", {
                    position: "bottom-right",
                    duration: 2000
                })

                queryCliente.invalidateQueries({ queryKey: queryKeys.ALL_PATIENTS });
            }

            if (!response.ok) {
                toast.error("Não foi editar o prontuário do paciente", {
                    position: "bottom-right",
                    duration: 2000
                })
            }
        } catch (error) {
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

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const scrollAmount = e.deltaY * 0.7;

            form.scrollTop += scrollAmount;
        };

        form.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            form.removeEventListener("wheel", handleWheel);
        };
    }, []);

    useEffect(() => {
        if (data && data.medicalRecordData)
            setFormState({
                createdAt: new Date(data.createdAt),
                hasHealthProblem: data.hasHealthProblem,
                hasMedicalTreatment: data.hasMedicalTreatment,
                id: data.id.toString(),
                isPregnant: data.isPregnant,
                medicalRecordData: data.medicalRecordData,
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
            })
    }, [])

    console.log("DATA", data);
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
            <Form
                ref={formRef}
            >
                <FormContent>
                    <FormTitleRowWrapper>
                        <Text
                            color="TERTIARY"
                            size={SIZE_TITLE}
                            text="Informações do paciente"
                        />
                    </FormTitleRowWrapper>
                    <ContainerInfo>
                        <Input
                            label="ID Prontuário"
                            disabled
                            value={formState.id}
                            sizeType="MG"
                        />
                        <Input
                            label="Última atualização"
                            sizeType="M"
                            disabled
                            value={formState.updatedAt.toLocaleDateString()}
                        />
                    </ContainerInfo>

                    <FormTitleRowWrapper>
                        <Text
                            color="TERTIARY"
                            size={SIZE_TITLE}
                            text="Anamnese"
                        />
                    </FormTitleRowWrapper>
                    <VariableRowWrapper>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="queixa principal"
                                value={formState.medicalRecordData.mainComplaint}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, mainComplaint: e.target.value
                                        }
                                    }))
                                }}

                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="história da doença atual"
                                value={formState.medicalRecordData.diseaseHistory}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, diseaseHistory: e.target.value
                                        }
                                    }))
                                }}

                            />
                        </ContainerAnamneseCard>
                    </VariableRowWrapper>
                    <VariableRowWrapper>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="história médica anterior"
                                value={formState.medicalRecordData.pastMedicalHistory}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, pastMedicalHistory: e.target.value
                                        }
                                    }))
                                }}

                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="hostória médica familiar"
                                value={formState.medicalRecordData.familyMedicalHistory}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, familyMedicalHistory: e.target.value
                                        }
                                    }))
                                }}

                            />
                        </ContainerAnamneseCard>
                        <FirstSelectStyleWrapper>
                            <SimpleSelect
                                title="Se mulher, está grávida?"
                                state={formState.isPregnant}
                                onChangeState={(state) => {
                                    setFormState(prev => ({
                                        ...prev, isPregnant: state
                                    }))
                                }}
                                direction="horizontal"
                            />
                        </FirstSelectStyleWrapper>
                    </VariableRowWrapper>
                    <VariableRowWrapper>
                        <VerticalWrapper>
                            <SelectStyleWrapper>
                                <SimpleSelect
                                    title="Possui algum problema de saúde?"
                                    state={formState.hasHealthProblem}
                                    onChangeState={(state) => {
                                        setFormState(prev => ({
                                            ...prev, hasHealthProblem: state
                                        }))

                                        if (!state) {
                                            setFormState(prev => ({
                                                ...prev, medicalRecordData: {
                                                    ...prev.medicalRecordData, healthProblem: ''
                                                }
                                            }))
                                            return;
                                        }

                                        if(data && data.medicalRecordData.healthProblem !== ''){

                                            setFormState(prev => ({
                                                ...prev, medicalRecordData: {
                                                    ...prev.medicalRecordData, healthProblem: data.medicalRecordData.healthProblem
                                                }
                                            }))
                                        }
                                    }}
                                    direction="vertical"
                                />
                            </SelectStyleWrapper>
                            <AnamneseCard
                                value={formState.medicalRecordData.healthProblem}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, healthProblem: e.target.value
                                        }
                                    }))
                                }}
                                isDisabled={!formState.hasHealthProblem}
                            />
                        </VerticalWrapper>
                        <VerticalWrapper>
                            <SelectStyleWrapper>
                                <SimpleSelect
                                    title="Está fazendo algum tratamento médico?"
                                    state={formState.hasMedicalTreatment}
                                    onChangeState={(state) => {
                                        setFormState(prev => ({
                                            ...prev, hasMedicalTreatment: state
                                        }))

                                        if (!state) {
                                            setFormState(prev => ({
                                                ...prev, medicalRecordData: {
                                                    ...prev.medicalRecordData, medicalTreatment: ''
                                                }
                                            }))
                                            return;
                                        }

                                        if(data && data.medicalRecordData.medicalTreatment !== ''){

                                            setFormState(prev => ({
                                                ...prev, medicalRecordData: {
                                                    ...prev.medicalRecordData, medicalTreatment: data.medicalRecordData.medicalTreatment
                                                }
                                            }))
                                        }
                                    }}
                                    direction="vertical"
                                />
                            </SelectStyleWrapper>
                            <AnamneseCard
                                value={formState.medicalRecordData.medicalTreatment}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, medicalTreatment: e.target.value
                                        }
                                    }))
                                    
                                }}
                                isDisabled={!formState.hasMedicalTreatment}
                            />
                        </VerticalWrapper>
                    </VariableRowWrapper>
                </FormContent>
            </Form>
        </Container>
    );
}