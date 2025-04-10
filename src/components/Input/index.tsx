import Icon from "@components/Icon";
import { Container, InputText, StyledDatePicker, WrapperGenericIcon, WrapperSearchIcon } from "./styles";
import { InputProps } from "./types";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";

export default function Input({ size, type, placeholder }: InputProps) {
    registerLocale("ptBR", ptBR);
    const [isOpenDateMenu, setIsOpenDateMenu] = useState(false);
    const [date, setDate] = useState(new Date());

    console.log(date);
    return (
        <Container
            size={size}
        >
            {type === "search" &&
                <WrapperSearchIcon>

                </WrapperSearchIcon>
            }

            {type === "date" ?
                <StyledDatePicker
                    locale="pt-BR"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => setDate(date)}
                    open={isOpenDateMenu}
                    onClickOutside={() => setIsOpenDateMenu(false)}
                    onSelect={() => setIsOpenDateMenu(false)}
                    onInputClick={() => setIsOpenDateMenu(true)}
                />
                :
                <InputText
                    placeholder={placeholder && placeholder || ""}
                />
            }

            {type === "date" &&
                <WrapperGenericIcon
                    onClick={() => setIsOpenDateMenu(prev => !prev)}
                >
                    <Icon
                        color="#000"
                        iconLibName="lia"
                        icon="LiaCalendarSolid"
                        size={15}
                    />
                </WrapperGenericIcon>

            }

            {type === "select" &&
                <WrapperGenericIcon>
                    <Icon
                        color="#000"
                        iconLibName="md"
                        icon="MdKeyboardArrowDown"
                        size={15}
                    />
                </WrapperGenericIcon>
            }

        </Container>
    );
}