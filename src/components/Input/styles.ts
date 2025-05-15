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
    justify-content: center;

    ${({ size }) => size === "PP" && css`
        width: 68px;
    `};
    ${({ size }) => size === "P" && css`
        width: 216px;
    `};
    ${({ size }) => size === "M" && css`
        width: 300px;
    `};
    ${({ size }) => size === "MG" && css`
        width: 450px;
    `};
    ${({ size }) => size === "G" && css`
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

export const SelectOptions = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${theme.COLORS.BRANCO};

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;

    position: absolute;
    top: 35px;
    right: 0;
`;

export const WrapperOptions = styled.div`
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Option = styled.p`
    font-size: medium;
    text-align: center;

    margin-bottom: 5px;

    &:hover {
        color: ${theme.COLORS.AZUL_DA_FRANCA};
        cursor: pointer;
    }
`;