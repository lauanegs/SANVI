import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${theme.COLORS.BRANCO};
`;

export const HeaderTabs = styled.div`
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
    flex: 1;
    display: flex;
    flex-direction: column;

    margin: 12px 30px;
`;

export const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
`;

export const CheckBox = styled.div``;

export const ColunmLeftWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

export const ColunmRightWrapper= styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

export const FormTitleRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
`;

export const FormTitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const WrapperRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 30px;
`;
