import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';
import { useStore } from './stores';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { StrictMode } from 'react';

const InnerApp = () => {
  const user = useStore((state) => state.user);
  return <RouterProvider router={router} context={{ auth: user }} />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerApp />
    </QueryClientProvider>
  );
};

export default App;

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
