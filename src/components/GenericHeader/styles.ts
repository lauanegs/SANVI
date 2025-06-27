import styled from 'styled-components';
import theme from 'theme';

export const Container = styled.div`
    display: flex;
    width: 100%;

    align-items: center;
    justify-content: space-between;

    background-color: ${theme.COLORS.BRANCO};
    border-bottom: 1px solid ${theme.COLORS.CINZA_ESCURO};
`;

export const WrapperLogo = styled.div`
    padding: 0 10px;
`;

export const DefaultTitle = styled.p`
    font-size: 15px;
    color: ${theme.COLORS.AZUL_DA_FRANCA};
    padding: 1px 10px;
`;