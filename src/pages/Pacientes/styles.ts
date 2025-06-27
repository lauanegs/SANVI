import { styled } from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex: 1;

    flex-direction: column;
    background-color: ${theme.COLORS.BACKGROUND};
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
    padding-bottom: 4px;
`;


export const ReloadWrapper = styled.div`
    display: flex;
    flex: 1;

    align-items: center;
    justify-content: center;
    background-color: ${theme.COLORS.BACKGROUND};

`;

export const ReloadButton = styled.button`
    display: flex;
    flex-direction: column;

    border-radius: 100px;
    border: none;
    &:hover {
        opacity: 0.7;
    }
`;

export const EmptyWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const CleanWrapper = styled.button`
    border: none;
    background: none;
    cursor: pointer;


`;