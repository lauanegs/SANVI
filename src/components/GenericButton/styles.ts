import styled from "styled-components";
import theme from "theme";
import { ColorButtonProp } from "./types";

export const Container = styled.button<ColorButtonProp>`
    background-color: ${({ color }) =>
        color === "PRIMARY"
            ? theme.COLORS.AZUL_DA_FRANCA
            : theme.COLORS.BRANCO};
    color: ${({ color }) =>
        color === "PRIMARY" ? theme.COLORS.BRANCO : theme.COLORS.CINZA_ESCURO};

    width: 127px;
    height: 32px;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
    
     &:hover {
        background-color: ${theme.COLORS.AZUL_DA_FRANCA_60};
    }
`;
`;
