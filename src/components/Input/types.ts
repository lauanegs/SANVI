export type InputType = "search" | "date" | "select";

export type InputSize = "PP" | "P" | "M" | "G";

export type InputSizeStyle = {
    size: InputSize
}

export type InputProps = {
    size: InputSize,
    placeholder? : string,
    type?: InputType,
}