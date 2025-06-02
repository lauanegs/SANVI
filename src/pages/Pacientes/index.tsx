import React, { useEffect, useRef, useState } from 'react';
import { ButtonWrapper, CommandHeader, Container, Content, LabelEntity, LoaderWrapper, SearchStyleWrapper } from './styles';
import { GenericHeader } from '@components/GenericHeader';
import Input from '@components/Input';
import GenericButton from '@components/GenericButton';
import { FixedSizeGrid } from 'react-window';
import SimpleCard from '@components/SimpleCard';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from 'store/appStore';
import { ClipLoader } from "react-spinners";
import theme from 'theme';
import { findPatient } from '@api/patient';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from 'utils/query-keys';
import { formatCpf } from 'utils/formatFunctions';
import { PatientInterface } from '@api/patient/types';


export function Pacientes() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isFullScreen = useAppStore().isFullScreen;
  const store = useAppStore();
  const navigator = useNavigate();

  const [rows, setRows] = useState(5);
  const [inputSize, setInputSize] = useState(400);

  const { data = [], error, isPending } = useQuery({
    queryKey: queryKeys.ALL_PATIENTS,
    queryFn: findPatient,
    staleTime: 1000 * 60 * 5
  })

  const columns = Math.ceil((data?.length || 0) / rows);

  useEffect(() => {
    const newRowsQtd = isFullScreen ? 8 : 5;
    const newInputSize = isFullScreen ? 1000 : 400;
    setRows(newRowsQtd);
    setInputSize(newInputSize);
  }, [isFullScreen]);

  const cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    const index = rows * columnIndex + rowIndex;

    const element = data[index];

    return (
      <div style={{ ...style }}>
        {element &&
          <SimpleCard
            title={element.name}
            subtitle={formatCpf(element.cpf)}
            onClick={() => {
              store.setSelectedPatient(element);
              navigator("/cadastroPaciente");
            }}
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
            sizeType={inputSize}
            inputType='search'
            placeholder='João Santos'

          />
        </SearchStyleWrapper>
        <ButtonWrapper>
          <GenericButton
            color='PRIMARY'
            onClick={() => {
              store.setSelectedPatient({} as PatientInterface);
              navigator("/cadastroPaciente");
            }}
            title='Novo Cadastro'
          />
        </ButtonWrapper>

      </CommandHeader>
      <Content>
        {isPending ?
          <LoaderWrapper>
            <ClipLoader
              color={theme.COLORS.AZUL_DA_FRANCA}
              size={80}
            />
          </LoaderWrapper>
          :
          <AutoSizer>
            {({ height, width }) =>
              <div
                onWheel={e => {
                  if (contentRef.current) {
                    contentRef.current.scrollLeft += e.deltaY;
                  }
                }}
              >
                <FixedSizeGrid
                  outerRef={contentRef}
                  columnCount={columns}
                  columnWidth={310}
                  height={height}
                  width={width}
                  rowCount={rows}
                  rowHeight={80}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', }}
                >
                  {cell}
                </FixedSizeGrid>
              </div>
            }
          </AutoSizer>}
      </Content>
    </Container>
  );
};

export default Pacientes;