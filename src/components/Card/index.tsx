import React from "react";
import "./card.css";

interface CardProps {
    titulo?: string;
    conteudo: string;
    textoInferior?: {
        textoDestacado: string;
        cor: string;
        textoNormal: string;
    };
    positivo?: Boolean;
}

const Card: React.FC<CardProps> = ({
    titulo,
    conteudo,
    textoInferior,
    positivo,
}) => {
    return (
        <div
            className={`card_Container ${
                positivo
                    ? "containerPositivo"
                    : positivo == undefined
                    ? ""
                    : "containerNegativo"
            }`}
        >
            <h5 className="card-title">{titulo}</h5>
            <p className="card-content">{conteudo}</p>
            <small className="card-footer">
                <span className={`destaque ${textoInferior?.cor}`}>
                    {textoInferior?.textoDestacado}
                </span>
                {textoInferior?.textoNormal}
            </small>
        </div>
    );
};

export default Card;
