import { MenuHeader } from "@components/MenuHeader";
import { Container } from "../styles";
import { ContentContainer } from "./styles";
import { JourneyCard } from "@components/JourneyCard";
import { GenericHeader } from "@components/GenericHeader";
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from "react-window";

export function JornadaPaciente(){

    const elements = new Array(9).fill(true).map((_, index) => ({
        count: index,
        startDate: "25/02/2025",
        title: "Aparelhos"
    }))

    const cell = ({index, style}: {index: number, style: React.CSSProperties}) => {
        const element = elements[index];

        return(
            <div style={style}>
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
            <ContentContainer>
                <AutoSizer>
                    {({width, height}) => (
                        <FixedSizeList
                            height={height}
                            width={width}
                            itemSize={120}
                            itemCount={elements.length}
                            style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}
                        >
                            {cell}
                        </FixedSizeList>
                    )}
                </AutoSizer>
            </ContentContainer>
        </Container>
    );
}