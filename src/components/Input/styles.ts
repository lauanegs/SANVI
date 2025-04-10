import styled, { css } from "styled-components";
import { InputSizeStyle } from "./types";
import theme from "theme";
import DatePicker from "react-datepicker";

export const Container = styled.div<InputSizeStyle>`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;

    ${({size}) => size === "PP" && css`
        width: 68px;
    `};
    ${({size}) => size === "P" && css`
        width: 216px;
    `};
    ${({size}) => size === "M" && css`
        width: 300px;
    `};
    ${({size}) => size === "G" && css`
        width: 580px;
    `};
    height: 32px;

    background-color: ${theme.COLORS.BRANCO};
    border: 2px solid transparent;
    border-radius: 5px;
    box-shadow: 2px 3px 10px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA};

`;

export const InputText = styled.input`
    flex: 1;
    padding: 0 5px;
    border: none;
    outline: none;
    
`;

export const WrapperSearchIcon = styled.div`
    align-self: flex-start;
    padding: 0 5px;
`;

export const WrapperGenericIcon = styled.div`
    padding: 0 5px;
`;

export const StyledDatePicker = styled(DatePicker)`
    flex: 1;
    border: none;
    outline: none;
`;