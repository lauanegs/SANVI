import { InputSizeType } from "@components/Input/types";

export type SelectInputProps = {
    sizeType: InputSizeType;
    selectedOption?: string; 
    canByOpen?: boolean;
    label?: string;
    elements: string[];
    onSelectOption: (option: string) => void;
    errorMessage?: string
}