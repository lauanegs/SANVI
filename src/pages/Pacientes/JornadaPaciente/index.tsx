import { MenuHeader } from "@components/MenuHeader";
import { Container } from "../styles";
import { ContentContainer } from "./styles";
import { JourneyCard } from "@components/JourneyCard";
import { GenericHeader } from "@components/GenericHeader";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from "react-window";
import { useAppStore } from "store/appStore";

export function JornadaPaciente(){
    const isFullScreen = useAppStore().isFullScreen;

    const PADDING_CONTAINER = isFullScreen ? 
        {paddingTop: 82, paddingLeft: 64}
        :
        {paddingTop: 41, paddingLeft: 32};

    const PADDING_RIGHT_JOURNEY = isFullScreen ? 
        {paddingRight: 110}
        :
        {paddingRight: 55}

    const elements = new Array(50).fill(true).map((_, index) => ({
        count: index,
        startDate: "25/02/2025",
        title: "Aparelhos"
    }))

    const cell = ({index, style}: {index: number, style: React.CSSProperties}) => {
        const element = elements[index];

        return(
            <div style={{...style, ...PADDING_RIGHT_JOURNEY}}>
                <JourneyCard
                    count={element.count}
                    startDate={element.startDate}
                    title={element.title}
                />
            </div>
        );
    }
    return(
        <Container>
            <GenericHeader/>
            <MenuHeader
                firstSubScreen="cadastroPaciente"
                secondSubScreen="jornadaPaciente"
                thirdSubScreen="prontuarioPaciente"
                buttonTitle="Novo tratamento"
                onPressButton={() => {}}
            />
            <ContentContainer
                style={PADDING_CONTAINER}
            >
                <AutoSizer>
                    {({width, height}) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemSize={75}
                            itemCount={elements.length}
                            
                        >
                            {cell}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </ContentContainer>
        </Container>
    );
}