import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    -webkit-app-region: drag;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

export const WrapperButtons = styled.div`
    -webkit-app-region: no drag;
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 8px;
    margin: 10px 16px 10px 0;
`;

export const ActionButton = styled.button`
    width: 22px;
    height: 22px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 12px;
    background-color: ${theme.COLORS.AZUL_DA_FRANCA};

    &:hover{
        background-color: ${theme.COLORS.AZUL_DA_FRANCA_60};
    }

`;