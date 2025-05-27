import { Text } from "@components/Text";
import { Container, TextField, TextFieldWrapper } from "./styles";
import { AnamneseCardProps } from "./types";

export function AnamneseCard({textField, title}: AnamneseCardProps){
    return(
        <Container>
            <Text
                color="PRIMARY"
                size={12}
                text={title}
            />
            <TextFieldWrapper>
                <TextField
                    value={textField}
                    rows={4}
                />
            </TextFieldWrapper>
        </Container>

    );
}