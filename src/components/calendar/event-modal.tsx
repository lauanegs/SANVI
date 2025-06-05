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
  date: string; // só a data (ex: 2025-05-20)
  time: string; // só a hora (ex: 15:30)
  patient: string; // id do paciente como string
  specialist: string; // id do especialista
  phone: string;
  status: string;
  valor: string;
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

  const [treatment, setTreatment] = useState("");
  const [treatmentsList, setTreatmentsList] = useState<any[]>([]);

  const [date, setDate] = useState(selectedDate);
  const [time, setTime] = useState("08:00");
  const [patient, setPatient] = useState(""); // armazenar id do paciente como string
  const [specialist, setSpecialist] = useState(""); // armazenar id do especialista
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [isTreatmentConciliated, setIsTreatmentConciliated] = useState(false);
  const [value, setValue] = useState('');



  const [patientsList, setPatientsList] = useState<any[]>([]);
  const [specialistsList, setSpecialistsList] = useState<any[]>([]);

  const resetForm = () => {
    setTreatment("");
    setTreatmentsList([]);
    setDate(selectedDate); // Reseta para a data originalmente selecionada
    setTime("08:00");
    setPatient(""); // Apenas um paciente
    setSpecialist(""); // Apenas um especialista
    setPhone("");
    setStatus("");
    setIsTreatmentConciliated(false);
    setValue('');
  };


  // Sincroniza dados quando selectedEvent ou selectedDate mudam
  useEffect(() => {
    if (selectedEvent) {

      setTime(selectedEvent.time || "08:00");

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
            return "Confirmado";
          case "criado":
            return "Criado";
          case "cancelado":
            return "Cancelado";
          case "concluído":
            return "Concluido";
          default:
            return "";
        }
      });

      setDate(selectedEvent.date.split("T")[0]);
    } else {
      setTime("08:00");
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

      fetch(`${API_URL}/treatment`)
        .then((res) => res.text())  // pega a resposta como texto bruto
        .then((text) => {
          console.log("Resposta crua da API:", text);  // aqui você vê exatamente o que está vindo
          try {
            const data = JSON.parse(text);  // tenta fazer o parse do JSON
            setTreatmentsList(data);        // se der certo, atualiza o estado
          } catch (err) {
            console.error("Erro ao parsear JSON:", err, text); // se falhar, mostra o erro e o texto que causou erro
          }
        })
        .catch((err) => console.error("Erro ao buscar tratamentos:", err));


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

    const selectedPatient = patientsList.find((p) => p.id.toString() === patient);
    const selectedSpecialist = specialistsList.find((s) => s.id.toString() === specialist);

    console.log("🧍 Paciente selecionado:", selectedPatient);
    console.log("🧑‍⚕️ Especialista selecionado:", selectedSpecialist);

    if (!selectedPatient || !selectedSpecialist) {
      alert("Paciente ou especialista inválido.");
      return;
    }

    if (!status || !date || !time) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const eventData = {
      patientId: selectedPatient.id,
      specialistId: selectedSpecialist.id,
      date: dateTimeISO,
      confirmPhoneNumber: selectedPatient.phoneNumber.toString(), // ou use outro campo se desejar
      hasTreatment: !!treatment, // true se houver tratamento selecionado
      treatmentId: treatment,
      value: Number(value) || 0, // valor do atendimento; ajuste conforme necessário
      status: status, // Enviar como "Criado", "Confirmado", etc. (sem mapear)
    };

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

      // ou crie um callback `onDelete` separado se quiser tratar diferente
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
          <label htmlFor="patient">Paciente</label>
          <select
            id="patient"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          >
            <option value="">Selecione o paciente</option>
            {patientsList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <label htmlFor="specialist">Especialista</label>
          <select
            id="specialist"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          >
            <option value="">Selecione o especialista</option>
            {specialistsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <label htmlFor="date">Data</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ flex: 1 }}
            />

            <label htmlFor="time" style={{ alignSelf: 'center' }}>Hora</label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>

          <label htmlFor="phone">Celular do paciente</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="phone"
              type="text"
              placeholder="Celular do paciente"
              value={phone}
              style={{ flex: 1 }}

            />
          </div>

          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Selecione o status</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Criado">Pendente</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Concluído">Concluído</option>
          </select>

          {!selectedEvent && (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={isTreatmentConciliated}
                  onChange={(e) => setIsTreatmentConciliated(e.target.checked)}
                />
                Conciliar tratamento
              </label>

              <label htmlFor="treatment">Tratamento</label>
              <select
                id="treatment"
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                disabled={!isTreatmentConciliated} // aqui está a condição
              >
                <option value="">Selecione o tratamento</option>
                {treatmentsList.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>

              <label htmlFor="value">Valor</label>
              <input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </>
          )}

        </div>

        <DialogFooter>
          <Button onClick={() => {
            handleSubmit();
            resetForm();
          }}>
            {selectedEvent ? "Atualizar" : "Salvar"}
          </Button>

          {selectedEvent && (
            <Button onClick={handleDelete}>
              Excluir
            </Button>
          )}

          <DialogClose>
            <Button
              variant="secondary"
              onClick={() => {
                resetForm();
                onClose();
              }}
            >
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );

}
