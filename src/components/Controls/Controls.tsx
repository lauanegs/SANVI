import styles from "./Controls.module.css";
import React from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window'; // Importa a nova API para obter a janela atual
import { FaRegWindowMinimize, FaRegWindowMaximize, FaRegCircleXmark } from "react-icons/fa6";

const data = new Date();
const Controls: React.FC = () => {

    const appWindow = getCurrentWindow();
  return (

    <div data-tauri-drag-region className={styles.parent}>
        {/* <div className={styles.info}>
            <p>{data.getUTCDate()}</p>
        </div>
        <div className={styles.buttons}>
            <button onClick={() => appWindow.minimize()}><FaRegWindowMinimize /></button>
            <button onClick={() => appWindow.close()}><FaRegCircleXmark/></button>
        </div> */}
    </div>
  );
};

export default Controls;
