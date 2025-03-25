import Button from "../components/Button"
import styles from "./Login.module.css"
import logo from "../assets/logo.svg"
import Input from "../components/Input"

export default function Login() {
  return (
    <div data-tauri-drag-region  className={styles.bg}>
        <div className={styles.main}>
            <div className={styles.logo}>
                <img src={logo} width={130} height={130}/>
                <p>Bem-vindo!</p>
            </div>
            <div className={styles.campos}>
                <label>Usuário</label>
                <Input tamanho="P" />
                <label>Senha</label>            
                <Input tamanho="P" />
            </div>
            <Button value="Entrar" color="normal"/>
        </div>
    </div>
  )
}
