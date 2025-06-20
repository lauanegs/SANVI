type DirectionType =
    | "horizontal"
    | "vertical";

export type StyleProps = {
    direction: DirectionType
}

export type SimpleSelectProps = {
    title: string,
    state?: boolean,
    direction?: DirectionType
    onChangeState: (state: boolean) => void;
}