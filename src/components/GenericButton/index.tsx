import { Container } from "./styles";
import { ButtonProps } from "./types";

function GenericButton({ color, onClick, title, disabled }: ButtonProps) {
    return (
        <Container onClick={onClick} color={color} disabled={disabled}>
            {title}
        </Container>
    );
}

export default GenericButton;
