import styled from "styled-components";
import theme from "theme";

export const Container = styled.button`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: flex-start;

    border: none; /* Remove todas as outras bordas */
    border-bottom: 3px solid ${theme.COLORS.AZUL_DA_FRANCA};

    padding: 0 45px 16px 0;
    gap: 16px;

    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.FUMACA_BRANCA_50};
    }
`;

export const Title = styled.p`
    font-size: 15px;
    color: ${theme.COLORS.CINZA_ESCURO};

`;
