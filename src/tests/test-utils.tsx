import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { useStore } from '@/stores';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { router } from '@/router';
import { RouterProvider } from '@tanstack/react-router';

const AllTheProviders = () => {
  const user = useStore((state) => state);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth: user }} />;
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { customRender as render };
