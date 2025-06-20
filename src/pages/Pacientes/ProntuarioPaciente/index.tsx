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
import { persistMedicalRecord } from "@api/patient";
import toast from "react-hot-toast";


export function ProntuarioPaciente() {
    const store = useAppStore();
    const isFullScreen = store.isFullScreen;

    const patientId = useAppStore().selectedPatient.id;
    const data = useAppStore().selectedPatient.medicalRecord;

    const isFirstRecord = !data;

    const SIZE_TITLE = isFullScreen ? 14 : 12;

    const [hasChanges, setHasChanges] = useState(true);

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
            console.log("ASDASD", {
                hasHealthProblem: formState.hasHealthProblem,
                hasMedicalTreatment: formState.hasMedicalTreatment,
                isPregnant: formState.isPregnant,
                patientId: patientId,
                MedicalRecordData: formState.medicalRecordData
            })
            const response = await persistMedicalRecord({
                hasHealthProblem: formState.hasHealthProblem,
                hasMedicalTreatment: formState.hasMedicalTreatment,
                isPregnant: formState.isPregnant,
                patientId: patientId,
                data: formState.medicalRecordData
            })

            console.log("RESPONSE", response);
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

    useEffect(() => {
        if (data && data.medicalRecordData && !isFirstRecord){
            const dataObj = {
                createdAt: new Date(data.createdAt),
                hasHealthProblem: data.hasHealthProblem,
                hasMedicalTreatment: data.hasMedicalTreatment,
                id: data.id.toString(),
                isPregnant: data.isPregnant,
                medicalRecordData: data.medicalRecordData,
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date()
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
                        {!isFirstRecord &&
                            <Input
                                label="ID Prontuário"
                                disabled
                                value={formState.id}
                                sizeType="MG"
                            />}
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
                                onHeightChange={() => { }}
                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="hostória da doença atual"
                                value={formState.medicalRecordData.diseaseHistory}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, diseaseHistory: e.target.value
                                        }
                                    }))
                                }}
                                onHeightChange={() => { }}
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
                                onHeightChange={() => { }}
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
                                onHeightChange={() => { }}
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
                                    }}
                                    direction="vertical"
                                />
                            </SelectStyleWrapper>
                            <AnamneseCard
                                value={formState.medicalRecordData.healthProblem}
                                onChange={(e) => {
                                    setFormState(prev => ({
                                        ...prev, medicalRecordData: {
                                            ...prev.medicalRecordData, medicalTreatment: e.target.value
                                        }
                                    }))
                                }}
                                onHeightChange={() => { }}
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
                                onHeightChange={() => { }}
                            />
                        </VerticalWrapper>
                    </VariableRowWrapper>
                </FormContent>
            </Form>
        </Container>
    );
}