import styles from './home.module.css';
import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import PatientCard from "../../components/AppointmentTable/patient-card";
import { DentistCardExample } from "../../components/AppointmentTable/dentist-card";
import {GenericHeader} from "@components/GenericHeader"

function Home() {
  return (
    <main className={styles.fin_AlterContainer}>
      <GenericHeader></GenericHeader>
      {/* Cards lado a lado */}
      <div className={styles.cardsContainer}>
        <div className={styles.patientsColumn}>
          <PatientCard /> {/* exibe os 3 pacientes mais próximos */}
        </div>
        <div className={styles.dentistsColumn}>
          <DentistCardExample />
        </div>
      </div>

      {/* Calendário abaixo, centralizado */}
      <div className={styles.tableContainer}>
        <AppointmentTable />
      </div>
    </main>
  );
}

export default Home;
