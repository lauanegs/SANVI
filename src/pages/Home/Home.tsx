import { useEffect, useState } from "react";
import styles from './home.module.css';
import AppointmentTable from "../../components/AppointmentTable/AppointmentTable";
import PatientCard from "../../components/AppointmentTable/patient-card";
import DentistList from "../../components/AppointmentTable/dentist-card";
import { GenericHeader } from "@components/GenericHeader";
import Card from "@components/Card";
import { API_URL } from "@api/connection.tsx"; // ajuste o caminho conforme sua estrutura

function Home() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [confirmedAppointmentsCount, setConfirmedAppointmentsCount] = useState(0);
  const [specialistsCount, setSpecialistsCount] = useState(0);

  useEffect(() => {
    // Buscar pacientes
    fetch(`${API_URL}/patient/dto`)
      .then((res) => res.json())
      .then((data) => {
        setPatientsCount(data.length);
      })
      .catch((err) => console.error("Erro ao buscar pacientes:", err));

    // 👇 BUSCAR ESPECIALISTAS E CONTAR SOMENTE OS DISPONÍVEIS
    const fetchAvailableSpecialists = async () => {
      try {
        const response = await fetch(`${API_URL}/specialist`);
        if (!response.ok) throw new Error("Erro ao buscar especialistas");
        const data: Specialist[] = await response.json();

        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const todayWeekDay = now.getDay() === 0 ? 7 : now.getDay();

        const statusChecks = await Promise.all(
          data.map(async (specialist) => {
            const scheduleRes = await fetch(`${API_URL}/specialist-schedule/specialist/${specialist.id}`);
            if (!scheduleRes.ok) return false;

            const scheduleList: Schedule[] = await scheduleRes.json();
            const todaysSchedules = scheduleList.filter(s => s.weekDay === todayWeekDay);

            if (todaysSchedules.length === 0) {
              return false;
            }

            const isAvailableNow = todaysSchedules.some(s => {
              const { startTime, endTime, startInterval, endInterval } = s;

              if (!startInterval || !endInterval) {
                return currentTime >= startTime && currentTime <= endTime;
              }

              return (
                (currentTime >= startTime && currentTime < startInterval) ||
                (currentTime >= endInterval && currentTime <= endTime)
              );
            });
            return isAvailableNow;
          })
        );

        const availableCount = statusChecks.filter(isAvailable => isAvailable).length;

        setSpecialistsCount(availableCount);
      } catch (error) {
        console.error("Erro ao buscar especialistas:", error);
      }
    };
    fetchAvailableSpecialists();

    // Buscar agendamentos confirmados
    fetch(`${API_URL}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        const confirmados = data.filter(
          (item: any) => item.status?.toLowerCase?.() === "confirmado"
        );
        setConfirmedAppointmentsCount(confirmados.length);
      })
      .catch((err) => console.error("Erro ao buscar agendamentos:", err));
  }, []);

  return (
    <main className={styles.fin_AlterContainer}>
      <GenericHeader />

      <div className={styles.content}>
        {/* Linha dos cards de estatísticas */}
        <div className={styles.header_container}>
          <Card
            titulo="Pacientes cadastrados"
            conteudo={`${patientsCount}`}
            positivo={true}
          />

          <Card
            titulo="Agendamentos confirmados"
            conteudo={`${confirmedAppointmentsCount}`}
            textoInferior={{
              textoDestacado: "",
              cor: "azul",
              textoNormal: "em andamento",
            }}
          />

          <Card
            titulo="Especialistas disponíveis"
            conteudo={`${specialistsCount}`}
            textoInferior={{
              textoDestacado: "",
              cor: "verde",
              textoNormal: "em atividade",
            }}
          />
        </div>

        {/* Cards lado a lado */}
        <div className={styles.cardsContainer}>
          <div className={styles.patientsColumn}>
            <h4>Próximos pacientes</h4>
            <PatientCard />
          </div>
          <div className={styles.dentistsColumn}>
            <h4>Especialistas disponíveis</h4>
            <DentistList />
          </div>
        </div>

        {/* Tabela centralizada abaixo */}
        <div className={styles.tableContainer}>
          <AppointmentTable />
        </div>
      </div>
    </main>
  );
}

export default Home;
