import { Flex, Table, Text, rem } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { useStore } from '../store';
import { useMemo } from 'react';
import { Filter } from '../Filter/Filter';
import { Rows } from './Rows';

export function TableInfo() {

  const  filter  = useStore(state => (state.filter));


  const headers = useMemo(() => {
    if(filter){
      let headersKeys: string[] = [];
      let headers: Record<string, string> = {};

      if (filter !== 'country') {
        headersKeys = ['uf', 'state', 'cases', 'deaths', 'suspects', 'refuses', 'datetime' ];
        headers = {
          uf: 'UF',
          state: 'Estado',
          cases: 'Casos',
          deaths: 'Mortes',
          suspects: 'Suspeitos',
          refuses: 'Recusados',
          datetime: 'Data',
        };
      } else if (filter === 'country') {
        headersKeys  = ['cases','confirmed','country','deaths', 'recovered', 'updated_at'];
        headers = {
          country: 'País',
          cases: 'Casos',
          confirmed: 'Confirmados',
          deaths: 'Mortes',
          recovered: 'Recuperados',
          updated_at: 'Data de atualização',
        };
      }
    
      return {headersKeys, headers}
    }
  }, [filter])


  return (
    <>

    <Flex direction="column" align="center">
    <Flex direction="row" align="center" justify="space-between" p={rem(16)} style={{width: rem(1000), paddingBottom: rem(24), paddingTop: rem(24)}}>
      <Text>Covid19 Brazil</Text>
      <Filter />
      </Flex>
      <Table  striped withTableBorder verticalSpacing="sm" style={{width: rem(1000)}}>
        <Table.Thead>
        <Table.Tr>
          {headers?.headersKeys.map((el) => (<Table.Th key={randomId()}>{headers?.headers[el]}</Table.Th>))}
        </Table.Tr>
        </Table.Thead>
        <Rows headersKeys={headers?.headersKeys || []} />
      </Table>
         </Flex>
    </>
  );
}