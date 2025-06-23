import { useEffect, useRef, useState } from "react";
import {
    Container,
    ContainerField,
    ContentWrapper,
    ErrorText,
    Input,
    Label,
    OptionsWrapper,
    TextElement,
    TouchableWrapperStyled,
    WrapperSimpleTouchable,
} from "./styles";
import { SelectInputProps } from "./types";
import Icon from "@components/Icon";
import theme from "theme";
import { useDebounce } from "hooks/useDebounce";

export function SelectInput({ elements, sizeType, label, canByOpen = true, onSelectOption, selectedOption, errorMessage }: SelectInputProps) {
    const [value, setValue] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [options, setOptions] = useState(elements);
    const [hasSelectedValue, setHasValueSelected] = useState(false);

    const selectRef = useRef<HTMLDivElement>(null);

    function searchOptions(searchText: string) {
        const validOptions = elements.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
        setOptions(validOptions);
        setHasValueSelected(false);
    }

    useDebounce(value, 500, searchOptions);

    const handleShowOptions = () => {
        setShowOptions((prev) => !prev);
    };

    const handleSelect = (option: string) => {
        setValue(option);
        onSelectOption(option);
        setShowOptions(false);
        setHasValueSelected(true);
    };

    useEffect(() => {
        setOptions(elements);
    }, [hasSelectedValue])

    useEffect(() => {
        if (!showOptions) {
            const isValidOptionSelected = elements.includes(value);

            if (isValidOptionSelected) return;

            setValue(elements[0]);
            setHasValueSelected(true);
        }
    }, [showOptions])

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
                <ContentWrapper>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} onClick={() => setShowOptions(true)} />
                    <WrapperSimpleTouchable
                        onClick={handleShowOptions}
                    >
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
                    </WrapperSimpleTouchable>
                </ContentWrapper>
                {showOptions &&
                    <OptionsWrapper
                        sizeType={sizeType}
                    >
                        {options.map((item, index) => (
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
            <ErrorText>
                {errorMessage && errorMessage}
            </ErrorText>
        </Container>
    );
}
