import styled, { css } from "styled-components";
import { InputSizeStyle } from "./types";
import theme from "theme";

export const Container = styled.div`
    
`;

export const ContainerField = styled.div<InputSizeStyle>`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: space-between;

    ${({ sizeType }) => sizeType === "PP" && css`
        width: 20%;
    `};
    ${({ sizeType }) => sizeType === "P" && css`
        width: 50%;
    `};
    ${({ sizeType }) => sizeType === "M" && css`
        width: 60%;
    `};
    ${({ sizeType }) => sizeType === "MG" && css`
        width: 75%;
    `};
    ${({ sizeType }) => sizeType === "G" && css`
        width: 100%;
    `};
    ${({ sizeType }) => typeof sizeType === "number" && css`
        width: ${sizeType}px;
    `};
    height: 32px;

    background-color: ${theme.COLORS.BRANCO};
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;


`;

export const Label = styled.p`
    font-size: 12px;
    
    margin-bottom: 8px;
`;

export const InputText = styled.input`
    width: 100%;
    height: 100%;
    padding: 0 8px;
    background-color: ${theme.COLORS.BRANCO};
    border: none;
    outline: none;
    box-sizing: border-box;
    
    &::placeholder {
        color: ${theme.COLORS.PLACEHOLDER};
        font-size: 12px;
    }
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

export const ErrorText = styled.p`
    height: 11px;
    font-size: 11px;
    color: ${theme.COLORS.ERROR};
`;

