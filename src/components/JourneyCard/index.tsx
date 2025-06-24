import { Text } from "@components/Text";
import { Container, Content, DateHeader, WrapperInfo } from "./styles";
import theme from "theme";
import Icon from "@components/Icon";
import { FullMonths, JourneyCardProps } from "./types";

export function JourneyCard({ date, description, professional, onClick }: JourneyCardProps) {

    function formatDate() {
        const dateArr = date.split('-');

        return `${dateArr[2]} de ${FullMonths[Number(dateArr[1])]} de ${dateArr[0]}`
    }

    return (
        <Container
            onClick={onClick}
        >
            <DateHeader>
                <Text
                    text={formatDate()}
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