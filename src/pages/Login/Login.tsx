import Button from "@components/Button/Button"
import styles from "./Login.module.css"
import logo from "@assets/logo.svg"
import Input from "@components/Input/Input"
import { useNavigate } from "react-router-dom"


export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () =>
  {
    console.log("Pressed");  
    navigate("/home");
  }
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
            <Button value="Entrar" color="normal" onClick={handleLogin} />
        </div>
    </div>
  )
}
