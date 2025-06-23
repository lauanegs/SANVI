import { InputSizeStyle } from "@components/Input/types";
import styled, { css } from "styled-components";
import theme from "theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerField = styled.div<InputSizeStyle>`
  position: relative; /* ✅ Adição aqui para ancoragem das opções */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ sizeType }) =>
    sizeType === "PP" &&
    css`
      width: 20%;
    `};
  ${({ sizeType }) =>
    sizeType === "P" &&
    css`
      width: 50%;
    `};
  ${({ sizeType }) =>
    sizeType === "M" &&
    css`
      width: 60%;
    `};
  ${({ sizeType }) =>
    sizeType === "MG" &&
    css`
      width: 75%;
    `};
  ${({ sizeType }) =>
    sizeType === "G" &&
    css`
      width: 100%;
    `};
  ${({ sizeType }) =>
    typeof sizeType === "number" &&
    css`
      width: ${sizeType}px;
    `};

  height: 32px;

  background-color: ${theme.COLORS.BRANCO};
  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;
`;

export const Label = styled.p`
  font-size: 12px;
  margin-bottom: 8px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  cursor: pointer;
`;

export const TextElement = styled.p`
  font-size: 12px;
  text-align: left;
  user-select: none;
`;

export const TouchableWrapper = styled.button`
  border: none;
  background: none;
`;

export const TouchableWrapperStyled = styled.button`
  width: 100%;
  border: none;
  background: none;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    background-color: ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}33;
  }
`;

export const OptionsWrapper = styled.div<InputSizeStyle>`
  position: absolute;
  top: 100%; /* ✅ Alinha as opções imediatamente abaixo do campo */
  left: 0;
  right: 0;

  ${({ sizeType }) =>
    sizeType === "PP" &&
    css`
      width: 20%;
    `};
  ${({ sizeType }) =>
    sizeType === "P" &&
    css`
      width: 50%;
    `};
  ${({ sizeType }) =>
    sizeType === "M" &&
    css`
      width: 60%;
    `};
  ${({ sizeType }) =>
    sizeType === "MG" &&
    css`
      width: 75%;
    `};
  ${({ sizeType }) =>
    sizeType === "G" &&
    css`
      width: 100%;
    `};
  ${({ sizeType }) =>
    typeof sizeType === "number" &&
    css`
      width: ${sizeType}px;
    `};

  max-height: 150px;
  overflow-y: auto;

  background-color: ${theme.COLORS.BRANCO};
  border: 1px solid ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}33;
  border-radius: 5px;
  box-shadow: 1px 2px 8px ${theme.COLORS.CINZA_NAVIO_DE_GUERRA}44;

  z-index: 1000;
`;
