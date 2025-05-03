import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
    return (
        <div data-tauri-drag-region className={styles.parent}>
            <Link to="/">Home</Link>
            <Link to="/pacientes">Pacientes</Link>
            <Link to="/">Especialistas</Link>
            <Link to="/">Agendamentos</Link>
            <Link to="/financas">Finanças</Link>
        </div>
    );
}

export default Sidebar;
