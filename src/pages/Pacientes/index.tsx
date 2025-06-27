import React, { useEffect, useRef, useState } from 'react';
import { ButtonWrapper, CleanWrapper, CommandHeader, Container, Content, EmptyWrapper, LabelEntity, LoaderWrapper, ReloadButton, ReloadWrapper, SearchStyleWrapper } from './styles';
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'utils/query-keys';
import { formatCpf } from 'utils/formatFunctions';
import { PatientInterface } from '@api/patient/types';
import Icon from '@components/Icon';
import { Text } from '@components/Text';
import { useDebounce } from 'hooks/useDebounce';

export function Pacientes() {
  const isFullScreen = useAppStore().isFullScreen;
  const store = useAppStore();
  const navigator = useNavigate();

  const [rows, setRows] = useState(5);
  const [inputSize, setInputSize] = useState(400);

  const [filteredData, setFilteredData] = useState<PatientInterface[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const queryClient = useQueryClient();
  const { data = [], error, isPending, refetch } = useQuery({
    queryKey: queryKeys.ALL_PATIENTS,
    queryFn: findPatient,
    staleTime: 1000 * 60 * 5
  })

  const columns = Math.ceil((data?.length || 0) / rows);

  function searchOptions(searchText: string) {
    if(error || isPending) return;
    
    const validOptions = data.filter(item => item.name.toLowerCase().normalize("NFD").includes(searchText.toLowerCase().normalize("NFD")))
    setFilteredData(validOptions);
  }

  useDebounce(searchValue, 500, searchOptions);

  useEffect(() => {
    const newRowsQtd = isFullScreen ? 9 : 5;
    const newInputSize = isFullScreen ? 1000 : 400;
    setRows(newRowsQtd);
    setInputSize(newInputSize);
  }, [isFullScreen]);

  useEffect(() => {
    if (!store.isValidPatientCache) {
      queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENTS });
      store.setIsValidPatientCache(true);
    }
  }, []);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = contentRef.current;
    if (!grid) return;

    const handleWheel = (e: WheelEvent) => {
      if (!grid) return;

      e.preventDefault();

      const SCROLL_SENSITIVITY = 0.2;
      const nextScrollLeft = grid.scrollLeft + e.deltaY * SCROLL_SENSITIVITY;

      grid.scrollLeft = Math.max(
        0,
        Math.min(grid.scrollWidth - grid.clientWidth, nextScrollLeft)
      );
    };

    grid.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      grid.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const currentData = searchValue ? filteredData : data;

  const cell = ({ columnIndex, rowIndex, style }: { columnIndex: number, rowIndex: number, style: React.CSSProperties }) => {
    const index = rows * columnIndex + rowIndex;

    const element = currentData[index];

    return (
      <div style={{ ...style }}>
        {element &&
          <SimpleCard
            title={element.name}
            subtitle={formatCpf(element.cpf)}
            onClick={() => {
              store.setSelectedPatient(element);
              queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENT_TREATMENTS });
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}

          />
          {searchValue !== "" &&
            <CleanWrapper
              onClick={() => setSearchValue('')}
            >
              <Icon
                iconLibName='io5'
                icon='IoClose'
                color={theme.COLORS.AZUL_DA_FRANCA}
                size={25}
              />
            </CleanWrapper>}
        </SearchStyleWrapper>
        <ButtonWrapper>
          <GenericButton
            color='PRIMARY'
            onClick={() => {
              store.setSelectedPatient({} as PatientInterface);
              queryClient.invalidateQueries({ queryKey: queryKeys.ALL_PATIENT_TREATMENTS });
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
                  text="Não há pacientes cadastros"
                />
              </EmptyWrapper>
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