import { Text } from "@components/Text";
import { Container, WrapperIcon } from "./styles";
import Icon from "@components/Icon";
import theme from "theme";
import { JorneyCardProps } from "./types";

export function TreatmentCard({count, startDate, title, onClick, disabled = false}: JorneyCardProps){

    function formatDate(date: string){
        const d = date.split('-');
        return `${d[2]}/${d[1]}/${d[0]}`
    }

    return(
        <Container
            onClick={onClick}
            disabled={disabled}
        >
            <Text
                color="PRIMARY"
                size={16}
                text={`Tratamento ${count}`}
            />
            <Text
                color="PRIMARY"
                size={16}
                text={`Título: ${title}`}
            />
            <Text
                color="PRIMARY"
                size={16}
                text={`Data início: ${formatDate(startDate)}`}
            />
            <WrapperIcon>
                <Icon
                    iconLibName="fa6"
                    icon="FaAngleRight"
                    color={theme.COLORS.BRANCO}
                    size={15}
                />
            </WrapperIcon>
        </Container>
    );
}