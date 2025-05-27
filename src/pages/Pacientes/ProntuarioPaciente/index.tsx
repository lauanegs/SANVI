import { GenericHeader } from "@components/GenericHeader";
import { Container } from "../styles";
import { MenuHeader } from "@components/MenuHeader";
import { ContainerAnamneseCard, ContainerInfo, Form, FormContent, FormTitleRowWrapper, VariableRowWrapper } from "./styles";
import Input from "@components/Input";
import { Text } from "@components/Text";
import { AnamneseCard } from "@components/AnamneseCard";
import { SimpleSelect } from "@components/SimpleSelect";
import { useState } from "react";

export function ProntuarioPaciente() {
    const [isPregnant, setIsPregnant] = useState(false);
    const [hasHealthProblem, setHasHealthProblem] = useState(false);
    const [isReceivingMedicalTreatment , setIsReceivingMedicalTreatment] = useState(false);

    const handleSetIsPregnant = (state: boolean) => {
        setIsPregnant(state);
    }
    const handleSetHasHealthProblem = (state: boolean) => {
        setHasHealthProblem(state);
    }
    const handleSetIsReceivingMedicalTreatment = (state: boolean) => {
        setIsReceivingMedicalTreatment(state);
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
            <Form>
                <FormContent>
                    <FormTitleRowWrapper>
                        <Text
                            color="TERTIARY"
                            size={12}
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
                            size={12}
                            text="Anamnese"
                        />
                    </FormTitleRowWrapper>
                    <VariableRowWrapper>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                textField="Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus."
                                title="queixa principal"
                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                textField="Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus."
                                title="hostória da doença atual"
                            />
                        </ContainerAnamneseCard>
                    </VariableRowWrapper>
                    <VariableRowWrapper>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                textField="Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus. Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus."
                                title="história médica anterior"
                            />
                        </ContainerAnamneseCard>
                        <ContainerAnamneseCard>
                            <AnamneseCard
                                textField="Lorem ipsum dolor sit amet. Ut error aperiam ex recusandae eveniet et similique suscipit et consequatur perferendis aut laboriosam quos non aspernatur facilis ut molestiae temporibus."
                                title="hostória médica familiar"
                            />
                        </ContainerAnamneseCard>
                        <SimpleSelect
                            title="Se mulher, está grávida?"
                            onChangeState={handleSetIsPregnant}
                        />
                    </VariableRowWrapper>
                </FormContent>
            </Form>
        </Container>
    );
}