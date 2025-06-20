import Icon from "@components/Icon";
import { Container, InputText, WrapperGenericIcon, WrapperSearchIcon, ContainerField, Label, ErrorText } from "./styles";
import { InputProps } from "./types";
import "react-datepicker/dist/react-datepicker.css";
import theme from "theme";

export default function Input({ sizeType, label, inputType, errorMessage, onVisibleDateMenu, ...rest }: InputProps) {
    return (
        <Container>
            <Label>
                {label}
            </Label>
            <ContainerField
                sizeType={sizeType}
            >
                {inputType === "search" &&
                    <WrapperSearchIcon>
                        <Icon
                            iconLibName="cg"
                            icon="CgSearch"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={15}
                        />
                    </WrapperSearchIcon>
                }
                <InputText
                    autoComplete="on"
                    {...rest}
                />
                {inputType === "date" && onVisibleDateMenu &&
                    <WrapperGenericIcon
                        onClick={() => onVisibleDateMenu()}
                    >
                        <Icon
                            color={theme.COLORS.CINZA_ESCURO}
                            iconLibName="pi"
                            icon="PiCalendarDotsBold"
                            size={20}
                        />
                    </WrapperGenericIcon>
                }
            </ContainerField>
            <ErrorText>
                {errorMessage && errorMessage}
            </ErrorText>
        </Container>
    );
}