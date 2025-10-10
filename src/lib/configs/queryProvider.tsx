'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { useError } from '../utils/useError';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
export function QueryProvider({ children }: { children: React.ReactNode }) {
  //useError();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}