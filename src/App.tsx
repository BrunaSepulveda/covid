import { TableInfo } from './TableInfo/TableInfo';
import { Box, Flex, MantineProvider, rem } from '@mantine/core';
import { theme } from './theme';
import { SelecFilter } from './SelecFilter/SelecFilter';
import { useStore } from './store';
import { useEffect } from 'react';


function App() {

  const changeFilter = useStore((state) => state.changeFilter);

  useEffect(() => changeFilter(null),[])
  return (
    <MantineProvider withCssVariables withGlobalClasses theme={theme}>
      <Flex direction="column" align="center" style={{width: '100%'}}>
      <SelecFilter />
      <TableInfo />
      </Flex>
    </MantineProvider>
  )
}

export default App
