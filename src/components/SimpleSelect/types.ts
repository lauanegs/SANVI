type DirectionType =
    | "horizontal"
    | "vertical";

export type StyleProps = {
    direction: DirectionType
}

export type SimpleSelectProps = {
    title: string,
    direction?: DirectionType
    onChangeState: (state: boolean) => void;
}