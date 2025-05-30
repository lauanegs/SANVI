import { ScreenTypes } from "@components/SideBar/SideBar.types"

export type AppStoreStates = {
    selectedScreen: ScreenTypes;
    isFullScreen: boolean;
}

export type AppStoreActions = {
    setSelectedScreen: (screenSelected: AppStoreStates["selectedScreen"]) => void;
    setIsFullScreen: (isFullScreen: AppStoreStates["isFullScreen"]) => void;
}
