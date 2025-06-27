import styled, { css } from "styled-components";
import theme from "theme";
import { StyleProps } from "./types";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`;

export const SelectWrapper = styled.div<StyleProps>`
    display: flex;
    ${({direction}) => direction === "horizontal" && css`
        flex-direction: row;
    `}
    ${({direction}) => direction === "vertical" && css`
        flex-direction: column;
    `}

    gap: 5px;
`;

export const OptionWrapper = styled.button`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    background-color: ${theme.COLORS.BACKGROUND};
    border: none;
    gap: 2px;
`;