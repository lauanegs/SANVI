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
import { SelectInputPesquisarProps } from "./types";
import Icon from "@components/Icon";
import theme from "theme";

export function SelectInputPesquisar({
  elements,
  sizeType,
  label,
  canByOpen = true,
  onSelectOption,
  selectedOption,
}: SelectInputPesquisarProps) {
  const [value, setValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredElements, setFilteredElements] = useState(elements);

  const selectRef = useRef<HTMLDivElement>(null);

  const handleShowOptions = () => {
    if (!canByOpen) return;
    setShowOptions((prev) => !prev);
  };

  const handleSelect = (option: string) => {
    setValue(option);
    setSearchQuery("");
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
  }, [canByOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtra as opções conforme o texto digitado
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredElements(elements);
    } else {
      const results = elements.filter((el) =>
        el.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredElements(results);

      // Se sobrar exatamente uma opção, seleciona automaticamente
      if (results.length === 1) {
        handleSelect(results[0]);
      }
    }
  }, [searchQuery, elements]);

  return (
    <Container ref={selectRef}>
      {label && <Label>{label}</Label>}

      <ContainerField sizeType={sizeType}>
        <ContentWrapper onClick={handleShowOptions}>
          {showOptions ? (
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 12,
              }}
              autoFocus
            />
          ) : (
            <TextElement>{value || "Selecione uma opção"}</TextElement>
          )}
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

        {showOptions && (
          <OptionsWrapper
            sizeType={sizeType}
            style={{
              transition: "max-height 0.3s ease",
            }}
          >
            {filteredElements.map((item, index) => (
              <TouchableWrapperStyled
                key={index}
                onClick={() => handleSelect(item)}
              >
                <TextElement>{item}</TextElement>
              </TouchableWrapperStyled>
            ))}
            {filteredElements.length === 0 && (
              <TextElement style={{ padding: "8px" }}>Nenhuma opção encontrada</TextElement>
            )}
          </OptionsWrapper>
        )}
      </ContainerField>
    </Container>
  );
}
