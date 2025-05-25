import React from "react";
import "./cardAlerta.css";

interface CardProps {
    id: number;
    titulo: string;
    conteudo: string;
    acao: () => void;
}

const CardAlerta: React.FC<CardProps> = ({ titulo, conteudo, acao }) => {
    return (
        <div className="card">
            <div className="card-content">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-description">{conteudo}</p>
            </div>

            <button onClick={acao} className="card-button">
                Fechar
            </button>
        </div>
    );
};

export default CardAlerta;
