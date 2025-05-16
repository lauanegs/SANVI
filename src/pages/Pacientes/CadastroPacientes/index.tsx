import { TabCard } from "@components/TabCard";
import {
    CheckBox,
    CheckBoxWrapper,
    ColumnCenterRowWrapper,
    ColumnCenterWrapper,
    ColunmLeftWrapper,
    ColunmRightWrapper,
    ColunmsWrapper,
    Container,
    DivMarginButton,
    Form,
    FormContentWrapper,
    FormTitleRowWrapper,
    HeaderTabs,
    StyleWrapper,
    Tabs,
    VariableRowWrapper,
    WrapperInput
} from "./styles";
import { GenericHeader } from "@components/GenericHeader";
import GenericButton from "@components/GenericButton";
import { Text } from "@components/Text";
import { useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import Input from "@components/Input";

export function CadastroPaciente() {
    const [isAgeOfMajority, setIsAgeOfMajority] = useState(true);
    const [value, setValue] = useState('');

    const handleCheckAgeOfMajority = () => {
        setIsAgeOfMajority(prev => !prev);
    }

    console.log(value)

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
                <FormContentWrapper>
                    <FormTitleRowWrapper>
                        <Text
                            color="TERTIARY"
                            size={12}
                            text="Informações Gerais"
                        />
                        <Text
                            color="TERTIARY"
                            size={12}
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
                                        color={theme.COLORS.AZUL_DA_FRANCA}
                                        size={15}
                                    />
                                    :
                                    <Icon
                                        iconLibName="md"
                                        icon="MdCheckBoxOutlineBlank"
                                        color={theme.COLORS.AZUL_DA_FRANCA}
                                        size={15}
                                    />
                                }
                            </CheckBox>
                            <Text
                                color="TERTIARY"
                                size={12}
                                text="Declaro que o Paciente é menor de idade"
                            />
                        </CheckBoxWrapper>
                    </FormTitleRowWrapper>
                    <ColunmsWrapper>
                        <ColunmLeftWrapper>
                            <Input
                                sizeType="G"
                                placeholder="123456"
                                label="ID Paciente"
                                value={value}
                                onChange={(text) => setValue(text.target.value)}
                            />
                            <Input
                                sizeType="MG"
                                inputType="date"
                                label="Data de registro"

                            />
                            <Input
                                sizeType="G"
                                label="Motivo da procura"
                                placeholder="Consulta"

                                disabled
                            />
                        </ColunmLeftWrapper>
                        <ColunmRightWrapper>
                            <Input
                                sizeType="G"
                                label="Nome completo"
                                placeholder="João Ribeiro dos Santos"
                            />
                            <StyleWrapper>
                                <WrapperInput>
                                    <Input
                                        sizeType="M"
                                        label="CPF"
                                        placeholder="XXX.XXX.XXX-XX"
                                    />
                                </WrapperInput>
                                <WrapperInput
                                    style={{ marginLeft: '20%' }}
                                >
                                    <Input
                                        sizeType="P"
                                        label="Celular"
                                        placeholder="(XX) XXXXX-XXXX"
                                    />
                                </WrapperInput>
                            </StyleWrapper>
                        </ColunmRightWrapper>
                    </ColunmsWrapper>
                    <FormTitleRowWrapper>
                        <Text
                            color="TERTIARY"
                            size={12}
                            text="Informações do paciente"
                        />
                    </FormTitleRowWrapper>
                    <ColumnCenterWrapper>
                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '60%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Nome completo"
                                    placeholder="João Ribeiro dos santos"
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '40%' }}
                            >
                                <Input
                                    sizeType="MG"
                                    label="Profissão"
                                    placeholder="Professor"
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>
                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '30%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="CPF"
                                    placeholder="XXX.XXX.XXX-XX"
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '70%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Logradouro"
                                    placeholder="Rua José de Santana"
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>
                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '40%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="RG"
                                    placeholder="MGXX.XXX.XXX"
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '20%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Bairro"
                                    placeholder="Ipanema"
                                    
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '20%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Número"
                                    placeholder="1234"
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '20%' }}
                            >
                                <Input
                                    sizeType="P"
                                    label="UF"
                                    placeholder="MG"
                                    disabled
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>
                        <ColumnCenterRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '30%' }}
                            >
                                <Input
                                    sizeType="G"
                                    inputType="date"
                                    label="Data nascimento"
                                    
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '10%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Sexo"
                                    placeholder="Masculino"
                                    disabled
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '30%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="CEP"
                                    placeholder="(XX) XXXXX-XXXX"
                                    
                                />
                            </VariableRowWrapper>
                            <VariableRowWrapper
                                style={{ width: '30%' }}
                            >
                                <Input
                                    sizeType="G"
                                    label="Celular"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </VariableRowWrapper>
                        </ColumnCenterRowWrapper>
                    </ColumnCenterWrapper>
                </FormContentWrapper>
            </Form>
        </Container>

    );
}