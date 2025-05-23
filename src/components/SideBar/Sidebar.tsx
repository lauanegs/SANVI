import { Container, ScreenCardTitleWrapper, ScreenCardWrapper, ScreenCardWrapperHover, UserTitleWrapper } from "./SideBar.styles";
import { Text } from "@components/Text";
import Icon from "@components/Icon";
import theme from "theme";
import { ScreenTypes } from "./SideBar.types";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
    const location = useLocation();

    const getScreenFromPath = (path: string): ScreenTypes => {
        if (path.startsWith("/pacientes")) return "pacientes";
        if (path.startsWith("/especialistas")) return "especialistas";
        if (path.startsWith("/agendamentos")) return "agendamentos";
        if (path.startsWith("/financas")) return "financas";
        return "home";
    };

    const screenSelected = getScreenFromPath(location.pathname);

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

            <Link to="/" style={{ textDecoration: 'none' }}>
                <ScreenCardWrapper>
                    <ScreenCardWrapperHover isSelected={screenSelected === "home"}>
                        <ScreenCardTitleWrapper>
                            <Icon
                                iconLibName="lu"
                                icon="LuFolderClosed"
                                color={theme.COLORS.AZUL_CELESTE_CLARO}
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
                                color={theme.COLORS.AZUL_CELESTE_CLARO}
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
                                color={theme.COLORS.AZUL_CELESTE_CLARO}
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
                                color={theme.COLORS.AZUL_CELESTE_CLARO}
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
                                color={theme.COLORS.AZUL_CELESTE_CLARO}
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