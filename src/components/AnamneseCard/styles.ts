import styled from "styled-components";
import theme from "theme";

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 10px;
    padding: 10px;
`;

export const TextFieldWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: ${theme.COLORS.BRANCO};
    padding: 8px 15px;
    border-radius: 5px;
`;

export const TextField = styled.textarea`
    width: 100%;
    size: 12px;
    text-overflow: ellipsis;
    border: none;
    border-radius: 5px;
    resize: none;
    overflow: auto;

    scrollbar-width: none;      /* Firefox */
    -ms-overflow-style: none;   /* IE e Edge antigo */

    &::-webkit-scrollbar {
        display: none;            /* Chrome, Safari, Edge moderno */
    }
`;