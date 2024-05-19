import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StoreSttatus = {
  state: string | null;
  country: string | null;
  date: Date | null;
  filter: string | null;
  changeState: (state: string | null) => void;
  changeCountry: (country: string | null) => void;
  changeDate: (date: Date | null) => void;
  changeFilter: (filter: string | null) => void;
}

export const useStore = create<StoreSttatus>()(
  persist(
    (set) => ({
      state: null,
      country: null,
      date: null,
      filter: null,
      changeState: (state: string | null) => set(() => ({ state })),
      changeCountry: (country: string | null) => set(() => ({ country })),
      changeDate: (date: Date | null) => set(() => ({ date })),
      changeFilter: (filter: string | null) => set(() => ({ filter })),
    }),
    { name: 'storeStage', storage: createJSONStorage(() => sessionStorage) },
  ),
);