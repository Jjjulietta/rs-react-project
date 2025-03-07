'use client';

import { PaginationContextProvider } from 'src/context/paginationProvider';
import { ThemeContextProvider } from 'src/context/themeProvider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <PaginationContextProvider>{children}</PaginationContextProvider>
    </ThemeContextProvider>
  );
}
