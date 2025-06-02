import styled from "styled-components";
import theme from "theme";

export const Container = styled.button`
    width: 288px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    border: none;
    border-left: 2px solid ${theme.COLORS.CINZA_ESCURO};
    border-radius: 5px;

    padding: 10px 10px 20px 10px;

    background-color: ${theme.COLORS.BRANCO};
    box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;
    gap: 2px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.FUMACA_BRANCA_50};
    }
`;

export const InfoTitle = styled.text`
    color: ${theme.COLORS.CINZA_ESCURO};
    font-size: 15px;
    font-weight: 500;
`;

export const InfoText = styled.text`
    color: ${theme.COLORS.CINZA_ESCURO};
    font-size: 12px;
    font-weight: 400;
`;

