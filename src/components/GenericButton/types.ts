type ButtonColor = "PRIMARY" | "SECONDARY";

export type ColorButtonProp = {
    color: ButtonColor;
}

export type ButtonProps = {
    title: string,
    color: ButtonColor,
    onClick: () => void,
}