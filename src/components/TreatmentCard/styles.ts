import styled from "styled-components";
import theme from "theme";

export const Container = styled.button`
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    border: none;
    padding: 0 15px;
    border-radius: 8px;
    border-left: 2.5px solid ${theme.COLORS.CINZA_NAVIO_DE_GUERRA};
    background-color: ${theme.COLORS.BRANCO};
    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.FUMACA_BRANCA_50};
    }
`;

export const WrapperIcon = styled.div`
    width: 46px;
    height: 46px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: 23px;
    background-color: ${theme.COLORS.AZUL_DA_FRANCA};
`;
