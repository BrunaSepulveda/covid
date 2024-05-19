import { states } from "../contants/states";
import { useStore } from "../store";
import { Select} from '@mantine/core';
import { shallow } from 'zustand/shallow';
import { DateInput } from '@mantine/dates';
import { getByAllCountry } from "../service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function Filter() {
  const { changeState, changeCountry, changeDate, filter  } = useStore(
    (state) => ({
    changeState: state.changeState,
    changeCountry: state.changeCountry,
    changeDate: state.changeDate,
    filter: state.filter,
    }),
    shallow,
  );


  const { data } = useQuery({
    queryKey:['getStatus'],
    queryFn: getByAllCountry,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    changeState(null)
    changeCountry(null)
    changeDate(null)
  }, [])

 return {
  country: (
    <Select
      label="Paises"
      data={data?.map((el) => el.country)}
      onChange={changeCountry}
    />
  ),
  state: (
    <Select
      label="Estados"
      data={Object.entries(states).map(([key, value]) => ({ value: key, label: value }))}
      onChange={changeState}
    />
  ),
  date: ( <DateInput onChange={changeDate} label="Data"/>),
}[filter as ('country' | 'state' | 'date')]
  
}