import { getCurrentWindow } from "@tauri-apps/api/window";
import { ActionButton, Container, WrapperButtons } from "./styles";
import Icon from '@components/Icon';
import { useAppStore } from 'store/appStore';

export function Controls() {
  const appWindow = getCurrentWindow();
  const store = useAppStore();

  async function checkIsFullScreen() {
    const isFullScreen = appWindow.isMaximized();
    return isFullScreen;
  }

  return (
    <Container>
      <WrapperButtons>
        <ActionButton onClick={async () => {
          await appWindow.minimize();
        }}>
          <Icon color="#fff" iconLibName="fa" icon="FaWindowMinimize" size={14} />
        </ActionButton>
        <ActionButton onClick={async () => {
          await appWindow.toggleMaximize();
          const isFullScreen = await appWindow.isMaximized();
          console.log(isFullScreen);
          store.setIsFullScreen(isFullScreen);
        }}>
          <Icon color="#fff" iconLibName="fa" icon="FaClone" size={14} />
        </ActionButton>
        <ActionButton onClick={async () => {
          await appWindow.close();
        }}>
          <Icon color="#fff" iconLibName="io6" icon="IoClose" size={17} />
        </ActionButton>
      </WrapperButtons>
    </Container>
  );

}
