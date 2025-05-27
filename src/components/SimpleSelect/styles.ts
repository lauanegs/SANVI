import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 5px;
`;

export const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
`;

export const OptionWrapper = styled.button`
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: flex-start;

    background-color: ${theme.COLORS.FUMACA_BRANCA};
    border: none;
    gap: 2px;
`;