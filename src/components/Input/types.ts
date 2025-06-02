import React from 'react';

export type InputSizeType = 'PP' | 'P' | 'M' | 'MG' | 'G' | number;
export type InputType = 'text' | 'search' | 'date';

export type InputSizeStyle = {
    sizeType: InputSizeType;
} 

export type InputProps = {
  sizeType: InputSizeType;
  label?: string;
  inputType?: InputType;
  errorMessage?: string;
  onChangeDate?: (date: Date) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;