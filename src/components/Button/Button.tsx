import styles from "./Button.module.css";

type ButtonProps = {
    value: string,
    color: "normal" | "contraste" | "escuro",
    onClick: any

}

function Button(props : ButtonProps ) {
  return (
    <button className={styles.button} 
            style={{
                    backgroundColor: style(props.color).bg,
                    color: style(props.color).font
                }}
            onClick={props.onClick}
    >
        {props.value}
    </button>
  )
}

const style = (cor : string) => {
    switch (cor){
        case 'normal':
            return {bg: '#1E87F0', font: '#FFFFFF'};
            break;
        
        case 'contraste':
            return {bg: '#FFFFFF', font: '#1E87F0'};
            break;

        case 'escuro':
            return {bg: '#0060C0', font: '#FFFFFF'};
            break;
        
        default:
            return {bg: '#FFFFFF', font: '#FFFFFF'};
            break;
    }
}

export default Button