import Calendar from "../../components/calendar/calendar"
import styles from './Agendamentos.module.css';
import { GenericHeader } from "@components/GenericHeader";

export default function Calendario() {
  return (
    <main className={styles.fin_AlterContainer}>
      <GenericHeader/>
      <div 
      style={{
        width: "100%",
        height: "100%",
      }}
      >
        <Calendar />
      </div>
    </main>
  )
}
