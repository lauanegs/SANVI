import { JourneyCard } from "@components/JourneyCard";
import { Container, ContentContainer, JourneyMenuWrapper, JourneyWrappers, TreatmentMenuWrapper } from "./styles";
import { NewJourneyMenu } from "@components/NewJourneyMenu";
import { NewTreatmentMenu } from "@components/NewTreatmentMenu";
import { TreatmentModalProps } from "./types";
import { useAppStore } from "store/appStore";

export function TreatmentModal({onCloseModal, isOpen}: TreatmentModalProps){

    const isFullScreen = useAppStore().isFullScreen;

    if(!isOpen) return;

    return(
        <Container>
            <ContentContainer>
                {/* <JourneyWrappers
                    style={{width: isFullScreen ? '20%' : '25%'}}
                >
                    <JourneyCard
                        date={new Date()}
                        description="Descrição"
                        professional="Dr. Joaquim"
                    />
                </JourneyWrappers>
                <JourneyMenuWrapper
                    style={{width: isFullScreen ? '20%' : '25%'}}
                >
                    <NewJourneyMenu/>
                </JourneyMenuWrapper> */}
                <TreatmentMenuWrapper
                    style={{width: isFullScreen ? '20%' : '25%'}}
                >
                    <NewTreatmentMenu
                        onCloseModal={onCloseModal}
                    />
                </TreatmentMenuWrapper>
            </ContentContainer>
        </Container>
    );
}