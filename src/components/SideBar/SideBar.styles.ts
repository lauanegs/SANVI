import styled, { css } from "styled-components";
import theme from "theme";
import { ScreenCardStyles } from "./SideBar.types";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;

    gap: 5px;

    background-color: ${theme.COLORS.AZUL_CELESTE_CLARO};
`;

export const UserTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 5px;
    margin: 15px 0 80px 20px;
`;

export const ScreenCardWrapper = styled.div`
    width: 226px;
    height: 50px;
    display: flex;
    flex-direction: row;

    align-items: center;

    border-radius: 8px;

    margin: 0 12px;

    cursor: pointer;

    :hover {
        background-color: ${theme.COLORS.BRANCO};
    }
`;

export const ScreenCardWrapperHover = styled.div<ScreenCardStyles>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;

    align-items: center;
    justify-content: space-between;

    border-radius: 8px;
    padding: 0 10px;

    ${({isSelected}) => isSelected && css`
        background-color: ${theme.COLORS.BRANCO};
    `}
`;

export const ScreenCardTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 5px;
`; 