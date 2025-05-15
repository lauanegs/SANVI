import { TabCard } from "@components/TabCard";
import { CheckBox, CheckBoxWrapper, Container, ContainerColunmForm, DivMarginButton, Form, HeaderTabs, Tabs, WrapperRow } from "./styles";
import { GenericHeader } from "@components/GenericHeader";
import GenericButton from "@components/GenericButton";
import { Text } from "@components/Text";
import { useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import Input from "@components/Input";

export function CadastroPaciente() {
    const [isAgeOfMajority, setIsAgeOfMajority] = useState(true);

    const datePlaceholder = new Date();

    const handleCheckAgeOfMajority = () => {
        setIsAgeOfMajority(prev => !prev);
    }

    return (
        <Container>
            <GenericHeader />
            <HeaderTabs>
                <Tabs>
                    <TabCard
                        title="Cadastro"
                    />
                    <TabCard
                        title="Jornada"
                    />
                    <TabCard
                        title="Prontuário"
                    />
                </Tabs>
                <DivMarginButton>
                    <GenericButton
                        color="PRIMARY"
                        title="Salvar"
                        onClick={() => { }}
                    />
                </DivMarginButton>
            </HeaderTabs>
            <Form>
                <ContainerColunmForm>
                    <Text
                        color="TERTIARY"
                        size={14}
                        text="Informações Gerais"
                    />

                    
                </ContainerColunmForm>
                <ContainerColunmForm>
                    <WrapperRow>
                        <Text
                            color="TERTIARY"
                            size={14}
                            text="Informações do Responsável"
                        />
                        <CheckBoxWrapper>
                            <CheckBox
                                onClick={handleCheckAgeOfMajority}
                            >
                                {isAgeOfMajority ?
                                    <Icon
                                        iconLibName="md"
                                        icon="MdCheckBox"
                                        color="#000"
                                        size={20}
                                    />
                                    :
                                    <Icon
                                        iconLibName="md"
                                        icon="MdCheckBoxOutlineBlank"
                                        color={theme.COLORS.AZUL_DA_FRANCA}
                                        size={20}
                                    />
                                }
                            </CheckBox>
                            <Text
                                color="TERTIARY"
                                size={14}
                                text="Declaro que o Paciente é menor de idade"
                            />
                        </CheckBoxWrapper>
                    </WrapperRow>
                   
                </ContainerColunmForm>

                
            </Form>
        </Container>

    );
}