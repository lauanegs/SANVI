import { BottomLine, Container, Title } from "./styles";
import { TabCardProps } from "./types";

export function TabCard({title}: TabCardProps){
    return(
        <Container>
            <Title>{title}</Title>
            <BottomLine/>
        </Container>

    );
}