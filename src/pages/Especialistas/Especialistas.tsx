import { GenericHeader } from "@components/GenericHeader";
import Input from "@components/Input/Input";
import SimpleCard from "@components/SimpleCard";
import s from "./Especialista.module.css";
import theme from "theme";
import { useState } from "react";
import { NovoEspecialista } from "@components/NovoEspecialista";
import GenericButton from "@components/GenericButton";

function Especialistas() {
  const [tabEspecialista, setTabEspecialista] = useState(false);

  const [especialistas, setEspecialistas] = useState([
    {
      id: 1,
      nome: "João Santos Gomes",
      cpf: "123.456.789-10",
      info: "Cardiologista",
    },
    {
      id: 2,
      nome: "Gabriel Silva",
      cpf: "987.654.321-00",
      info: "Ortopedista",
    },
    {
      id: 3,
      nome: "Maria Oliveira",
      cpf: "321.654.987-00",
      info: "Dermatologista",
    },
    {
      id: 4,
      nome: "Ana Paula Souza",
      cpf: "456.123.789-11",
      info: "Pediatra",
    },
    {
      id: 5,
      nome: "Carlos Eduardo Lima",
      cpf: "741.852.963-00",
      info: "Ginecologista",
    },
    {
      id: 6,
      nome: "Fernanda Dias",
      cpf: "159.753.486-22",
      info: "Psiquiatra",
    },
  ]);

  return (
    <div
      className={s.Esp_container}
      style={{ backgroundColor: theme.COLORS.FUMACA_BRANCA }}
    >
      {tabEspecialista === false ? (
        <div>

          <GenericHeader></GenericHeader>
          <div className={s.Esp_header}>
            <GenericButton
              color="PRIMARY"
              title={tabEspecialista ? "Voltar para lista" : "Novo Especialista"}
              onClick={() => setTabEspecialista(!tabEspecialista)} />
          </div>




          <div className={s.Esp_body}>
            <div className={s.grid_container}>
              {especialistas.map((e) => (
                <div className={s.card} key={e.id}>
                  <SimpleCard
                    title={e.nome}
                    subtitle={e.cpf}
                    info={e.info}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <GenericHeader></GenericHeader>
          <div className={s.esp_headerContainer}>
            <div className={s.esp_cadastroTab}>Cadastro</div>
            <GenericButton
              title={"Salvar"}
              color={"PRIMARY"}
              onClick={() => { }}
            ></GenericButton>
          </div>
          <div className={s.Esp_header}>
            {/* <GenericButton
              color="PRIMARY"
              title={tabEspecialista ? "Voltar para lista" : "Novo Especialista"}
              onClick={() => setTabEspecialista(!tabEspecialista)} /> */}

          </div>
          
          <NovoEspecialista />
        </div>
      )}
    </div>
  );
}

export default Especialistas;