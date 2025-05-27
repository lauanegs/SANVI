import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    background-color: ${theme.COLORS.FUMACA_BRANCA};
`;

export const Form = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 30px 60px 0 60px;

    padding-bottom: 50px;

    overflow-y: auto;
`;

export const FormTitleRowWrapper = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
`;

export const FormContent = styled.div`
    padding: 10px;
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

    gap: 15px;
`;

export const ContainerAnamneseCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
`;