"use client";

import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { Clock } from "lucide-react";
import { Button } from "../Button/Button";
import EventModal, { CalendarEvent } from "./event-modal";
import styles from "./calendar.module.css";
import { API_URL } from "@api/connection.tsx";

export default function Calendar() {
  const calendarRef = useRef<any>(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    updateMonthTitle();
    fetchEvents();
  }, []);

  // Função para buscar eventos da API
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/appointments`); // Ajuste a rota conforme seu backend
      if (!response.ok) throw new Error("Erro ao buscar eventos");
      const data = await response.json();
      console.log("Eventos da API:", data);
      setEvents(data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  };

  const updateMonthTitle = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentDate = calendarApi.getDate();
      const monthYear = currentDate.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      });
      const formattedMonthYear = monthYear.charAt(0).toUpperCase() + monthYear.slice(1);
      setCurrentMonth(formattedMonthYear);
    }
  };

  const handlePrevMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      updateMonthTitle();
    }
  };

  const handleNextMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      updateMonthTitle();
    }
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    if (!selectedDate) {
      const today = new Date();
      setSelectedDate(today.toISOString().split("T")[0]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEvent = async (eventData: CalendarEvent | Omit<CalendarEvent, "id">) => {
    try {
      let updatedEvent: CalendarEvent;

      if ("id" in eventData) {
        // Edição
        const response = await fetch(`${API_URL}/appointments/${eventData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) throw new Error("Erro ao atualizar evento");

        updatedEvent = await response.json();

        setEvents((prevEvents) =>
          prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
      } else {
        // Criação
        const response = await fetch(`${API_URL}/appointments/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        });

        if (!response.ok) throw new Error("Erro ao criar evento");

        updatedEvent = await response.json();

        setEvents((prev) => [...prev, updatedEvent]);
      }

      setIsModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
    }
  };

  const handleDateClick = (info: any) => {
    setSelectedEvent(null);
    setSelectedDate(info.dateStr);
    setIsModalOpen(true);
  };

  const handleEventClick = (info: any) => {
    const eventId = info.event.id;
    const extended = info.event.extendedProps;

    const clickedEvent: CalendarEvent = {
      id: eventId,
      date: info.event.startStr,
      time: extended.time,
      patient: extended.patient,
      specialist: extended.specialist,
      phone: extended.phone,
      status: extended.status,
      valor: extended.valor,
    };

    console.log("Evento selecionado:", clickedEvent);

    setSelectedEvent(clickedEvent);
    setIsModalOpen(true);
  };

  const renderEventContent = (eventInfo: any) => {
    const patient = eventInfo.event.extendedProps.patient;
    const patientName = patient?.name || "Paciente";

    // A data está no formato ISO com hora e fuso, então extraia só a hora para mostrar:
    const eventDateStr = eventInfo.event.start || eventInfo.event.extendedProps.date;
    const eventTime = eventDateStr
      ? new Date(eventDateStr).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
      : "";


    const status = eventInfo.event.extendedProps.status;

    return (
      <div className={`${styles.eventContent} ${status === "Criado" ? styles.eventPendente :
          status === "Concluído" ? styles.eventConcluido :
            status === "Confirmado" ? styles.eventConfirmado :
              status === "Cancelado" ? styles.eventCancelado : ""
        }`}>
        <div className={styles.eventTitle}>{patientName}</div>
        <div className={styles.eventTime}>
          <Clock className={styles.clockIcon} size={14} />
          <span>{eventTime}</span>
        </div>
      </div>

    );
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <div className={styles.monthNavigation}>
          <span>{currentMonth}</span>
          <div className={styles.navigationButtons}>
            <button className={styles.navButton} onClick={handlePrevMonth}>
              &lt;
            </button>
            <button className={styles.navButton} onClick={handleNextMonth}>
              &gt;
            </button>
          </div>
        </div>
        <Button variant="primary" size="md" onClick={handleAddEvent}>
          Novo horário
        </Button>
      </div>

      <div className={styles.calendar}>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={ptBrLocale}
          headerToolbar={false}
          dayHeaderFormat={{ weekday: "long" }}
          events={events.map((event) => ({
            id: event.id,
            date: event.date,
            extendedProps: {
              time: event.time,
              patient: event.patient,
              specialist: event.specialist,
              phone: event.phone,
              status: event.status,
            },
          }))}
          eventContent={renderEventContent}
          height="auto"
          fixedWeekCount={false}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          datesSet={updateMonthTitle}
          dayCellContent={(args) => <div className={styles.dayNumber}>{args.dayNumberText}</div>}
          dayHeaderContent={(args) => <div className={styles.dayHeader}>{args.text}</div>}
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
        selectedEvent={selectedEvent}
      />
    </div>
  );
}
