import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: 16px;
`;

export const Title = styled.p`
    font-size: 15px;
    color: ${theme.COLORS.CINZA_ESCURO};

`;

export const BottomLine = styled.div`
    height: 3px;
    width: 108px;
    
    background-color: ${theme.COLORS.AZUL_DA_FRANCA};
    
`;