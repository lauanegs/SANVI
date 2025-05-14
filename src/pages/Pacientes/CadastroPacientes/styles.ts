import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    flex: 1;

    padding: 0 10px;
    background-color: ${theme.COLORS.BRANCO};
`;

export const HeaderTabs = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin: 20px 0 40px 0;

`;

export const Tabs = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 12px;
    margin-left: 20px;
`;

export const DivMarginButton = styled.div`
    margin-right: 20px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

export const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    
    gap: 5px;
`;

export const CheckBox = styled.div`

`;

export const ContainerColunmForm = styled.div`
    display: flex;
    flex-direction: column;

    gap: 20px;
`;

export const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    
    gap: 30px;
`;