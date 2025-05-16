import { TabCard } from "@components/TabCard";
import {
    CheckBox,
    CheckBoxWrapper,
    ColunmLeftWrapper,
    ColunmRightWrapper,
    Container,
    DivMarginButton,
    Form,
    FormTitleRowWrapper,
    FormTitleWrapper,
    HeaderTabs,
    Tabs
} from "./styles";
import { GenericHeader } from "@components/GenericHeader";
import GenericButton from "@components/GenericButton";
import { Text } from "@components/Text";
import { useEffect, useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function CadastroPaciente() {
    const [isAgeOfMajority, setIsAgeOfMajority] = useState(true);

    const handleCheckAgeOfMajority = () => {
        setIsAgeOfMajority(prev => !prev);
    }

    useEffect(() => {
    getCurrentWindow().isFullscreen().then((fullScreen) => {
        console.log(fullScreen);
    })
  
  }, []);

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
            <Form
                style={{
                    
                }}
            >
                <FormTitleWrapper>
                    <ColunmLeftWrapper>
                        <Text
                            color="TERTIARY"
                            size={14}
                            text="Informações Gerais"
                        />
                    </ColunmLeftWrapper>
                    <ColunmRightWrapper>
                        <FormTitleRowWrapper>
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
                        </FormTitleRowWrapper>
                    </ColunmRightWrapper>
                </FormTitleWrapper>
                <div style={{ width: 100, height: 100, background: 'black' }}>

                </div>
            </Form>
        </Container>

    );
}