import { useEffect, useState } from "react";
import styles from "./patient-card.module.css";
import { API_URL } from "@api/connection.tsx";

type CalendarEvent = {
  id: number;
  date: string;  // usa "date" mesmo, conforme seu log
  patient: {
    name: string;
  };
};

export default function PatientCard() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/appointments/dto`);
        if (!response.ok) throw new Error("Erro ao buscar eventos");
        const data = await response.json();
        console.log(data);
        setEvents(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);

  console.log("Data atual (now):", now);
  console.log("Data limite (7 dias depois):", sevenDaysFromNow);

  const upcomingEvents = events
    .map(event => {
      const dateObj = new Date(event.date);
      console.log("Mapeando evento:", event, "-> date:", dateObj);
      return {
        ...event,
        dateObj,
      };
    })
    .filter(event => {
      const isInRange = event.dateObj >= now && event.dateObj <= sevenDaysFromNow;
      console.log(
        `Filtrando evento: ${event.patient?.name || "Sem nome"}, date: ${event.dateObj}, está no intervalo?`,
        isInRange
      );
      return isInRange;
    })
    .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    .slice(0, 3);

  console.log("Próximos eventos:", upcomingEvents);

  return (
    <div>
      {upcomingEvents.length > 0 ? (
        upcomingEvents.map(event => (
          <div key={event.id} className={styles.patientCard}>
            <div className={styles.content}>
              <h3 className={styles.title}>
                Próximo paciente –{" "}
                {event.dateObj.toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </h3>
              <p className={styles.patientName}>{event.patient.name}</p>

            </div>
          </div>
        ))
      ) : (
        <p>Nenhum paciente agendado nos próximos 7 dias.</p>
      )}
    </div>
  );
}
