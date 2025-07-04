import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    
    flex-direction: column;
    background-color: ${theme.COLORS.BACKGROUND};
`;

export const Form = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    margin-bottom: 40px;
    padding-bottom: 100px;

    overflow-y: auto;
`;

export const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const CheckBox = styled.div``;

export const FormContentWrapper = styled.div`
    width: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;

`;

export const FormTitleRowWrapper = styled.div`
    display: flex;
    width: 90%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
`;

export const ColunmsWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: row;

    gap: 15px;

`;

export const ColunmLeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 35%;

    gap: 20px;
`;

export const ColunmRightWrapper= styled.div`
    display: flex;
    flex-direction: column;
    width: 65%;

    gap: 20px;
`;

export const WrapperInput = styled.div`
    display: flex;
    flex-direction: row;

    width: 100%
`;

export const WrapperInputStyle = styled.div`
    width: 50%

`;

export const ColumnCenterWrapper = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;

    margin-bottom: 40px;
    gap: 15px;
    
`;

export const ColumnCenterRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;

    gap: 15px;
`;

export const VariableRowWrapper = styled.div`
`;

