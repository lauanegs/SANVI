import styles from "./Controls.module.css";
import React from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window'; // Importa a nova API para obter a janela atual

const Controls: React.FC = () => {

    const appWindow = getCurrentWindow();
  return (

    <div data-tauri-drag-region className={styles.parent}>
        <div className={styles.info}>
            <p>Data Hora</p>
        </div>
        <div className={styles.buttons}>
            <button onClick={() => appWindow.minimize()}>Minimizar</button>
            <button onClick={() => appWindow.maximize()}>Maximizar</button>
            <button onClick={() => appWindow.close()}>Fechar</button>
        </div>
    </div>
  );
};

export default Controls;
