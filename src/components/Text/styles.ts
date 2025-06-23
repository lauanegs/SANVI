import styled, { css } from "styled-components";
import { TextStyleProps } from "./types";
import theme from "theme";

export const TextComponent = styled.p<TextStyleProps>`
    font-size: ${({ size }) => size}px;
    font-weight: ${({ weight }) => weight ? weight : 400};

    ${({ color }) => color === "PRIMARY" && css`
        color: ${theme.COLORS.CINZA_ESCURO}
    `}
    ${({ color }) => color === "SECONDARY" && css`
        color: ${theme.COLORS.BRANCO}
    `}
    ${({ color }) => color === "TERTIARY" && css`
        color: ${theme.COLORS.AZUL_DA_FRANCA}
    `}
`;