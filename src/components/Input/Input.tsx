import styles from "./Input.module.css";
/* to-do: Finalizar implementação */
type Props = {
    type: string,
    tamanho: 'P' | 'M' | 'G',
    placeholder? : string,
    value? : string,
    onChange : (value: string) => void,
}

export default function Input(props : Props) {
    return (
        <div className={styles.main}>
            <input type={props.type}
                   value={props.value}
                   onChange={(e) => props.onChange(e.target.value)}
                   placeholder={props.placeholder ? props.placeholder : ""}>
            </input>
        </div>
    );
}