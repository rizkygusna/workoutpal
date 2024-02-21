import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { useStore } from './stores';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

// eslint-disable-next-line react-refresh/only-export-components
const InnerApp = () => {
  const user = useStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth: user }} />;
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InnerApp />
  </React.StrictMode>
);
