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
    width: 100%;
    margin: 5px 0;

    
    justify-content: space-around;
`;

export const LabelEntity = styled.p`
    font-size: 15px;

`;

export const SearchStyleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
    justify-content: flex-start;

    background-color: red;

    gap: 15px;
`;

export const Content = styled.div`
    flex: 1;
    padding: 15px;
`;
