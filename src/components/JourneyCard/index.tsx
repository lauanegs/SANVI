import { Text } from "@components/Text";
import { Container, Content, DateHeader, WrapperInfo } from "./styles";
import theme from "theme";
import Icon from "@components/Icon";

export function JourneyCard(){
    return(
        <Container>
            <DateHeader>
                <Text
                    text="28 de fevereiro de 2025"
                    size={14}
                    color="PRIMARY"
                />
            </DateHeader>
            <Content>
                <WrapperInfo>
                    <Text
                    text="Descrição"
                    size={12}
                    color="PRIMARY"
                />
                <Text
                    text="Profissional: Dr. Joaquim"
                    size={12}
                    color="PRIMARY"
                />
                <Icon
                    iconLibName="bs"
                    icon="BsFolder2Open"
                    color={theme.COLORS.CINZA_ESCURO}
                    size={15}
                />
                </WrapperInfo>
            </Content>
        </Container>
    );
}