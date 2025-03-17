import { IconBaseProps } from "react-icons";
import styles from "./Input.module.css";

type Props = {
    tamanho: 'P' | 'M' | 'G',
    placeholder? : string,
}

export default function Input(props : Props) {
    return (
        <div className={styles.main}>
            <input placeholder={props.placeholder ? props.placeholder : ""}></input>            
        </div>
    );
}