import { Select, rem } from "@mantine/core";
import { useStore } from "../store";

export function SelecFilter() {
  const changeFilter = useStore((state) => state.changeFilter);

  return (
    <Select
      label="Filtros"
      data={[{ value: 'country', label: 'País' }, { value: 'state', label: 'Estados do Brasil' }, { value: 'date', label: 'Data' }]}
      onChange={(value) => changeFilter(value)}
      style={{width: rem(1000)}}
    />)
}