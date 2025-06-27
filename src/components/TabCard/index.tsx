import { Container, Title } from "./styles";
import { TabCardProps } from "./types";

export function TabCard({title, ...rest}: TabCardProps){
    return(
        <Container
            {...rest}
        >
            {title}
        </Container>

    );
}