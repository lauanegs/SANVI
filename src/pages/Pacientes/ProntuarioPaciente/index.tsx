import { GenericHeader } from "@components/GenericHeader";
import { MenuHeader } from "@components/MenuHeader";
import { Container, ContainerAnamneseCard, ContainerInfo, FirstSelectStyleWrapper, Form, FormContent, FormTitleRowWrapper, SelectStyleWrapper, VariableRowWrapper, VerticalWrapper } from "./styles";
import Input from "@components/Input";
import { Text } from "@components/Text";
import { AnamneseCard } from "@components/AnamneseCard";
import { SimpleSelect } from "@components/SimpleSelect";
import { useRef, useState } from "react";

import { getCurrentWindow } from "@tauri-apps/api/window";
import { useAppStore } from "store/appStore";


export function ProntuarioPaciente() {
    const isFullScreen = useAppStore().isFullScreen;
    
    const SIZE_TITLE = isFullScreen ? 14 : 12;

    const [isPregnant, setIsPregnant] = useState(false);
    const [hasHealthProblem, setHasHealthProblem] = useState(false);
    const [isReceivingMedicalTreatment, setIsReceivingMedicalTreatment] = useState(false);

    getCurrentWindow().listen("tauri://move", ({ event, payload }) => {
    console.log("EXECUTOU");
    console.log(event, payload);
});


    const [queixaPrincipal, setQueixaPrincipal] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");
    const [doencaAtual, setDoencaAtual] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");
    const [historiaMedicaAnterior, setHistoriaMedicaAnterior] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");
    const [historiaMedicaFamiliar, setHistoriaMedicaFamiliar] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");
    const [problemaDeSaude, setProblemaDeSaude] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");
    const [tratamentoMedico, setTratamentoMedico] = useState("Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus.");

    const formRef = useRef<HTMLDivElement>(null);

    const handleChangeAnamneseCardheight = (value: number, isSum: boolean) => {
        const form = formRef.current;
        if(!form) return;

        const prevHeight = Number(formRef.current.style.height);
        if(isSum){
            const newHeight = prevHeight + value;
            formRef.current.style.height = `${newHeight}px`;
        }else{
            const newHeight = prevHeight - value;
            formRef.current.style.height = `${newHeight}px`;
        }
    }

    const handleSetIsPregnant = (state: boolean) => {
        setIsPregnant(state);
    }
    const handleSetHasHealthProblem = (state: boolean) => {
        setHasHealthProblem(state);
    }
    const handleSetIsReceivingMedicalTreatment = (state: boolean) => {
        setIsReceivingMedicalTreatment(state);
    }

    const handleSetQueixaPrincipal = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQueixaPrincipal(event.currentTarget.value);
    }
    const handleSetDoencaAtual = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDoencaAtual(value.currentTarget.value);
    }
    const handleSetHistoriaMedicaAnterior = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHistoriaMedicaAnterior(value.currentTarget.value);
    }
    const handleSetHistoriaMedicaFamiliar = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHistoriaMedicaFamiliar(value.currentTarget.value);
    }
    const handleSetProblemaDeSaude = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProblemaDeSaude(value.currentTarget.value);
    }
    const handleSetTratamentoMedico = (value: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTratamentoMedico(value.currentTarget.value);
    }

    return (
        <Container>
            <GenericHeader />
            <MenuHeader
                firstSubScreen="cadastroPaciente"
                secondSubScreen="jornadaPaciente"
                thirdSubScreen="prontuarioPaciente"
                buttonTitle="Salvar"
                onPressButton={() => { }}
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
                            sizeType="MG"
                        />
                        <Input
                            label="MRD Number"
                            sizeType="M"
                            inputType="date"
                        />
                        <Input
                            label="Motivo da Procura"
                            sizeType="MG"
                            disabled
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
                                value={queixaPrincipal}
                                onChange={handleSetQueixaPrincipal}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="hostória da doença atual"
                                value={doencaAtual}
                                onChange={handleSetDoencaAtual}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </ContainerAnamneseCard>
                    </VariableRowWrapper>
                    <VariableRowWrapper>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="história médica anterior"
                                value={historiaMedicaAnterior}
                                onChange={handleSetHistoriaMedicaAnterior}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                title="hostória médica familiar"
                                value={historiaMedicaFamiliar}
                                onChange={handleSetHistoriaMedicaFamiliar}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </ContainerAnamneseCard>
                        <FirstSelectStyleWrapper>
                            <SimpleSelect
                                title="Se mulher, está grávida?"
                                onChangeState={handleSetIsPregnant}
                                direction="horizontal"
                            />
                        </FirstSelectStyleWrapper>
                    </VariableRowWrapper>
                    <VariableRowWrapper>
                        <VerticalWrapper>
                            <SelectStyleWrapper>
                                <SimpleSelect
                                    title="Possui algum problema de saúde?"
                                    onChangeState={handleSetHasHealthProblem}
                                    direction="vertical"
                                />
                            </SelectStyleWrapper>
                            <AnamneseCard
                                value={problemaDeSaude}
                                onChange={handleSetProblemaDeSaude}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </VerticalWrapper>
                        <VerticalWrapper>
                            <SelectStyleWrapper>
                                <SimpleSelect
                                    title="Está fazendo algum tratamento médico?"
                                    onChangeState={handleSetIsReceivingMedicalTreatment}
                                    direction="vertical"
                                />
                            </SelectStyleWrapper>
                            <AnamneseCard
                                value={tratamentoMedico}
                                onChange={handleSetTratamentoMedico}
                                onHeightChange={handleChangeAnamneseCardheight}
                            />
                        </VerticalWrapper>
                    </VariableRowWrapper>
                </FormContent>
            </Form>
        </Container>
    );
}