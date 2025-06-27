import styled, { css } from "styled-components";
import theme from "theme";
import { ColorButtonProp } from "./types";

export const Container = styled.button<ColorButtonProp>`
    background-color: ${({ color }) =>
        color === "PRIMARY"
            ? theme.COLORS.AZUL_DA_FRANCA
            : color === "SECONDARY" ? theme.COLORS.BRANCO : theme.COLORS.CINZA_ESCURO};
    color: ${({ color }) =>
        color === "SECONDARY" ? theme.COLORS.CINZA_ESCURO : theme.COLORS.BRANCO};

    border: none;
    width: 127px;
    height: 32px;

    border-radius: 4px;
    
    ${({color}) => color === "TERTIARY" ? css`` : css`
        cursor: pointer;
    `}
    
     ${({ color }) =>
        color !== "TERTIARY" &&
        css`
      &:hover {
        background-color: ${theme.COLORS.AZUL_DA_FRANCA_60};
      }
    `}
`;
