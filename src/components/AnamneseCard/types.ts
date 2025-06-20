export type AnamneseCardProps = {
    title?: string;
    onHeightChange: (value: number, isSum: boolean) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>