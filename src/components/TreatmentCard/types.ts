export type JorneyCardProps = {
    count: number,
    title: string,
    startDate: string,
    onClick: () => void;
    disabled?: boolean;
}