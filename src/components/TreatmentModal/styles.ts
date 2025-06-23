import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    
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
    justify-content: center;
    align-items: flex-start;

    gap: 30px;
    background: none;
`;

export const JourneyWrappers = styled.div`
    display: flex;
    flex-direction: column;

    overflow: auto;
`;

export const JourneyMenuWrapper = styled.div`
    display: flex;
 `;

export const TreatmentMenuWrapper = styled.div`
    display: flex;
`;