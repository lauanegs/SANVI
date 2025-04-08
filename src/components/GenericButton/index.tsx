
import { Container } from "./styles";
import { ButtonProps } from "./types";

function GenericButton({color, onClick, title}: ButtonProps) {
  return (
    <Container
        onClick={onClick}
        color={color}
    >{title}</Container>
  )
}


export default GenericButton;