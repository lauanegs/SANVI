import React, { useEffect, useRef, useState } from 'react';
import { CommandHeader, Container, Content, LabelEntity, SearchStyleWrapper } from './styles';
import { GenericHeader } from '@components/GenericHeader';
import Input from '@components/Input';
import GenericButton from '@components/GenericButton';
import { FixedSizeGrid } from 'react-window';
import SimpleCard from '@components/SimpleCard';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from 'store/appStore';


export function Pacientes() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isFullScreen = useAppStore().isFullScreen;

  const [rows, setRows] = useState(4);

  const navigator = useNavigate();
  
  const data = Array(50).fill(true).map((_, index) => ({
    title: `Pessoa ${index}`,
    subtitle: `Subtitulo`
  }))

  const columns = Math.ceil(data.length/rows);

  useEffect(() => {
    const newRowsQtd = isFullScreen ? 8 : 4;
    setRows(newRowsQtd);
    console.log("FULL",isFullScreen)
  }, [isFullScreen])

 

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
      <GenericHeader />
      <CommandHeader>
        <SearchStyleWrapper>
          <LabelEntity>Paciente:</LabelEntity>
          <Input
            sizeType='G'
            inputType='search'
            placeholder='João Santos'
  
          />
        </SearchStyleWrapper>
        <GenericButton
          color='PRIMARY'
          onClick={() => { navigator("/cadastroPaciente") }}
          title='Novo Cadastro'
        />

      </CommandHeader>
      <Content>
        <AutoSizer>
          {({ height, width }) =>
            <div
              onWheel={e => {
                e.preventDefault();
                if(contentRef.current){
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