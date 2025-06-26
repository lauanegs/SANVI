"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@api/connection.tsx";
import Input from "@components/Input/index"
import Modal from "@components/Modal/Modal";
import { Button } from "../Button/Button";
import { SelectInputPesquisar } from "@components/SelectInputPesquisar";
import styles from "./event-modal.module.css";
import * as Yup from "yup";
import { formatPhoneNumber } from "utils/formatFunctions";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";

const eventSchema = Yup.object().shape({
  patientId: Yup.string().required("Paciente é obrigatório."),
  specialistId: Yup.string().required("Especialista é obrigatório."),
  date: Yup.string().required("Data é obrigatória."),
  time: Yup.string().required("Hora é obrigatória."),
  status: Yup.string().required("Status é obrigatório."),
  value: Yup.number()
    .min(0, "O valor não pode ser negativo.")
    .required("Valor é obrigatório."),
  treatmentId: Yup.string().nullable(),
  hasTreatment: Yup.boolean(),
});

function formatPhone(value: string) {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, "");

  // Formata conforme o tamanho
  if (digits.length <= 2) {
    return `(${digits}`;
  } else if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  } else if (digits.length <= 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  } else {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }
}

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
  onDelete: () => void;
  onSave: (event: CalendarEvent | Omit<CalendarEvent, "id">) => void;
  selectedDate: string;
  selectedEvent: any | null; // aceitando any pois a estrutura pode variar
}

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
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

  const [patientId, setPatientId] = useState<string>('');
  const [patientName, setPatientName] = useState('');
  const [specialistId, setSpecialistId] = useState<string>('');
  const [specialistName, setSpecialistName] = useState('');
  const [treatmentId, setTreatmentId] = useState<string>("");
  const [isVisibleDateModal, setIsVisibleDateModal] = useState(false);


  const [errors, setErrors] = useState<{ [key: string]: string }>({});


  const resetForm = () => {
    setTreatment("");
    setTreatmentsList([]);
    setDate(selectedDate);
    setTime("08:00");
    setPatient("");
    setSpecialist("");
    setPhone("");
    setStatus("");
    setIsTreatmentConciliated(false);
    setValue('');
    setPatientId('');
    setPatientName('');
    setTreatmentId('');
    setSpecialistId('');
    setSpecialistName('');
    setErrors({}); // Limpa erros de validação
  };


  // Sincroniza dados quando selectedEvent ou selectedDate mudam
  useEffect(() => {
    if (selectedEvent) {
      setTime(selectedEvent.time || "08:00");

      setPhone(selectedEvent.phone || "");

      // Paciente
      if (selectedEvent.patient && typeof selectedEvent.patient === "object") {
        setPatient(selectedEvent.patient.id?.toString() || "");
        setPatientId(selectedEvent.patient.id?.toString() || "");
        setPatientName(selectedEvent.patient.name || "");
      } else {
        setPatient(selectedEvent.patient || "");
        setPatientId(selectedEvent.patient || "");
        const patientObject = patientsList.find((p) => p.id.toString() === selectedEvent.patient);
        setPatientName(patientObject?.name || "");
      }

      // Especialista
      if (selectedEvent.specialist && typeof selectedEvent.specialist === "object") {
        setSpecialist(selectedEvent.specialist.id?.toString() || "");
        setSpecialistId(selectedEvent.specialist.id?.toString() || "");
        setSpecialistName(selectedEvent.specialist.name || "");
      } else {
        setSpecialist(selectedEvent.specialist || "");
        setSpecialistId(selectedEvent.specialist || "");
        const specialistObject = specialistsList.find((s) => s.id.toString() === selectedEvent.specialist);
        setSpecialistName(specialistObject?.name || "");
      }

      // Status
      setStatus(() => {
        switch (selectedEvent.status.toLowerCase()) {
          case "confirmado":
            return "Confirmado";
          case "pendente":
            return "Pendente";
          case "cancelado":
            return "Cancelado";
          case "concluído":
            return "Concluido";
          default:
            return "";
        }
      });

      // Data
      setDate(selectedEvent.date.split("T")[0]);
    } else {
      setTime("08:00");
      setPatient("");
      setSpecialist("");
      setPatientId('');
      setSpecialistId('');
      setPatientName('');
      setSpecialistName('');
      setStatus('');
      setDate(selectedDate);
    }
  }, [selectedEvent, selectedDate, patientsList, specialistsList]);

  // Buscar pacientes e especialistas quando modal abrir
  useEffect(() => {
    if (isOpen) {
      fetch(`${API_URL}/patient/dto`)
        .then((res) => res.text())
        .then((text) => {
          try {
            const data = JSON.parse(text);
            setPatientsList(data);
          } catch (err) {
          }
        })

        .catch((err) => console.error("Erro ao buscar pacientes:", err));

      fetch(`${API_URL}/specialist`)
        .then((res) => res.json())
        .then((data) => {
          setSpecialistsList(data);
        })
        .catch((err) => console.error("Erro ao buscar especialistas:", err));

      // 🔄 Limpa os tratamentos enquanto não há paciente selecionado
      setTreatmentsList([]);
    }
  }, [isOpen]);

  // Carrega tratamentos quando patientId estiver definido
  useEffect(() => {
    if (!patientId) {
      setTreatmentsList([]);
      return;
    }

    let isCurrent = true;

    async function fetchTreatments() {
      try {
        const res = await fetch(`${API_URL}/patient/${patientId}/treatment`);

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();  // já parseia o JSON

        if (isCurrent) {
          setTreatmentsList(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (isCurrent) {
          console.error("Erro ao buscar tratamentos:", err);
          setTreatmentsList([]);
        }
      }
    }

    fetchTreatments();

    return () => {
      isCurrent = false;
    };
  }, [patientId]);

  useEffect(() => {
    if (!selectedEvent && isOpen) {
      resetForm();
    }
  }, [selectedEvent, isOpen]);

  // Atualiza telefone quando paciente mudar
  useEffect(() => {
    // Não atualiza o telefone quando estiver editando um evento
    if (selectedEvent) return;

    const selectedPatient = patientsList.find(
      (p) => p.id.toString() === patient
    );
    if (selectedPatient && selectedPatient.phoneNumber) {
      setPhone(selectedPatient.phoneNumber.toString());
    } else {
      setPhone("");
    }
  }, [patient, patientsList, selectedEvent]);


  const handleSubmit = async () => {
    const dateTimeLocal = `${date}T${time}`;

    const selectedPatient = patientsList.find((p) => p.id.toString() === patientId);
    const selectedSpecialist = specialistsList.find((s) => s.id.toString() === specialistId);

    // 1️⃣ Monta dados para validar
    const dataToValidate = {
      patientId,
      specialistId,
      date,
      time,
      status,
      value: Number(value) || 0,
    };

    try {
      // 2️⃣ Valida dados básicos com Yup
      await eventSchema.validate(dataToValidate, { abortEarly: false });

      // 3️⃣ Verificação adicional para garantir dados carregados
      if (!selectedPatient || !selectedSpecialist) {
        alert("Paciente ou especialista inválido.");
        return;
      }

      // 4️⃣ Prepara payload para enviar
      const eventData = {
        patientId: selectedPatient.id,
        specialistId: selectedSpecialist.id,
        date: dateTimeLocal,
        confirmPhoneNumber: phone,
        hasTreatment: !!treatmentId,
        treatmentId: treatmentId ? Number(treatmentId) : null,
        value: Number(value) || 0,
        status,
      };

      // 5️⃣ Define método e URL
      const url = selectedEvent
        ? `${API_URL}/appointments/${selectedEvent.id}`
        : `${API_URL}/appointments/create`;

      const method = selectedEvent ? "PUT" : "POST";

      // 6️⃣ Dispara requisição
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Erro do servidor:", errorText);
        throw new Error(`Erro na requisição: ${response.status} - ${errorText}`);
      }

      const result = await response.json();

      // 7️⃣ Dispara callback para salvar e atualiza UI
      onSave(selectedEvent ? { ...eventData, id: selectedEvent.id } : result);
      resetForm();
      onClose();

    } catch (err: any) {
      // 8️⃣ Trata erros de validação do Yup
      if (err.inner) {
        const formattedErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      } else {
        // 9️⃣ Exibe alert para erros gerais
        console.error("❌ Erro ao enviar os dados:", err);
        alert("Erro ao salvar o agendamento. Verifique os campos e tente novamente.");
      }
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="SMALL">
      <div className={styles.card}>
        <header className={styles.header}>
          <h2 className={styles.title}>
            {selectedEvent ? "Editar horário" : "Novo horário"}
          </h2>
        </header>

        <div className={styles.content}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className={styles.formGroup}>
              <SelectInputPesquisar
                label="Paciente"
                elements={patientsList.map((p) => p.name)}
                selectedOption={patientName}
                onSelectOption={(name) => {
                  const selected = patientsList.find((p) => p.name === name);
                  if (selected) {
                    setPatientId(selected.id.toString());
                    setPatientName(selected.name);
                    // Só atualiza telefone aqui se estiver criando, para não sobrescrever telefone de edição
                    if (!selectedEvent) {
                      setPhone(selected.phoneNumber?.toString() || "");
                    }
                  } else {
                    setPatientId('');
                    setPatientName('');
                    if (!selectedEvent) {
                      setPhone('');
                    }
                  }
                }}
                sizeType="G"
              />
              {errors.patientId && <p className={styles.errorText}>{errors.patientId}</p>}
            </div>

            <div className={styles.formGroup}>
              <SelectInputPesquisar
                label="Especialista"
                elements={specialistsList.map((s) => s.name)}
                selectedOption={specialistName}
                onSelectOption={(name) => {
                  const selected = specialistsList.find((s) => s.name === name);
                  if (selected) {
                    setSpecialistId(selected.id.toString());
                    setSpecialistName(selected.name);
                  }
                }}
                sizeType="G"
              />
              {errors.specialistId && <p className={styles.errorText}>{errors.specialistId}</p>}
            </div>

            <div className={styles.formGroup}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div className={styles.dateInputContainer} style={{ flex: 1 }}>
                  <DatePicker
                    selected={date ? new Date(date) : null}
                    onSelect={() => setIsVisibleDateModal(false)}
                    locale="ptBR"
                    showYearDropdown
                    dropdownMode="select"
                    onChange={(selectedDate) => {
                      setIsVisibleDateModal(false);
                      if (selectedDate) {
                        setDate(selectedDate.toISOString().split("T")[0]);
                      }
                    }}
                    onInputClick={() => setIsVisibleDateModal((prev) => !prev)}
                    open={isVisibleDateModal}
                    dateFormat="dd/MM/yyyy"
                    customInput={
                      <Input
                        sizeType="G"
                        inputType="date"
                        label="Data"
                        errorMessage={errors.date}
                        onVisibleDateMenu={() => setIsVisibleDateModal((prev) => !prev)}
                      />
                    }
                  />
                  {errors.date && <p className={styles.error}>{errors.date}</p>}
                </div>

                <div style={{ flex: 1 }}>
                  <Input
                    label="Hora"
                    inputType="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    sizeType={"G"}
                  />
                  {errors.time && <p className={styles.error}>{errors.time}</p>}
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <InputMask
                    mask="(99) 99999-9999"
                    value={phone}
                    onChange={e => {
                      const maskedValue = e.target.value;
                      const unmaskedValue = maskedValue.replace(/\D/g, '');
                      setPhone(unmaskedValue);
                    }}
                    alwaysShowMask={false} // ou true se quiser sempre mostrar a máscara
                  >
                    {inputProps => (
                      <Input
                        label="Celular do paciente"
                        id="phone"
                        type="text"
                        className={styles.input}
                        placeholder="Celular do paciente"
                        sizeType="G"
                        {...inputProps}
                      />
                    )}
                  </InputMask>
                </div>

                <div style={{ flex: 1 }}>
                  <SelectInputPesquisar
                    label="Status"
                    elements={["Confirmado", "Pendente", "Cancelado", "Concluído"]}
                    selectedOption={status}
                    onSelectOption={(option) => setStatus(option)}
                    sizeType={"G"}
                  />
                  {errors.status && <p className={styles.errorText}>{errors.status}</p>}
                </div>
              </div>
            </div>

            {!selectedEvent && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      checked={isTreatmentConciliated}
                      onChange={(e) =>
                        setIsTreatmentConciliated(e.target.checked)
                      }
                      style={{ marginRight: "8px" }}
                    />
                    Conciliar tratamento
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <SelectInputPesquisar
                    sizeType="G"
                    label="Tratamento"
                    elements={treatmentsList.map((t) => t.title)}
                    selectedOption={treatmentsList.find((t) => t.id.toString() === treatmentId)?.title || ""}
                    onSelectOption={(selectedTitle) => {
                      const selectedTreatment = treatmentsList.find(
                        (t) => t.title === selectedTitle
                      );
                      if (selectedTreatment) {
                        setTreatmentId(selectedTreatment.id.toString());
                      } else {
                        setTreatmentId("");
                      }
                    }}
                    canByOpen={isTreatmentConciliated}
                  />

                </div>

                <div className={styles.formGroup}>
                  <Input
                    label="Valor"
                    id="value"
                    placeholder="Valor"
                    type="number"
                    className={styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    sizeType={"G"}
                  />
                  {errors.value && <p className={styles.error}>{errors.value}</p>}
                </div>

              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '1rem' }}>
              <Button type="submit" size="lg">
                {selectedEvent ? "Atualizar" : "Salvar"}
              </Button>

              {selectedEvent && (
                <Button
                  type="button"
                  onClick={onDelete}
                  size="lg"
                  variant="secondary"
                >
                  Excluir
                </Button>
              )}
            </div>

          </form>
        </div>
      </div>
    </Modal>
  );

}
