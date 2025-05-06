import Icon from "@components/Icon";
import { Container, InputText, WrapperGenericIcon, WrapperSearchIcon, SelectOptions, WrapperOptions, Option } from "./styles";
import { InputProps } from "./types";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import theme from "theme";
import { FixedSizeList as List } from "react-window";

export default function Input({ size, type, placeholder, elements = [] }: InputProps) {
    registerLocale("ptBR", ptBR);
    const [isVisibleDateMenu, setIsVisibleDateMenu] = useState(false);
    const [date, setDate] = useState(new Date());
    const [heightStyleSelectMenu, setHeightStyleSelectMenu] = useState(0);
    const [inputValue, setInputValue] = useState('');

    const elementRow = ({ index }) => (
        <WrapperOptions>
            <Option
                onClick={() => setInputValue(elements[index])}

            >{elements[index]}</Option>
        </WrapperOptions>
    );

    const widthStyleElement =
        size === "PP" ? 68 :
            size === "P" ? 216 :
                size === "G" || size === "M" ? 300 : 0;

    const openSelectMenu = () => {
        setHeightStyleSelectMenu(200);
    }

    const closeSelectMenu = () => {
        setHeightStyleSelectMenu(0);
    }

    return (
        <Container
            size={size}
        >
            {type === "search" &&
                <WrapperSearchIcon>
                    <Icon
                        iconLibName="lu"
                        icon="LuSearch"
                        color={theme.COLORS.CINZA_ESCURO}
                        size={15}
                    />
                </WrapperSearchIcon>
            }


            {type === "date" ?
                <DatePicker
                    locale="pt-BR"
                    selected={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={date => date && setDate(date)}
                    open={isVisibleDateMenu}
                    onClickOutside={() => setIsVisibleDateMenu(false)}
                    onSelect={() => setIsVisibleDateMenu(false)}
                    onInputClick={() => setIsVisibleDateMenu(true)}
                    customInput={<InputText />}

                />
                :
                <InputText
                    disabled={type === "select"}
                    placeholder={placeholder && placeholder || ""}
                    value={inputValue}
                    onChange={text => setInputValue(text.target.value)}
                />
            }

            {type === "date" &&
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

            {type === "select" &&
                <WrapperGenericIcon
                    onClick={() => {
                        if (heightStyleSelectMenu > 0) closeSelectMenu();
                        else openSelectMenu();

                    }}
                >
                    {heightStyleSelectMenu > 0 ?
                        <Icon
                            color={theme.COLORS.CINZA_ESCURO}
                            iconLibName="md"
                            icon="MdKeyboardArrowUp"
                            size={15}
                        />
                        :
                        <Icon
                            color={theme.COLORS.CINZA_ESCURO}
                            iconLibName="md"
                            icon="MdKeyboardArrowDown"
                            size={15}
                        />
                    }

                </WrapperGenericIcon>
            }

            <SelectOptions
                style={{ height: heightStyleSelectMenu }}
            >
                <List
                    itemCount={elements.length}
                    height={heightStyleSelectMenu}
                    width={widthStyleElement}
                    itemSize={50}
                >
                    {elementRow}
                </List>
            </SelectOptions>

        </Container>
    );
}