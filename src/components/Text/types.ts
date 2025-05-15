type TextColor = 'PRIMARY' | 'SECONDARY' | 'TERTIARY'

export type TextStyleProps = {
    size: number;
    color: TextColor;
    weight?: number;
}

export type TextProps = {
    size: number;
    color: TextColor;
    weight?: number;
    text: string;
}