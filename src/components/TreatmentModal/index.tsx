import { Container, ContentContainer, TreatmentMenuWrapper } from "./styles";
import { NewTreatmentMenu } from "@components/NewTreatmentMenu";
import { TreatmentModalProps } from "./types";

export function TreatmentModal({onCloseModal, isOpen}: TreatmentModalProps){

    if(!isOpen) return;

    return(
        <Container onClick={onCloseModal}>
            <ContentContainer onClick={(e) => e.stopPropagation()}>
                <TreatmentMenuWrapper>
                    <NewTreatmentMenu
                        onCloseModal={onCloseModal}
                    />
                </TreatmentMenuWrapper>
            </ContentContainer>
        </Container>
    );
}