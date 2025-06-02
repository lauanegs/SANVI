import { PatientInterface } from "@api/patient/types";
import { ScreenTypes } from "@components/SideBar/SideBar.types"

export type AppStoreStates = {
    selectedScreen: ScreenTypes;
    isFullScreen: boolean;
    selectedPatient: PatientInterface;
}

export type AppStoreActions = {
    setSelectedScreen: (screenSelected: AppStoreStates["selectedScreen"]) => void;
    setIsFullScreen: (isFullScreen: AppStoreStates["isFullScreen"]) => void;
    setSelectedPatient: (selectedPatient: AppStoreStates["selectedPatient"]) => void;
}
