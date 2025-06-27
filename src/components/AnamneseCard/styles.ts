import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 10px;
`;

export const TextFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${theme.COLORS.BRANCO};
    padding: 8px 15px;
    border-radius: 5px;
    box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;
`;

export const TextField = styled.textarea`
    width: 100%;
    size: 12px;
    border: none;
    border-radius: 5px;
    resize: none;
    outline: none;
    background-color: ${theme.COLORS.BRANCO};

`;