import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
        display: flex;
        flex-direction: row;
        width: 90%;
        align-self: center;

        margin: 30px 0;
        align-items: center;
        justify-content: space-between;
    `;

    export const Tabs = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    `;

    export const TabWrapper = styled.div`
    background-color: ${theme.COLORS.FUMACA_BRANCA};
        :hover {
            background-color: ${theme.COLORS.FUMACA_BRANCA_50};
        }
    `;