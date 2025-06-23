'use client'

import { useEffect, useState } from "react"
import styles from "./dentist-card.module.css"
import { API_URL } from "@api/connection.tsx"

interface Specialist {
  id: number
  name: string
  profession: string
}

interface Schedule {
  weekDay: number
  startTime: string
  endTime: string
  startInterval: string | null
  endInterval: string | null
}

interface SpecialistWithStatus extends Specialist {
  status: "disponivel" | "indisponivel"
  timeRange: string
}

export default function DentistList() {
  const [specialists, setSpecialists] = useState<SpecialistWithStatus[]>([])

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch(`${API_URL}/specialist`)
        if (!response.ok) throw new Error("Erro ao buscar especialistas")
        const data: Specialist[] = await response.json()

        const enriched = await Promise.all(
          data.map(async (specialist) => {
            try {
              const scheduleRes = await fetch(`${API_URL}/specialist-schedule/specialist/${specialist.id}`)
              if (!scheduleRes.ok) throw new Error("Erro ao buscar agenda")
              const scheduleList: Schedule[] = await scheduleRes.json()

              const now = new Date()
              const currentTime = now.toTimeString().slice(0, 5) // "HH:MM"
              const todayWeekDay = now.getDay() === 0 ? 7 : now.getDay()

              // Filtra todos os horários do dia de hoje
              const todaysSchedules = scheduleList.filter(s => s.weekDay === todayWeekDay)

              if (todaysSchedules.length === 0) {
                // Sem horário hoje
                return {
                  ...specialist,
                  status: "indisponivel",
                  timeRange: "Não disponível"
                }
              }

              // Constrói a string com todos os horários de hoje (ex: "08:00 às 10:00 e 12:00 às 17:00")
              const timeRangesStrings = todaysSchedules.map(s => {
                return `${s.startTime} às ${s.endTime}`
              })

              // Verifica se o horário atual está dentro de algum dos períodos de atendimento considerando intervalos
              const isAvailableNow = todaysSchedules.some(s => {
                const { startTime, endTime, startInterval, endInterval } = s

                // Se não tem intervalo, basta verificar se currentTime está entre startTime e endTime
                if (!startInterval || !endInterval) {
                  return currentTime >= startTime && currentTime <= endTime
                }

                // Se tem intervalo, verifica se currentTime está antes do intervalo ou depois
                // Está disponível se estiver entre startTime e startInterval OU entre endInterval e endTime
                return (
                  (currentTime >= startTime && currentTime < startInterval) ||
                  (currentTime >= endInterval && currentTime <= endTime)
                )
              })

              return {
                ...specialist,
                status: isAvailableNow ? "disponivel" : "indisponivel",
                timeRange: timeRangesStrings.join(" e ")
              }
            } catch (error) {
              console.error(`Erro na agenda do especialista ${specialist.name}`, error)
              return {
                ...specialist,
                status: "indisponivel",
                timeRange: "Agenda indisponível"
              }
            }
          })
        )

        setSpecialists(enriched)
      } catch (err) {
        console.error("Erro ao carregar especialistas:", err)
      }
    }

    fetchSpecialists()
  }, [])

  const statusText = {
    indisponivel: "INDISPONÍVEL",
    disponivel: "DISPONÍVEL"
  }

  return (
    <div className={styles.container}>
      {specialists.map((specialist) => (
        <div key={specialist.id} className={styles.card}>
          <div className={styles.leftContent}>
            <h3 className={styles.name}>{specialist.name}</h3>
            <p className={styles.profession}>{specialist.profession}</p>
          </div>
          <div className={styles.rightContent}>
            <span className={`${styles.status} ${styles[specialist.status]}`}>
              {statusText[specialist.status]}
            </span>
            <span className={styles.time}>{specialist.timeRange}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
