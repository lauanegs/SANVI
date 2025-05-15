import Icon from "@components/Icon";
import { Container, InputText, WrapperGenericIcon, WrapperSearchIcon, ContainerField, Label } from "./styles";
import { InputProps } from "./types";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import theme from "theme";

export default function Input({ sizeType, label, elements = [], inputType, ...rest }: InputProps) {

    registerLocale("ptBR", ptBR);
    const [isVisibleDateMenu, setIsVisibleDateMenu] = useState(false);
    const [date, setDate] = useState(new Date());
    const [inputValue, setInputValue] = useState('');

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
                {inputType === "date" ?
                    <DatePicker
                        locale="pt-BR"
                        selected={date}
                        dateFormat="dd/MM/yyyy"
                        onChange={date => date && setDate(date)}
                        open={isVisibleDateMenu}
                        onClickOutside={() => setIsVisibleDateMenu(false)}
                        onSelect={() => setIsVisibleDateMenu(false)}
                        onInputClick={() => setIsVisibleDateMenu(true)}
                        showPopperArrow={false}
                        customInput={<InputText />}
                    />
                    :
                    <InputText
                        value={inputValue}
                        onChange={text => setInputValue(text.target.value)}
                        {...rest}
                    />
                }
                {inputType === "date" &&
                    <WrapperGenericIcon
                        onClick={() => setIsVisibleDateMenu(prev => !prev)}
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
        </Container>
    );
}