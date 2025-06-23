import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: ${theme.COLORS.FUMACA_BRANCA};
`;

export const ContentContainer = styled.div`
    flex: 1;
    display: flex;
`;

export const LoaderWrapper = styled.div`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const ReloadWrapper = styled.div`
    display: flex;
    flex: 1;

    
    align-items: center;
    justify-content: center;
    background-color: ${theme.COLORS.FUMACA_BRANCA};

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