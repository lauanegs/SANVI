import React from 'react';

export type InputSizeType = 'PP' | 'P' | 'M' | 'MG' | 'G';
export type InputType = 'text' | 'search' | 'date';

export type InputSizeStyle = {
    sizeType: InputSizeType;
} 

export type InputProps = {
  sizeType: InputSizeType;
  label?: string;
  elements?: string[];
  inputType?: InputType;
} & React.InputHTMLAttributes<HTMLInputElement>;