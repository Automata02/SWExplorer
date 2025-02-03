import React from 'react';
import TabNavigation from './views/TabNavigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TabNavigation />;
    </QueryClientProvider>
  );
};

export default App;

