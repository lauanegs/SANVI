import styles from "./CardSimples.module.css";

type Props = {
    titulo: string,
    subtitulo: string,
    texto: string
}

export default function CardSimples(props : Props) {
    return(
        <div className={styles.mainDiv}>
            <h3>{props.titulo}</h3>
            <p>{props.subtitulo}</p>
            <p>{props.texto}</p>
        </div>
    );
}