import { ScreenTypes } from "@components/SideBar/SideBar.types"

export type MenuHeaderProps = {
    firstSubScreen: ScreenTypes;
    secondSubScreen?: ScreenTypes;
    thirdSubScreen?: ScreenTypes;
    buttonTitle?: string;
    onPressButton?: () => void;
}