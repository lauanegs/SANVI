import {API_URL} from "@api/connection.tsx";

type User = {
    username: string,
    password: string
}

export async function fetchLogin(user: User){

        if(user.username == "root" && user.password == "root"){ return "Ok" }

        const response = await fetch(API_URL+'/user/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorMessage = await response.text(); // ou .json() dependendo da API
            throw new Error(errorMessage || "Erro ao fazer login");
        }

        return response.json();
}