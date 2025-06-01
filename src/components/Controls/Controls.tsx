import { getCurrentWindow } from "@tauri-apps/api/window";
import { ActionButton, Container, WrapperButtons } from "./styles";
import Icon from "@components/Icon";

export function Controls() {
    const appWindow = getCurrentWindow();

    return (
        <Container>
            <WrapperButtons>
                <ActionButton
                    onClick={async () => {
                        await appWindow.minimize();
                    }}
                >
                    <Icon
                        color="#fff"
                        iconLibName="fa"
                        icon="FaWindowMinimize"
                        size={14}
                    />
                </ActionButton>
                <ActionButton
                    onClick={async () => {
                        await appWindow.maximize();
                    }}
                >
                    <Icon
                        color="#fff"
                        iconLibName="fa"
                        icon="FaClone"
                        size={14}
                    />
                </ActionButton>
                <ActionButton
                    onClick={async () => {
                        await appWindow.close();
                    }}
                >
                    <Icon
                        color="#fff"
                        iconLibName="io5"
                        icon="IoClose"
                        size={15}
                    />
                </ActionButton>
            </WrapperButtons>
        </Container>
    );
}
