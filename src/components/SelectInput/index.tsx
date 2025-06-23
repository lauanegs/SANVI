import { useEffect, useRef, useState } from "react";
import {
    Container,
    ContainerField,
    ContentWrapper,
    Label,
    OptionsWrapper,
    TextElement,
    TouchableWrapperStyled,
} from "./styles";
import { SelectInputProps } from "./types";
import Icon from "@components/Icon";
import theme from "theme";

export function SelectInput({ elements, sizeType, label, canByOpen = true, onSelectOption, selectedOption }: SelectInputProps) {
    const [value, setValue] = useState('');
    const [showOptions, setShowOptions] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    const handleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleSelect = (option: string) => {
        setValue(option);
        onSelectOption(option);
        setShowOptions(false);
    };

    useEffect(() => {
        if (selectedOption) {
            setValue(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        if (!canByOpen) setShowOptions(false);
    }, [canByOpen])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setShowOptions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Container ref={selectRef}>
            {label && <Label>{label}</Label>}

            <ContainerField sizeType={sizeType}>
                <ContentWrapper onClick={handleShowOptions}>
                    <TextElement>{value}</TextElement>
                    {showOptions ? (
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronUp"
                            color={theme.COLORS.CINZA_NAVIO_DE_GUERRA}
                            size={15}
                        />
                    ) : (
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronDown"
                            color={theme.COLORS.CINZA_NAVIO_DE_GUERRA}
                            size={15}
                        />
                    )}
                </ContentWrapper>
                {showOptions &&
                    <OptionsWrapper
                        sizeType={sizeType}
                        style={{
                            transition: 'max-height 0.3s ease',
                        }}
                    >
                        {elements.map((item, index) => (
                            <TouchableWrapperStyled
                                key={index}
                                onClick={() => handleSelect(item)}
                            >
                                <TextElement>{item}</TextElement>
                            </TouchableWrapperStyled>
                        ))}
                    </OptionsWrapper>
                }
            </ContainerField>
        </Container>
    );
}