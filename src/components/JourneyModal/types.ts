import { TreatmentInterface } from "@api/patient/types";

export type JorneyModalProps = {
    onCloseModal: () => void;
    isOpen: boolean;
    selectedTreatment: TreatmentInterface;
}