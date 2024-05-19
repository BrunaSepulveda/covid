import 'dayjs/locale/pt-br';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DatesProvider } from '@mantine/dates';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DatesProvider settings={{ locale: 'pt-br' }}>
        <App />
      </DatesProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
