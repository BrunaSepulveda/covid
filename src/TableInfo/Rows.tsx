import { shallow } from 'zustand/shallow';
import { useStore } from '../store';
import { dateFromISOString, getAllStatusByStateInBrazil, getByCountry, getStatusByState, getStatusByStateInDate } from '../service';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../main';
import { useEffect } from 'react';
import { Table } from '@mantine/core';
import { CovidStatusByState, CovidStatusByStateInfo, CovidStatusCountry } from '../types';

function RowCountry({ country, headersKeys }: { country: string; headersKeys: string[] }) {
  const { data } = useQuery({
    queryKey: ['getStatusCountry', country],
    queryFn: async () => getByCountry(country || 'brazil'),
    refetchOnWindowFocus: false
  });

  console.log(data)

  useEffect(() => {
      queryClient.invalidateQueries({ queryKey: ['getStatusCountry', country] });
  }, [country]);

  return (
    <>
      {data?.map((element, index) => (
        <Table.Tr key={index}>
          {headersKeys.map((header) => (
            <Table.Td key={header}>
              {header === 'updated_at' ? dateFromISOString(new Date(element[header])) : element[header as keyof CovidStatusCountry]}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );
}

function RowState({ state, headersKeys }: { state: string; headersKeys: string[] }) {
  const { data } = useQuery({
    queryKey: ['getStatusState', state],
    queryFn: async () => state ? getStatusByState(state) : getAllStatusByStateInBrazil(),
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getStatusState', state] });
  }, [state]);

  return (
    <>
      {data?.map((element, index) => (
        <Table.Tr key={index}>
          {headersKeys.map((header) => (
            <Table.Td key={header}>
              {header === 'datetime' ? dateFromISOString(new Date(element[header])) : element[header as keyof CovidStatusByState]}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );
}

function RowDate({ date, headersKeys }: { date: Date | null; headersKeys: string[] }) {
  const { data } = useQuery({
    queryKey: ['getStatusDate', date],
    queryFn: async () => getStatusByStateInDate(date || new Date()),
    refetchOnWindowFocus: false
  });

  console.log(data)

  useEffect(() => {
    if (date) {
      queryClient.invalidateQueries({ queryKey: ['getStatusDate', date] });
    }
  }, [date]);

  return (
    <>
      {data?.map((element, index) => (
        <Table.Tr key={index}>
          {headersKeys.map((header) => (
            <Table.Td key={header}>
              {header === 'datetime' ? dateFromISOString(new Date(element[header])) : element[header as keyof CovidStatusByStateInfo]}
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );
}

export function Rows({ headersKeys }: { headersKeys: string[] }) {
  const { state, country, date, filter } = useStore(
    (state) => ({
      state: state.state,
      country: state.country,
      date: state.date,
      filter: state.filter,
    }),
    shallow,
  );

  if (filter) {
    return (
      <Table.Tbody>
        {{
          state: <RowState state={state || ''} headersKeys={headersKeys} />,
          country: <RowCountry country={country || ''} headersKeys={headersKeys} />,
          date: <RowDate date={date} headersKeys={headersKeys} />,
        }[filter]}
      </Table.Tbody>
    );
  }
  return null;
}
