'use client'

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import styles from "./AppointmentTable.module.css"
import { API_URL } from "@api/connection.tsx"

interface Patient {
  name: string
  // Adicione outros campos se necessário
}

interface Specialist {
  name: string
  // Adicione outros campos se necessário
}

interface Appointment {
  id: string
  date: string // formato esperado: "dd-MM-yyyy"
  time: string
  patient: Patient
  specialist: Specialist
  treatment: string
  status: "cancelado" | "pendente" | "confirmado"
}

export default function AppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [weekDates, setWeekDates] = useState<Date[]>([])
  const [activeDayIndex, setActiveDayIndex] = useState<number>(0)

  useEffect(() => {
    const today = new Date()
    const firstDayOfWeek = new Date(today)
    firstDayOfWeek.setDate(today.getDate() - today.getDay())

    const dates = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek)
      day.setDate(firstDayOfWeek.getDate() + i)
      dates.push(day)
    }

    setWeekDates(dates)
    setActiveDayIndex(today.getDay())
  }, [])

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_URL}/appointments`)
        if (!response.ok) throw new Error("Erro ao buscar agendamentos")
        const data = await response.json()
        console.log(data)
        setAppointments(data)
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error)
      }
    }

    fetchAppointments()
  }, [])

  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]

  const formatDateKey = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const parseAppointmentDate = (dateString: string) => {
    const date = new Date(dateString)
    return formatDateKey(date)
  }

  const selectedDateKey = weekDates[activeDayIndex]
    ? formatDateKey(weekDates[activeDayIndex])
    : ""

  const filteredAppointments = appointments.filter((appt) => {
    const apptDateKey = parseAppointmentDate(appt.date)
    return apptDateKey === selectedDateKey
  })

  const formatDateDisplay = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    return `${day}/${month}`
  }

  const handlePrevDay = () => {
    setActiveDayIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextDay = () => {
    setActiveDayIndex((prev) => (prev < weekDates.length - 1 ? prev + 1 : prev))
  }


  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cancelado":
        return styles.statusCancelado
      case "Pendente":
        return styles.statusPendente
      case "Confirmado":
        return styles.statusConfirmado
      case "Concluído":
        return styles.statusConcluído
      default:
        return ""
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.dayNavigation}>
        <button className={styles.navButton} onClick={handlePrevDay}>
          <ChevronLeft size={16} color="white" />
        </button>

        <div className={styles.dayButtons}>
          {weekDates.map((date, index) => (
            <button
              key={index}
              className={`${styles.dayButton} ${activeDayIndex === index ? styles.dayButtonActive : ""
                }`}
              onClick={() => setActiveDayIndex(index)}
            >
              <div className={styles.dayName}>{weekDays[date.getDay()]}</div>
              <div className={styles.dayDate}>{formatDateDisplay(date)}</div>
            </button>
          ))}
        </div>

        <button className={styles.navButton} onClick={handleNextDay}>
          <ChevronRight size={16} color="white" />
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Data</th>
              <th>Horário</th>
              <th>Paciente</th>
              <th>Especialista</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.tableCell}>
                  Nenhum agendamento para este dia.
                </td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    {new Date(appointment.date).toLocaleDateString("pt-BR")}
                  </td>
                  <td className={styles.tableCell}>
                    {new Date(appointment.date).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className={styles.tableCell}>{appointment.patient.name}</td>
                  <td className={styles.tableCell}>{appointment.specialist.name}</td>
                  <td className={styles.tableCell}>
                    <span
                      className={`${styles.statusBadge} ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <button className={styles.completeScheduleLink}>Agenda completa</button>
      </div>
    </div>
  )
}
