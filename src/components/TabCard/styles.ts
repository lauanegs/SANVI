import styled from "styled-components";
import theme from "theme";

export const Container = styled.button`
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: flex-start;

    border: none; /* Remove todas as outras bordas */
    border-bottom: 2px solid ${theme.COLORS.AZUL_DA_FRANCA};

    background-color: ${theme.COLORS.BACKGROUND};

    border-top-right-radius: 4px;
    padding: 5px 45px 16px 5px;
    gap: 16px;

    cursor: pointer;
    
    font-size: 15px;
    color: ${theme.COLORS.CINZA_ESCURO};

    &:hover {
        background-color: ${theme.COLORS.AZUL_DA_FRANCA};
        color: ${theme.COLORS.BRANCO}
    }
`;

