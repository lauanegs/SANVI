import { Container, ScreenCardTitleWrapper, ScreenCardWrapper, ScreenCardWrapperHover, UserTitleWrapper } from "./SideBar.styles";
import { Text } from "@components/Text";
import Icon from "@components/Icon";
import theme from "theme";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "store/appStore";

function Sidebar() {
    const location = useLocation();
    console.log(location);

    const updateSelectedScreen = useAppStore((state) => state.setSelectedScreen);

    const getScreenFromPath = (path: string) => {
        if (path.startsWith("/pacientes")){
            updateSelectedScreen("pacientes");
        } 
        if (path.startsWith("/especialistas")){
            updateSelectedScreen("especialistas");
        }
        if (path.startsWith("/agendamentos")){
            updateSelectedScreen("agendamentos");
        }
        if (path.startsWith("/financas")){
            updateSelectedScreen("financas");
        }
        if (path.startsWith("/home")){
            updateSelectedScreen("home");
        }
    };

    getScreenFromPath(location.pathname);

    const screenSelected = useAppStore((state) => state.selectedScreen);

    return (
        <Container>
            <UserTitleWrapper>
                <Text
                    color="PRIMARY"
                    size={14}
                    weight={500}
                    text="Marvin McKinney"
                />
                <Text
                    color="PRIMARY"
                    size={12}
                    weight={500}
                    text="Administrador"
                />
            </UserTitleWrapper>

            <Link to="/home" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "home"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.CINZA_ESCURO}
                                fill={theme.COLORS.AZUL_CELESTE_CLARO}
                                size={14}
                            />
                            <Text
                                color="PRIMARY"
                                size={14}
                                weight={500}
                                text="Home"
                            />
                        </ScreenCardTitleWrapper>
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronRight"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={14}
                        />
                    </ScreenCardWrapperHover>
                </ScreenCardWrapper>
            </Link>

            <Link to="/pacientes" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "pacientes"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.CINZA_ESCURO}
                                fill={theme.COLORS.AZUL_CELESTE_CLARO}
                                size={14}
                            />
                            <Text
                                color="PRIMARY"
                                size={14}
                                weight={500}
                                text="Pacientes"
                            />
                        </ScreenCardTitleWrapper>
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronRight"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={14}
                        />
                    </ScreenCardWrapperHover>
                </ScreenCardWrapper>
            </Link>

            <Link to="/especialistas" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "especialistas"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.CINZA_ESCURO}
                                fill={theme.COLORS.AZUL_CELESTE_CLARO}
                                size={14}
                            />
                            <Text
                                color="PRIMARY"
                                size={14}
                                weight={500}
                                text="Especialistas"
                            />
                        </ScreenCardTitleWrapper>
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronRight"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={14}
                        />
                    </ScreenCardWrapperHover>
                </ScreenCardWrapper>
            </Link>

            <Link to="/agendamentos" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "agendamentos"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.CINZA_ESCURO}
                                fill={theme.COLORS.AZUL_CELESTE_CLARO}
                                size={14}
                            />
                            <Text
                                color="PRIMARY"
                                size={14}
                                weight={500}
                                text="Agendamentos"
                            />
                        </ScreenCardTitleWrapper>
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronRight"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={14}
                        />
                    </ScreenCardWrapperHover>
                </ScreenCardWrapper>
            </Link>

            <Link to="/financas" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "financas"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.CINZA_ESCURO}
                                fill={theme.COLORS.AZUL_CELESTE_CLARO}
                                size={14}
                            />
                            <Text
                                color="PRIMARY"
                                size={14}
                                weight={500}
                                text="Finanças"
                            />
                        </ScreenCardTitleWrapper>
                        <Icon
                            iconLibName="fa"
                            icon="FaChevronRight"
                            color={theme.COLORS.CINZA_ESCURO}
                            size={14}
                        />
                    </ScreenCardWrapperHover>
                </ScreenCardWrapper>
            </Link>
        </Container>
    );
}

export default Sidebar;