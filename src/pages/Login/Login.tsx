import styles from "./Login.module.css";
import logo from "@assets/logo.svg";
import Input from "@components/Input/index.tsx";
import { useNavigate } from "react-router-dom";
import GenericButton from "@components/GenericButton";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "@api/login";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const mutation = useMutation({
        mutationFn: fetchLogin,
        onSuccess: () => {
            navigate("/home");
        },
        onError: (error) => {
            console.log("Erro: ", error);
        },
    });

    const handleSubmit = () => {
        mutation.mutate({ username, password });
    };
    return (
        <div data-tauri-drag-region className={styles.bg}>
            <div className={styles.main}>
                <div className={styles.logo}>
                    <img src={logo} width={130} height={130} />
                    <p>Bem-vindo!</p>
                </div>
                <div className={styles.campos}>
                    <label>Usuário</label>
                    <Input
                        sizeType="P"
                        value={username}
                        onChange={(text) => setUsername(text.target.value)}
                    />
                    <label>Senha</label>
                    <Input
                        sizeType="P"
                        type={"password"}
                        value={password}
                        onChange={(pass) => setPassword(pass.target.value)}
                    />
                </div>
                <GenericButton
                    color="PRIMARY"
                    title={mutation.isPending ? "Entrando..." : "Entrar"}
                    onClick={handleSubmit}
                />
                {mutation.isError && (
                    <p style={{ color: "red" }}>
                        {(mutation.error as Error).message}
                    </p>
                )}
            </div>
        </div>
    );
}
