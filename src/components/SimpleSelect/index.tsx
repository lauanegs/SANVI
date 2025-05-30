import Icon from "@components/Icon";
import { Container, OptionWrapper, SelectWrapper } from "./styles";
import theme from "theme";
import { useState } from "react";
import { Text } from "@components/Text";
import { SimpleSelectProps } from "./types";

export function SimpleSelect({onChangeState, title, direction = "vertical"}: SimpleSelectProps) {
    const [isYesSelected, setIsYesSelected] = useState(false);

    const handleSetState = () => {
        const state = !isYesSelected;
        setIsYesSelected(prev => !prev);
        onChangeState(state);
    }

    return (
        <Container>
            <Text
                color="PRIMARY"
                size={12}
                text={title}
            />
            <SelectWrapper
                direction={direction}
            >
                <OptionWrapper
                    onClick={handleSetState}
                >
                    {isYesSelected ?
                        <Icon
                            iconLibName="md"
                            icon="MdRadioButtonChecked"
                            size={15}
                            color={theme.COLORS.AZUL_DA_FRANCA}
                        />
                        :
                        <Icon
                            iconLibName="md"
                            icon="MdRadioButtonUnchecked"
                            size={15}
                            color={theme.COLORS.AZUL_DA_FRANCA}
                        />
                    }
                    <Text
                        color="PRIMARY"
                        size={12}
                        text="Sim"
                    />
                </OptionWrapper>
                <OptionWrapper
                    onClick={handleSetState}
                >
                    {!isYesSelected ?
                        <Icon
                            iconLibName="md"
                            icon="MdRadioButtonChecked"
                            size={15}
                            color={theme.COLORS.AZUL_DA_FRANCA}
                        />
                        :
                        <Icon
                            iconLibName="md"
                            icon="MdRadioButtonUnchecked"
                            size={15}
                            color={theme.COLORS.AZUL_DA_FRANCA}
                        />
                    }
                    <Text
                        color="PRIMARY"
                        size={12}
                        text="Não"
                    />
                </OptionWrapper>
            </SelectWrapper>
        </Container>

    );
}