import { Container, InfoText, InfoTitle } from "./styles";


export default function SimpleCard({title, subtitle, ...rest}: SimpleCardProps) {
    return(
        <Container
            {...rest}
        >
            <InfoTitle>{title}</InfoTitle>
            <InfoText>{subtitle}</InfoText>
            
        </Container>
    );
}