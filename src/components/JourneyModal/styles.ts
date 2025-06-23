import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;

    gap: 30px;
    background-color: rgba(0,0,0, 0.5);
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    gap: 30px;
    background: none;
`;

export const JourneyWrappers = styled.div`
    display: flex;
    height: 100vh;

    flex-direction: column;
    align-items: center;
`;

export const JourneyMenuWrapper = styled.div`
    display: flex;

    align-items: center;
    justify-content: center;
`;

export const ListContainer = styled.div`
    display: flex;
    width: 300px;  
    flex : 1;

`;

export const TreatmentMenuWrapper = styled.div`
    display: flex;
`;

export const WrapperAddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 46px;
    height: 46px;

    border: none;
    border-radius: 23px;
    background-color: ${theme.COLORS.AZUL_DA_FRANCA};

    flex-shrink: 0;
    cursor: pointer;

    &:hover {
        background-color: ${theme.COLORS.AZUL_DA_FRANCA_60};
    }
`;

export const EmptyWrapper = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
    background: none;

`;

export const ReloadButton = styled.button`
    display: flex;
    flex-direction: column;

    border-radius: 100px;
    border: none;
    cursor: pointer;
    &:hover {
        opacity: 0.7;
    }
`;