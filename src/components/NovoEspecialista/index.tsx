import { useState } from "react";
import styles from "./styles.module.css"

export function NovoEspecialista() {
  const [formData, setFormData] = useState({
    idEspecialista: '123456',
    dataRegistro: '2024-02-26',
    nome: 'João Ribeiro dos Santos',
    profissao: 'Professor',
    cpf: 'XXX.XXX.XXX-XX',
    logradouro: 'Rua José de Santana',
    rg: 'MGXX.XXX.XXX',
    bairro: 'Ipanema',
    numero: '3456',
    uf: 'MG',
    dataNascimento: '2024-02-26',
    sexo: 'Masc',
    cep: 'XXXXX',
    ddd: '+55',
    celular: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className={styles.NE_container}>
      <div className={styles.formContainer}>
        <h2>Informações Gerais</h2>
        <div className={styles.formSection}>
          <div className={styles.formGroup}>
            <label>ID Especialista</label>
            <input type="text" name="idEspecialista" value={formData.idEspecialista} onChange={handleChange} readOnly />
          </div>
          <div className={styles.formGroup}>
            <label>Data de registro</label>
            <input type="date" name="dataRegistro" value={formData.dataRegistro} onChange={handleChange} />
          </div>
        </div>

        <h2>Informações do Especialista</h2>
        <div className={styles.formSection}>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Nome Completo</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Profissão</label>
            <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>CPF</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Logradouro</label>
            <input type="text" name="logradouro" value={formData.logradouro} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>RG</label>
            <input type="text" name="rg" value={formData.rg} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Bairro</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Número</label>
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>UF</label>
            <select name="uf" value={formData.uf} onChange={handleChange}>
              <option value="MG">MG</option>
              <option value="SP">SP</option>
              <option value="RJ">RJ</option>
              <option value="BA">BA</option>
              {/* Adicione mais estados conforme necessário */}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Data de Nascimento</label>
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Sexo</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="Masc">Masculino</option>
              <option value="Fem">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>CEP</label>
            <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>DDD</label>
            <select name="ddd" value={formData.ddd} onChange={handleChange}>
              <option value="+55">+55</option>
              <option value="+1">+1</option>
              <option value="+351">+351</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Celular</label>
            <input type="text" name="celular" placeholder="(xx) xxxxx-xxxx" value={formData.celular} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}