import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    width: 840px;
    height: 110px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 0 15px;
    border-radius: 8px;
    border-left: 2.5px solid ${theme.COLORS.CINZA_NAVIO_DE_GUERRA};
    background-color: ${theme.COLORS.BRANCO};
`;

export const WrapperIcon = styled.button`
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 23px;
    background-color: ${theme.COLORS.AZUL_DA_FRANCA};
    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.AZUL_DA_FRANCA_60};
    }
    
`;
