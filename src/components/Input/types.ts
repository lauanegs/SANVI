import React from 'react';

export type InputSizeType = 'PP' | 'P' | 'M' | 'MG' | 'G' | number;
export type InputType = 'text' | 'search' | 'date' | 'time';

export type InputSizeStyle = {
    sizeType: InputSizeType;
} 

export type InputProps = {
  sizeType: InputSizeType;
  label?: string;
  inputType?: InputType;
  errorMessage?: string;
  onVisibleDateMenu?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;