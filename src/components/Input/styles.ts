import styled, { css } from "styled-components";
import { InputSizeStyle } from "./types";
import theme from "theme";

export const Container = styled.div`
    
`;

export const ContainerField = styled.div<InputSizeStyle>`
    display: flex;
    flex-direction: row;
    position: relative;

    align-items: center;
    justify-content: space-between;

    ${({ sizeType }) => sizeType === "PP" && css`
        width: 68px;
    `};
    ${({ sizeType }) => sizeType === "P" && css`
        width: 216px;
    `};
    ${({ sizeType }) => sizeType === "M" && css`
        width: 300px;
    `};
    ${({ sizeType }) => sizeType === "MG" && css`
        width: 450px;
    `};
    ${({ sizeType }) => sizeType === "G" && css`
        width: 580px;
    `};
    height: 32px;

    background-color: ${theme.COLORS.BRANCO};
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 2px 3px 10px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA};

`;

export const Label = styled.p`
    font-size: 12px;
    
    margin-bottom: 8px;
`;

export const InputText = styled.input`
    flex: 1;
    background-color: ${theme.COLORS.BRANCO};
    margin: 0 4px;
    border: none;
    outline: none;
    
`;

export const WrapperSearchIcon = styled.div`
    margin-left: 5px;
`;

export const WrapperGenericIcon = styled.div`
    margin-right: 10px;
    
    &:hover {
        cursor: pointer;
    }
`;

