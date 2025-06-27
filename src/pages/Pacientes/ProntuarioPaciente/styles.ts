import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    background-color: ${theme.COLORS.BACKGROUND};
`;

export const Form = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    align-items: center;

    margin-bottom: 40px;
    padding-bottom: 100px;

    overflow-y: auto;

`;

export const FormContent = styled.div`
    flex: 1;
    width: 90%;
    padding-top: 30px;
`;

export const FormTitleRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 15px;
`;


export const ContainerInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    
    margin-bottom: 20px;
    gap: 10px;
`;

export const VariableRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    margin-bottom: 10px;
    gap: 15px;
`;

export const ContainerAnamneseCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
`;

export const VerticalWrapper = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;

    gap: 3px;
`;

export const SelectStyleWrapper = styled.div`
    padding-left: 10px;
`;

export const FirstSelectStyleWrapper = styled.div`
    margin-top: 8px;

`;