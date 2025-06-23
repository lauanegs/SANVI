import { JourneyCard } from "@components/JourneyCard";
import { Container, ContentContainer, EmptyWrapper, JourneyMenuWrapper, JourneyWrappers, ListContainer, LoaderWrapper, ReloadButton, ReloadWrapper, WrapperAddButton } from "./styles";
import { NewJourneyMenu } from "@components/NewJourneyMenu";
import { useAppStore } from "store/appStore";
import { JorneyModalProps } from "./types";
import { useState } from "react";
import Icon from "@components/Icon";
import theme from "theme";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from "react-window";
import { Text } from "@components/Text";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "utils/query-keys";
import { findJourneyEventByTreatment, findSpecialist } from "@api/patient";
import { ClipLoader } from "react-spinners";
import { JourneyInterface } from "@api/patient/types";

export function JourneyModal({ onCloseModal, isOpen, selectedTreatment }: JorneyModalProps) {

    const store = useAppStore();

    const isFullScreen = store.isFullScreen;

    const [isVisibleNewJourneyModal, setIsVisibleNewJourneyModal] = useState(false);
    const [selectedJourneyEvent, setSelectedJourneyEvent] = useState<JourneyInterface>();

    console.log("selectedJourneyEvent", selectedJourneyEvent)
    const queryClient = useQueryClient();
    const { data = [], error, isPending, refetch } = useQuery({
        queryKey: queryKeys.ALL_TREATMENT_JOURNEYS,
        queryFn: () => findJourneyEventByTreatment(selectedTreatment.id),
        staleTime: 1000 * 60 * 5
    })

    const { data: dataSpecialists = [] } = useQuery({
        queryKey: queryKeys.ALL_SPECIALISTS,
        queryFn: findSpecialist,
        staleTime: 1000 * 60 * 5
    })

    function handleSelectJourneyEvent(event: JourneyInterface) {
        setSelectedJourneyEvent(event);
        setIsVisibleNewJourneyModal(true);
    }

    if (!isOpen) return;

    return (
        <Container onClick={onCloseModal}>
            <ContentContainer onClick={(e) => e.stopPropagation()}>
                <JourneyWrappers>
                    <ListContainer>
                        {isPending ?
                            <LoaderWrapper>
                                <ClipLoader
                                    color={theme.COLORS.AZUL_DA_FRANCA}
                                    size={80}
                                />
                            </LoaderWrapper>
                            :
                            error ?
                                <ReloadWrapper>
                                    <ReloadButton
                                        onClick={() => refetch()}
                                    >
                                        <Icon
                                            iconLibName='io5'
                                            icon='IoReload'
                                            size={40}
                                            color={theme.COLORS.AZUL_DA_FRANCA}
                                        />
                                    </ReloadButton>
                                </ReloadWrapper>
                                :
                                data.length === 0 ?
                                    <EmptyWrapper>
                                        <Icon
                                            iconLibName="lu"
                                            icon="LuCircleAlert"
                                            color={theme.COLORS.AZUL_DA_FRANCA}
                                            fill={theme.COLORS.BRANCO}
                                            size={25}
                                        />
                                        <Text
                                            color="SECONDARY"
                                            size={14}
                                            text="Não há eventos cadastros"
                                        />
                                    </EmptyWrapper>
                                    :
                                    data.map((element, index) => (
                                        <JourneyCard
                                            onClick={() => handleSelectJourneyEvent(element)}
                                            date={new Date(element.date)}
                                            description={element.description}
                                            professional={dataSpecialists.find(item => item.id === element.specialist.id)?.name || '-'}
                                        />
                                    ))
                        }
                    </ListContainer>
                    {!isVisibleNewJourneyModal &&
                        <WrapperAddButton
                            onClick={() => setIsVisibleNewJourneyModal(true)}
                        >
                            <Icon
                                iconLibName="fi"
                                icon="FiPlus"
                                size={20}
                                color={theme.COLORS.BRANCO}
                            />
                        </WrapperAddButton>}
                </JourneyWrappers>

                {isVisibleNewJourneyModal &&
                    <JourneyMenuWrapper>
                        <NewJourneyMenu
                            selectedTreatment={selectedTreatment}
                            selectedJourneyEvent={selectedJourneyEvent}
                            onCloseModal={() => {
                                setIsVisibleNewJourneyModal(false);
                                setSelectedJourneyEvent(undefined)
                                onCloseModal();
                            }}
                        />
                    </JourneyMenuWrapper>}
            </ContentContainer>
        </Container>
    );
}