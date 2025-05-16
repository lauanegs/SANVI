"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@api/connection.tsx";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../DialogCalendar/dialog";
import { Button } from "../Button/Button";
import styles from "./event-modal.module.css";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // só a data (ex: 2025-05-20)
  time: string; // só a hora (ex: 15:30)
  color: string;
  patient: string; // atualmente nome, mas usaremos id no envio
  specialist: string; // atualmente nome, mas usaremos id
  phone: string;
  status: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent | Omit<CalendarEvent, "id">) => void;
  selectedDate: string;
  selectedEvent: CalendarEvent | null;
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedEvent,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("08:00");
  const [color, setColor] = useState("#90CAF9");
  const [patient, setPatient] = useState(""); // armazenar id do paciente como string
  const [specialist, setSpecialist] = useState(""); // armazenar id do especialista
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const [patientsList, setPatientsList] = useState<any[]>([]);
  const [specialistsList, setSpecialistsList] = useState<any[]>([]); // agora guarda objetos completos

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setTime(selectedEvent.time);
      setColor(selectedEvent.color);
      setPatient(selectedEvent.patient); // aqui deve ser id do paciente
      setSpecialist(selectedEvent.specialist); // id do especialista
      setPhone(selectedEvent.phone || "");
      setStatus(selectedEvent.status);
    } else {
      setTitle("");
      setTime("08:00");
      setColor("#90CAF9");
      setPatient("");
      setSpecialist("");
      setPhone("");
      setStatus("");
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/patient`)
        .then((res) => res.json())
        .then((data) => {
          setPatientsList(data);
        })
        .catch((err) => console.error("Erro ao buscar pacientes:", err));

      fetch(`${API_URL}/specialist`)
        .then((res) => res.json())
        .then((data) => {
          setSpecialistsList(data);
        })
        .catch((err) => console.error("Erro ao buscar especialistas:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    // Atualiza telefone baseado no paciente selecionado
    const selectedPatient = patientsList.find((p) => p.id.toString() === patient);
    if (selectedPatient && selectedPatient.phoneNumber) {
      setPhone(selectedPatient.phoneNumber.toString());
    } else {
      setPhone("");
    }
  }, [patient, patientsList]);

  const handleSubmit = () => {
    try {
      const dateTimeISO = new Date(`${selectedDate}T${time}`).toISOString();
  
      const statusMap: Record<string, string> = {
        CONFIRMED: "Confirmado",
        PENDING: "Criado",
        CANCELED: "Cancelado",
        COMPLETED: "Concluído",
      };
  
      const mappedStatus = statusMap[status.toUpperCase()];
      if (!mappedStatus) {
        alert("Status inválido.");
        return;
      }
  
      const eventData = {
        patient: { id: Number(patient) },
        specialists: specialist ? [{ id: Number(specialist) }] : [],
        date: dateTimeISO,
        status: mappedStatus,
      };
  
      console.log("🟡 Dados enviados:", eventData);
  
      const url = selectedEvent
        ? `${API_URL}/appointments/${selectedEvent.id}`
        : `${API_URL}/appointments/create`;
  
      const method = selectedEvent ? "PUT" : "POST";
  
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
          }
          return res.json();
        })
        .then((data) => {
          onSave(selectedEvent ? { ...eventData, id: selectedEvent.id } : data);
        })
        .catch((err) => {
          console.error("❌ Erro ao enviar os dados:", err);
          alert("Erro ao salvar o agendamento. Verifique os campos e tente novamente.");
        });
    } catch (err) {
      console.error("❌ Erro inesperado:", err);
      alert("Erro inesperado ao enviar os dados.");
    }
  };
  
  

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{selectedEvent ? "Editar horário" : "Novo horário"}</DialogTitle>
          <DialogDescription>
            {selectedEvent
              ? "Atualize as informações abaixo."
              : "Preencha os dados do atendimento:"}
          </DialogDescription>
        </DialogHeader>

        <div className={styles.form}>
          <select value={patient} onChange={(e) => setPatient(e.target.value)}>
            <option value="">Selecione o paciente</option>
            {patientsList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <select value={specialist} onChange={(e) => setSpecialist(e.target.value)}>
            <option value="">Selecione o especialista</option>
            {specialistsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "8px" }}>
            <input type="date" value={selectedDate} disabled style={{ flex: 1 }} />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Celular do paciente"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ flex: 1 }}
              disabled
            />
          </div>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Selecione o status</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="PENDING">Pendente</option>
            <option value="CANCELED">Cancelado</option>
          </select>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {selectedEvent ? "Salvar alterações" : "Criar horário"}
          </Button>
          <DialogClose>
            <Button onClick={onClose}>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
