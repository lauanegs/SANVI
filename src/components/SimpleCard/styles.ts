import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    width: 346px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    border-left: 2px solid ${theme.COLORS.CINZA_ESCURO};

    padding: 10px;

    background-color: ${theme.COLORS.BRANCO};
    gap: 2px;
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

