import React, { useEffect, useRef, useState } from 'react';
import { CommandHeader, Container, Content, LabelEntity, SearchStyleWrapper } from './styles';
import { HeaderGeneric } from '@components/GenericHeader';
import Input from '@components/Input';
import GenericButton from '@components/GenericButton';
import { FixedSizeGrid } from 'react-window';
import SimpleCard from '@components/SimpleCard';
import AutoSizer from 'react-virtualized-auto-sizer';


export function Pacientes() {
  const [isFullScreen] = useState(document.fullscreenElement);
  const contentRef = useRef<HTMLDivElement>(null);
  const rows = isFullScreen ? 6 : 4;
  

  const data = Array(30).fill(true).map((_, index) => ({
    title: `Pessoa ${index}`,
    subtitle: `Subtitulo`
  }))

  const columns = Math.ceil(data.length/rows);

  const cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    const index = rows * columnIndex + rowIndex;
    
    const element = data[index];

    return (
      <div style={{ ...style }}>
        {element && 
        <SimpleCard
          title={element.title}
          subtitle={element.subtitle}
          info='Info'
        />}
      </div>
    )
  }

  return (
    <Container>
      <HeaderGeneric />
      <CommandHeader>
        <SearchStyleWrapper>
          <LabelEntity>Paciente:</LabelEntity>
          <Input
            type='search'
            size={isFullScreen ? 'G' : 'MG'}
            placeholder='João Santos'
          />
        </SearchStyleWrapper>
        <GenericButton
          color='PRIMARY'
          onClick={() => { }}
          title='Novo Cadastro'
        />

      </CommandHeader>
      <Content>
        <AutoSizer>
          {({ height, width }) =>
            <div
              onWheel={e => {
                e.preventDefault();
                if(contentRef){
                  contentRef.current.scrollLeft += e.deltaY;
                }
              }}
            >
              <FixedSizeGrid
                outerRef={contentRef}
                columnCount={columns}
                columnWidth={390}
                height={height}
                width={width}
                rowCount={rows}
                rowHeight={100}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}
              >
                {cell}
              </FixedSizeGrid>
            </div>

          }
        </AutoSizer>
      </Content>
    </Container>
  );
};

export default Pacientes;