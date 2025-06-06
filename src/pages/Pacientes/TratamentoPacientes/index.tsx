import { MenuHeader } from "@components/MenuHeader";
import { Container } from "../styles";
import { ContentContainer, WrapperA } from "./styles";
import { TreatmentCard } from "@components/TreatmentCard";
import { GenericHeader } from "@components/GenericHeader";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from "react-window";
import { useAppStore } from "store/appStore";
import { JourneyCard } from "@components/JourneyCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { findTreatmentsByPatientId, persistTreatment } from "@api/patient";
import { queryKeys } from "utils/query-keys";
import toast from "react-hot-toast";

export function TratamentoPacientes() {
    const store = useAppStore();

    const isFullScreen = store.isFullScreen;

    const idPatient = store.selectedPatient.id;

    const queryClient = useQueryClient();
    const { data = [], error, isPending} = useQuery({
        queryKey: queryKeys.ALL_PATIENT_TREATMENTS,
        queryFn: () => {},
        staleTime: 1000 * 60 * 5
    })

    async function createTreatment(){
        try {
            const response = await persistTreatment({
                patientId: 1,
                startedAt: '2023-03-04',
                title: 'Tratamento aparelho',
                endedAt: null,
            });
            console.log("CREATE RESPONSE", response);
        } catch (error) {
            
        }
    }

    console.log("DATA TREATMENTS", data);

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
                    count={0}
                    startDate={''}
                    title={''}
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
                onPressButton={() => { }}
            />
            <WrapperA><JourneyCard /></WrapperA>
            <ContentContainer
                style={PADDING_CONTAINER}
            >
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
                </AutoSizer>
            </ContentContainer>
        </Container>
    );
}