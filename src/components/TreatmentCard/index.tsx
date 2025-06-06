import { Text } from "@components/Text";
import { Container, WrapperIcon } from "./styles";
import Icon from "@components/Icon";
import theme from "theme";
import { JorneyCardProps } from "./types";

export function TreatmentCard({count, startDate, title}: JorneyCardProps){
    return(
        <Container>
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
                text={`Data início: ${startDate}`}
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