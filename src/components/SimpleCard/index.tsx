import { Container, InfoText, InfoTitle } from "./styles";


export default function SimpleCard({info, title, subtitle}: SimpleCardProps) {
    return(
        <Container>
            <InfoTitle>{title}</InfoTitle>
            <InfoText>{subtitle}</InfoText>
            {info && 
                <InfoText>{info}</InfoText>
            }
            
        </Container>
    );
}