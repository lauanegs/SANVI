import { ScreenTypes } from "@components/SideBar/SideBar.types"

export type AppStoreStates = {
    selectedScreen: ScreenTypes;

}

export type AppStoreActions = {
    setSelectedScreen: (screenSelected: AppStoreStates["selectedScreen"]) => void;
}
