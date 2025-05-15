import styles from "./Login.module.css";
import logo from "@assets/logo.svg";
import { useNavigate } from "react-router-dom";
import GenericButton from "@components/GenericButton";


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
          
            <GenericButton
              color="PRIMARY"
              title="Login"
              onClick={handleLogin}
            />
        </div>
    </div>
  )
}
