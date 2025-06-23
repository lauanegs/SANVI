import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    
    border-radius: 4px;
    background-color: ${theme.COLORS.BRANCO};
`;

export const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 30px;
    height: 30px;
    align-self: flex-end;

    border-radius: 15px;
    background-color: ${theme.COLORS.BRANCO};
    margin: 30px 0 20px 0;
    box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;

    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.FUMACA_BRANCA_50};
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;

`;

export const HeaderLine = styled.div`
    height: 1px;
    width: 100%;

    background-color: ${theme.COLORS.CINZA_ESCURO};
    margin: 20px 0 15px 0;
`;

export const InputWrapper = styled.div`
    margin-bottom: 10px;
    width: 100%;
`;


export const SaveButtonWrapper = styled.div`
    align-self: center;
    margin: 10px 0;
`;