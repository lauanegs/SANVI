import { TabCard } from "@components/TabCard";
import { Container, Tabs, TabWrapper } from "./styles";
import GenericButton from "@components/GenericButton";
import { MenuHeaderProps } from "./types";
import { useNavigate } from "react-router-dom";
import { SubScreenEnum } from "@pages/Pacientes/types";

export function MenuHeader({firstSubScreen, buttonTitle, onPressButton, secondSubScreen, thirdSubScreen}: MenuHeaderProps) {
    const navigator = useNavigate();
    return (
        <Container>
            <Tabs>
                {firstSubScreen &&
                <TabWrapper
                    onClick={() => navigator(`/${firstSubScreen}`)}
                >
                    <TabCard
                        title={SubScreenEnum[firstSubScreen as keyof typeof SubScreenEnum]}
                    />
                </TabWrapper>}

                {secondSubScreen &&
                <TabWrapper
                    onClick={() => navigator(`/${secondSubScreen}`)}
                >
                    <TabCard
                        title={SubScreenEnum[secondSubScreen as keyof typeof SubScreenEnum]}
                    />
                </TabWrapper>}

                {thirdSubScreen && 
                <TabWrapper
                    onClick={() => navigator(`/${thirdSubScreen}`)}
                >
                    <TabCard
                        title={SubScreenEnum[thirdSubScreen as keyof typeof SubScreenEnum]}
                    />
                </TabWrapper>}
            </Tabs>

            {buttonTitle && onPressButton &&
            <GenericButton
                color="PRIMARY"
                title={buttonTitle}
                onClick={onPressButton}
            />}

        </Container>
    )
}