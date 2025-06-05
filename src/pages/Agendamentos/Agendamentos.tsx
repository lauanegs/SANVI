import Calendar from "../../components/calendar/calendar"
import styles from './Agendamentos.module.css';
import { GenericHeader } from "@components/GenericHeader";

export default function Calendario() {
  return (
    <main className={styles.fin_AlterContainer}>
      <GenericHeader></GenericHeader>
      <div className="w-full max-w-4xl h-[80vh] overflow-y-auto">
        <Calendar />
      </div>
    </main>
  )
}
