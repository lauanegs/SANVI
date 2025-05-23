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
  patient: string; // id do paciente como string
  specialist: string; // id do especialista
  phone: string;
  status: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent | Omit<CalendarEvent, "id">) => void;
  selectedDate: string;
  selectedEvent: any | null; // aceitando any pois a estrutura pode variar
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  selectedEvent,
}: EventModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState("08:00");
  const [color, setColor] = useState("#90CAF9");
  const [patient, setPatient] = useState(""); // armazenar id do paciente como string
  const [specialist, setSpecialist] = useState(""); // armazenar id do especialista
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const [patientsList, setPatientsList] = useState<any[]>([]);
  const [specialistsList, setSpecialistsList] = useState<any[]>([]);

  // Sincroniza dados quando selectedEvent ou selectedDate mudam
  useEffect(() => {
    if (selectedEvent) {
      // Corrige título "undefined" como string
      setTitle(
        selectedEvent.title && selectedEvent.title !== "undefined"
          ? selectedEvent.title
          : ""
      );

      setTime(selectedEvent.time || "08:00");
      setColor(selectedEvent.color || "#90CAF9");

      // Se patient for objeto, pegar id e telefone
      if (
        selectedEvent.patient &&
        typeof selectedEvent.patient === "object" &&
        selectedEvent.patient !== null
      ) {
        setPatient(selectedEvent.patient.id?.toString() || "");
        setPhone(
          selectedEvent.patient.phoneNumber
            ? selectedEvent.patient.phoneNumber.toString()
            : ""
        );
      } else {
        setPatient(selectedEvent.patient || "");
        setPhone(selectedEvent.phone || "");
      }

      if (
        selectedEvent.specialist &&
        typeof selectedEvent.specialist === "object" &&
        selectedEvent.specialist !== null
      ) {
        setSpecialist(selectedEvent.specialist.id?.toString() || "");
      } else {
        setSpecialist(selectedEvent.specialist || "");
      }




      setStatus(() => {
        switch (selectedEvent.status.toLowerCase()) {
          case "confirmado":
            return "CONFIRMED";
          case "criado":
            return "PENDING";
          case "cancelado":
            return "CANCELED";
          case "concluído":
            return "COMPLETED";
          default:
            return "";
        }
      });

      setDate(selectedEvent.date.split("T")[0]);
    } else {
      setTitle("");
      setTime("08:00");
      setColor("#90CAF9");
      setPatient("");
      setSpecialist("");
      setPhone("");
      setStatus("");
      setDate(selectedDate);
    }
  }, [selectedEvent, selectedDate]);

  // Buscar pacientes e especialistas quando modal abrir
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

  // Atualiza telefone quando paciente mudar
  useEffect(() => {
    const selectedPatient = patientsList.find(
      (p) => p.id.toString() === patient
    );
    if (selectedPatient && selectedPatient.phoneNumber) {
      setPhone(selectedPatient.phoneNumber.toString());
    } else {
      setPhone("");
    }
  }, [patient, patientsList]);

  const handleSubmit = () => {
    console.log("📤 Iniciando envio do formulário");

    const dateTimeISO = new Date(`${date}T${time}`).toISOString();
    console.log("📅 Data e hora combinadas (ISO):", dateTimeISO);

    const statusMap: Record<string, string> = {
      CONFIRMED: "Confirmado",
      PENDING: "Criado",
      CANCELED: "Cancelado",
      COMPLETED: "Concluído",
    };

    const mappedStatus = statusMap[status.toUpperCase()];
    console.log("📌 Status mapeado:", mappedStatus);

    if (!mappedStatus) {
      alert("Status inválido.");
      return;
    }

    const selectedPatient = patientsList.find((p) => p.id.toString() === patient);
    const selectedSpecialist = specialistsList.find((s) => s.id.toString() === specialist);

    console.log("🧍 Paciente selecionado:", selectedPatient);
    console.log("🧑‍⚕️ Especialista selecionado:", selectedSpecialist);

    if (!selectedPatient || !selectedSpecialist) {
      alert("Paciente ou especialista inválido.");
      return;
    }

    const eventData = {
      patient: {
        id: selectedPatient.id,
        name: selectedPatient.name,
        birthDate: selectedPatient.birthDate,
        phoneNumber: selectedPatient.phoneNumber,
        address: selectedPatient.address,
        gender: selectedPatient.gender,
        rg: selectedPatient.rg,
        cpf: selectedPatient.cpf,
      },
      specialist: {
        id: selectedSpecialist.id,
        name: selectedSpecialist.name,
        birthDate: selectedSpecialist.birthDate,
        phoneNumber: selectedSpecialist.phoneNumber,
        address: selectedSpecialist.address,
        gender: selectedSpecialist.gender,
        rg: selectedSpecialist.rg,
        cpf: selectedSpecialist.cpf,
      },
      date: dateTimeISO,
      status: mappedStatus,
    };

    if (selectedEvent?.id) {
      eventData.id = selectedEvent.id;
    }

    console.log("📦 Dados preparados para envio:", eventData);

    const url = selectedEvent
      ? `${API_URL}/appointments/${selectedEvent.id}`
      : `${API_URL}/appointments/create`;

    const method = selectedEvent ? "PUT" : "POST";

    console.log("🌐 URL da requisição:", url);
    console.log("📬 Método da requisição:", method);

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    })
      .then(async (res) => {
        console.log("📨 Resposta recebida (status):", res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Erro do servidor:", errorText);
          throw new Error(`Erro na requisição: ${res.status} - ${errorText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Dados salvos com sucesso:", data);
        onSave(selectedEvent ? { ...eventData, id: selectedEvent.id } : data);
      })
      .catch((err) => {
        console.error("❌ Erro ao enviar os dados:", err);
        alert("Erro ao salvar o agendamento. Verifique os campos e tente novamente.");
      });
  };





  const handleDelete = async () => {
    if (!selectedEvent || !selectedEvent.id) return;

    const confirmDelete = window.confirm("Tem certeza que deseja excluir este agendamento?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/appointments/${selectedEvent.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao excluir: ${response.status} - ${errorText}`);
      }

      onSave(null); // ou crie um callback `onDelete` separado se quiser tratar diferente
      onClose();    // Fecha o modal
    } catch (error) {
      console.error("Erro ao excluir o evento:", error);
      alert("Não foi possível excluir o agendamento.");
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ flex: 1 }}
            />
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
              style={{ flex: 1 }}
              disabled
            />
          </div>

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Selecione o status</option>
            <option value="CONFIRMED">Confirmado</option>
            <option value="PENDING">Pendente</option>
            <option value="CANCELED">Cancelado</option>
            <option value="COMPLETED">Concluído</option>
          </select>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>
            {selectedEvent ? "Atualizar" : "Salvar"}
          </Button>
          {selectedEvent && (
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          )}

          <DialogClose asChild>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
