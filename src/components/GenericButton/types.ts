type ButtonColor = "PRIMARY" | "SECONDARY" | "TERTIARY";

export type ColorButtonProp = {
    color: ButtonColor;
};

export type ButtonProps = {
    title?: string;
    color: ButtonColor;
    onClick?: () => void;
    disabled?: boolean; 
};
