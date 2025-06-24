import { MenuHeader } from "@components/MenuHeader";
import { Container, ContentContainer, EmptyWrapper, LoaderWrapper, ReloadButton, ReloadWrapper } from "./styles";
import { TreatmentCard } from "@components/TreatmentCard";
import { GenericHeader } from "@components/GenericHeader";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from "react-window";
import { useAppStore } from "store/appStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { findSpecialist, findTreatmentsByPatientId } from "@api/patient";
import { queryKeys } from "utils/query-keys";
import { TreatmentModal } from "@components/TreatmentModal";
import { useEffect, useState } from "react";
import { JourneyModal } from "@components/JourneyModal";
import { ClipLoader } from "react-spinners";
import theme from "theme";
import { TreatmentInterface } from "@api/patient/types";
import Icon from "@components/Icon";
import { Text } from "@components/Text";

export function TratamentoPacientes() {
    const store = useAppStore();

    const isFullScreen = store.isFullScreen;

    const patient = store.selectedPatient;

    const [isOpenTreatmentModal, setIsOpenTreatmentModal] = useState(false);
    const [isOpenJourneyModal, setIsOpenJourneyModal] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<TreatmentInterface>();

    const queryClient = useQueryClient();
    const { data = [], error, isPending, refetch } = useQuery({
        queryKey: queryKeys.ALL_PATIENT_TREATMENTS,
        queryFn: () => findTreatmentsByPatientId(patient.id),
        staleTime: 1000 * 60 * 5
    })

    const { data: dataSpecialists = [], isPending: isPendingSpecialists } = useQuery({
        queryKey: queryKeys.ALL_SPECIALISTS,
        queryFn: findSpecialist,
        staleTime: 1000 * 60 * 5
    })

    function handleOpenJourneyModal(selected: TreatmentInterface) {
        setSelectedTreatment(selected);
        setIsOpenJourneyModal(true);
    }

    function handleOpenTreatmentModal() {
        setIsOpenTreatmentModal(true);
    }

    function handleCloseTreatmentModal() {
        setIsOpenTreatmentModal(false);
    }

    function handleCloseJourneyModal() {
        setIsOpenJourneyModal(false);
    }

    const PADDING_CONTAINER = isFullScreen ?
        { paddingTop: 82, paddingLeft: 64 }
        :
        { paddingTop: 41, paddingLeft: 32 };

    const PADDING_RIGHT_JOURNEY = isFullScreen ?
        { paddingRight: 110 }
        :
        { paddingRight: 55 }

    const cell = ({ index, style }: { index: number, style: React.CSSProperties }) => {
        const element = data[index];

        return (
            <div style={{ ...style, ...PADDING_RIGHT_JOURNEY }}>
                <TreatmentCard
                    disabled={isPendingSpecialists}
                    onClick={() => handleOpenJourneyModal(element)}
                    count={index + 1}
                    startDate={element.startedAt}
                    title={element.title}
                />
            </div>
        );
    }


    return (
        <Container>
            <GenericHeader />
            <MenuHeader
                firstSubScreen="cadastroPaciente"
                secondSubScreen="jornadaPaciente"
                thirdSubScreen="prontuarioPaciente"
                buttonTitle="Novo tratamento"
                onPressButton={handleOpenTreatmentModal}
            />
            <ContentContainer
                style={PADDING_CONTAINER}
            >
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
                                    color="PRIMARY"
                                    size={14}
                                    text="Não há tratamentos cadastros"
                                />
                            </EmptyWrapper>
                            :
                            <AutoSizer>
                                {({ width, height }) => (
                                    <FixedSizeList
                                        height={height}
                                        width={width}
                                        itemSize={75}
                                        itemCount={data.length}

                                    >
                                        {cell}
                                    </FixedSizeList>
                                )}
                            </AutoSizer>}
            </ContentContainer>
            <TreatmentModal
                isOpen={isOpenTreatmentModal}
                onCloseModal={handleCloseTreatmentModal}
            />
            {selectedTreatment &&
                <JourneyModal
                    selectedTreatment={selectedTreatment}
                    isOpen={isOpenJourneyModal}
                    onCloseModal={handleCloseJourneyModal}
                />
            }
        </Container>
    );
}