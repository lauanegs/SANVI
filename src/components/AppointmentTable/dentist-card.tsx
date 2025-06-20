import styles from "./dentist-card.module.css"

interface DentistCardProps {
  name: string
  profession: string
  timeRange: string
  status: "pendente" | "disponivel"
}

export default function DentistCard({ name, profession, timeRange, status }: DentistCardProps) {
  const statusText = {
    pendente: "PENDENTE",
    disponivel: "DISPONÍVEL",
  }

  return (
    <div className={styles.card}>
      <div className={styles.leftContent}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.profession}>{profession}</p>
      </div>
      <div className={styles.rightContent}>
        <span className={`${styles.status} ${styles[status]}`}>{statusText[status]}</span>
        <span className={styles.time}>{timeRange}</span>
      </div>
    </div>
  )
}

// Example usage component
export function DentistCardExample() {
  return (
    <div className={styles.container}>
      <DentistCard name="João Santos Gomes" profession="Dentista" timeRange="8:00 - 16:00" status="pendente" />
      <DentistCard name="João Santos Gomes" profession="Dentista" timeRange="8:00 - 16:00" status="disponivel" />
    </div>
  )
}
