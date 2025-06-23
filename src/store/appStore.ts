import {create} from "zustand";
import { AppStoreActions, AppStoreStates } from "./appStore.types";
import { PatientInterface, SpecialistInterface, TreatmentInterface } from "@api/patient/types";

export const useAppStore = create<AppStoreStates & AppStoreActions>((set) => ({
    selectedScreen: "home",
    setSelectedScreen: (selectedScreen) => set(() => ({selectedScreen: selectedScreen})),
    
    isFullScreen: false,
    setIsFullScreen: (isFullScreen) => set(() => ({isFullScreen: isFullScreen})),

    selectedPatient: {} as PatientInterface,
    setSelectedPatient: (selectedPatient) => set(() => ({selectedPatient: selectedPatient})),

    isValidPatientCache: true,
    setIsValidPatientCache: (isValidPatientCache) => set(() => ({isValidPatientCache: isValidPatientCache})),

}));