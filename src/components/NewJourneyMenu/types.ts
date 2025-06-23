import { JourneyInterface, TreatmentInterface } from "@api/patient/types";

export type FormStateType = {
    description: string,
    date: Date,
    professional: string
}

export type NewJourneyMenuProps = {
    onCloseModal: () => void;
    selectedTreatment: TreatmentInterface;
    selectedJourneyEvent?: JourneyInterface;
}