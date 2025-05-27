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
    padding: 30px 60px 0 20px;
`;