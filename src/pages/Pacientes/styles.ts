import { styled } from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex: 1;

    flex-direction: column;
    background-color: ${theme.COLORS.FUMACA_BRANCA};
`;

export const CommandHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 95%;
    margin: 5px 0;

    align-items: center;

    align-self: center;
    justify-content: space-between;
`;

export const LabelEntity = styled.p`
    font-size: 15px;

`;

export const SearchStyleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 15px;
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
   
    padding: 15px;
    
`;

export const LoaderWrapper = styled.div`
    align-self: center;
    margin-left: auto;
    margin-right: auto;
`;

export const ButtonWrapper = styled.div`
    padding-top: 8px;
`;
