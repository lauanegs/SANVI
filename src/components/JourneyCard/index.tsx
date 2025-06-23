import { Text } from "@components/Text";
import { Container, Content, DateHeader, WrapperInfo } from "./styles";
import theme from "theme";
import Icon from "@components/Icon";
import { FullMonths, JourneyCardProps } from "./types";

export function JourneyCard({date, description, professional, onClick}: JourneyCardProps){

    function formatDate(date: Date){
        const day = date.getDate();
        const fullMonth = date.getMonth();
        const year = date.getFullYear();

        return `${day} de ${FullMonths[fullMonth]} de ${year}`
    }

    return(
        <Container
            onClick={onClick}
        >
            <DateHeader>
                <Text
                    text={formatDate(date)}
                    size={14}
                    color="PRIMARY"
                />
            </DateHeader>
            <Content>
                <WrapperInfo>
                    <Text
                    text={description}
                    size={12}
                    color="PRIMARY"
                />
                <Text
                    text={`Profissional: ${professional}`}
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