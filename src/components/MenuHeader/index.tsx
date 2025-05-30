import { TabCard } from "@components/TabCard";
import { Container, Tabs } from "./styles";
import GenericButton from "@components/GenericButton";
import { MenuHeaderProps } from "./types";
import { useNavigate } from "react-router-dom";
import { SubScreenEnum } from "@pages/Pacientes/types";

export function MenuHeader({ firstSubScreen, buttonTitle, onPressButton, secondSubScreen, thirdSubScreen }: MenuHeaderProps) {
    const navigator = useNavigate();
    return (
        <Container>
            <Tabs>
                {firstSubScreen &&

                    <TabCard
                        onClick={() => { navigator(`/${firstSubScreen}`) }}
                        title={SubScreenEnum[firstSubScreen as keyof typeof SubScreenEnum]}
                    />
                }

                {secondSubScreen &&

                    <TabCard
                        onClick={() => { navigator(`/${secondSubScreen}`) }}
                        title={SubScreenEnum[secondSubScreen as keyof typeof SubScreenEnum]}
                    />
                }

                {thirdSubScreen &&

                    <TabCard
                        onClick={() => { navigator(`/${thirdSubScreen}`) }}
                        title={SubScreenEnum[thirdSubScreen as keyof typeof SubScreenEnum]}
                    />
                }
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