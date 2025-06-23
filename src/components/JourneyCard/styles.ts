import styled from "styled-components";
import theme from "theme";

export const Container = styled.button`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    border: none;
    background-color: ${theme.COLORS.BRANCO};
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.FUMACA_BRANCA};
    }

`;

export const DateHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 10px 15px;
    justify-content: flex-start;
    
    border-bottom: 1px solid ${theme.COLORS.CINZA_ESCURO};
`;

export const Content = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    align-items: flex-start;

`;

export const WrapperInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    gap: 5px;
    padding: 15px

`;